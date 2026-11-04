/**
 * StarTech as a real Singpass relying party, for the staging app registered
 * on the Singpass Developer Portal. Off unless SINGPASS_MODE is "staging";
 * the mock in singpass-demo.ts stays the default demo either way.
 *
 *   GET /.well-known/jwks.json             our public keys (sig + enc), built
 *                                          from the private-key secrets. Live
 *                                          whenever the secrets exist, since
 *                                          the portal fetches it before the
 *                                          app is switched on.
 *   GET /api/demo/singpass/staging/config  whether the staging login is on
 *   GET /api/demo/singpass/staging/login   PAR, then 302 to Singpass
 *   GET /singpass/callback                 the registered redirect URL: code
 *                                          exchange and ID token checks, then
 *                                          302 back to /singpass with a
 *                                          one-time result id
 *   GET /api/demo/singpass/staging/result  that result, read once
 *
 * The client is the same SingpassClient the page runs against the mock;
 * only its configuration differs. Private keys come from Worker secrets and
 * never leave the Worker. Per-login state (state, nonce, PKCE verifier,
 * DPoP key) waits in KV for up to 10 minutes, the time Singpass gives a
 * user to finish, and the state is also pinned to the browser in an
 * HttpOnly cookie so a callback cannot be replayed from elsewhere.
 */

import { SingpassClient, SingpassError, type AuthSession } from "../src/lib/singpass/client";
import { asPublicJwk, importPrivateJwk, randomToken, type EcPublicJwk, type JsonObject } from "../src/lib/singpass/jose";

export const RP_JWKS_PATH = "/.well-known/jwks.json";
export const RP_CALLBACK_PATH = "/singpass/callback";
export const RP_API_PREFIX = "/api/demo/singpass/staging/";

/** The subset of the Worker's env this module reads. */
export interface SingpassRpEnv {
  /** "staging" switches the real login on. Anything else leaves it off. */
  SINGPASS_MODE?: string;
  /** e.g. https://stg-id.singpass.gov.sg/fapi */
  SINGPASS_ISSUER?: string;
  /** The App ID from the Developer Portal. */
  SINGPASS_CLIENT_ID?: string;
  /** Must equal a redirect URL registered on the portal. */
  SINGPASS_REDIRECT_URI?: string;
  /** Secret: private P-256 JWK with d, kid, use "sig", alg "ES256". */
  SINGPASS_SIG_PRIVATE_JWK?: string;
  /** Secret: private P-256 JWK with d, kid, use "enc", alg "ECDH-ES+A256KW". */
  SINGPASS_ENC_PRIVATE_JWK?: string;
}

export interface SingpassRpDeps {
  kv: KVNamespace;
  clientIp: string;
  isRateLimited: (key: string, maxRequests: number, windowSeconds: number) => Promise<boolean>;
}

/** Login apps may ask for these; user.identity alone avoids a consent screen. */
const SCOPE = "openid user.identity";
const CONTEXT_TYPE = "APP_AUTHENTICATION_DEFAULT";
const SESSION_TTL = 600;
const RESULT_TTL = 300;
const METADATA_TTL_MS = 60 * 60 * 1000;
const STATE_COOKIE = "sp_state";

const RATE_LIMITS: Record<string, [number, number]> = {
  config: [30, 60],
  login: [5, 60],
  callback: [10, 60],
  result: [10, 60],
};

const KV = {
  session: (state: string) => `singpass-rp:session:${state}`,
  result: (id: string) => `singpass-rp:result:${id}`,
};

interface StoredSession {
  state: string;
  nonce: string;
  codeVerifier: string;
  codeChallenge: string;
  dpopPrivateJwk: JsonWebKey;
  dpopJwk: EcPublicJwk;
  dpopJkt: string;
}

/** Shown to the visitor after a staging login. Real claims, staging test account. */
interface StoredResult {
  ok: boolean;
  /** Our own error code, never Singpass's error_description. */
  error?: string;
  claims?: JsonObject;
}

function json(body: unknown, status = 200, cache = "no-store"): Response {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": cache },
  });
}

function redirect(location: string, cookie?: string): Response {
  const headers = new Headers({ Location: location, "Cache-Control": "no-store" });
  if (cookie) headers.append("Set-Cookie", cookie);
  return new Response(null, { status: 302, headers });
}

function parsePrivateJwk(raw: string | undefined): JsonWebKey | null {
  if (!raw) return null;
  try {
    const jwk = JSON.parse(raw) as JsonWebKey & { kid?: string };
    return jwk.kty === "EC" && jwk.crv === "P-256" && jwk.d && jwk.kid ? jwk : null;
  } catch {
    return null;
  }
}

/** Public half of a private JWK: drops d, keeps kid/use/alg. */
function publicHalf(jwk: JsonWebKey & { kid?: string; use?: string }): EcPublicJwk {
  const { d: _d, key_ops: _ops, ext: _ext, ...rest } = jwk;
  return asPublicJwk(rest);
}

/** Staging is on only when every value it needs is present. */
function isEnabled(env: SingpassRpEnv): boolean {
  return (
    env.SINGPASS_MODE === "staging" &&
    Boolean(env.SINGPASS_ISSUER && env.SINGPASS_CLIENT_ID && env.SINGPASS_REDIRECT_URI) &&
    parsePrivateJwk(env.SINGPASS_SIG_PRIVATE_JWK) !== null &&
    parsePrivateJwk(env.SINGPASS_ENC_PRIVATE_JWK) !== null
  );
}

/**
 * One client per isolate for an hour, so Singpass's discovery document and
 * JWKS are fetched at most hourly rather than on every login, as Singpass
 * asks.
 */
let cached: { client: SingpassClient; at: number; key: string } | null = null;

async function getClient(env: SingpassRpEnv): Promise<SingpassClient> {
  const key = `${env.SINGPASS_ISSUER}|${env.SINGPASS_CLIENT_ID}|${env.SINGPASS_SIG_PRIVATE_JWK?.length}`;
  if (cached && cached.key === key && Date.now() - cached.at < METADATA_TTL_MS) return cached.client;
  const sig = parsePrivateJwk(env.SINGPASS_SIG_PRIVATE_JWK) as JsonWebKey & { kid: string };
  const enc = parsePrivateJwk(env.SINGPASS_ENC_PRIVATE_JWK) as JsonWebKey;
  const client = new SingpassClient({
    issuer: env.SINGPASS_ISSUER as string,
    clientId: env.SINGPASS_CLIENT_ID as string,
    redirectUri: env.SINGPASS_REDIRECT_URI as string,
    appType: "login",
    scope: SCOPE,
    authenticationContextType: CONTEXT_TYPE,
    signingKey: { privateKey: await importPrivateJwk(sig, "sig"), kid: sig.kid },
    decryptionKey: await importPrivateJwk(enc, "enc"),
  });
  cached = { client, at: Date.now(), key };
  return client;
}

async function restoreSession(stored: StoredSession): Promise<AuthSession> {
  const privateKey = await importPrivateJwk(stored.dpopPrivateJwk, "sig");
  const { kty, crv, x, y } = stored.dpopJwk;
  const publicKey = await crypto.subtle.importKey("jwk", { kty, crv, x, y }, { name: "ECDSA", namedCurve: "P-256" }, true, [
    "verify",
  ]);
  return {
    state: stored.state,
    nonce: stored.nonce,
    codeVerifier: stored.codeVerifier,
    codeChallenge: stored.codeChallenge,
    dpopKey: { privateKey, publicKey },
    dpopJwk: stored.dpopJwk,
    dpopJkt: stored.dpopJkt,
  };
}

function readCookie(request: Request, name: string): string | null {
  for (const part of (request.headers.get("Cookie") ?? "").split(";")) {
    const [k, ...v] = part.trim().split("=");
    if (k === name) return v.join("=");
  }
  return null;
}

// ─── Handlers ───────────────────────────────────────────────────────────────

/** Public keys only. 404 until both secrets are set. */
export function handleRpJwks(env: SingpassRpEnv): Response {
  const sig = parsePrivateJwk(env.SINGPASS_SIG_PRIVATE_JWK);
  const enc = parsePrivateJwk(env.SINGPASS_ENC_PRIVATE_JWK);
  if (!sig || !enc) return json({ error: "not_configured" }, 404);
  return json({ keys: [publicHalf(sig), publicHalf(enc)] }, 200, "public, max-age=300");
}

async function login(env: SingpassRpEnv, kv: KVNamespace, siteOrigin: string): Promise<Response> {
  const client = await getClient(env);
  const session = await client.createSession({ extractableDpopKey: true });
  try {
    const par = await client.pushAuthorizationRequest(session);
    const stored: StoredSession = {
      state: session.state,
      nonce: session.nonce,
      codeVerifier: session.codeVerifier,
      codeChallenge: session.codeChallenge,
      dpopPrivateJwk: (await crypto.subtle.exportKey("jwk", session.dpopKey.privateKey)) as JsonWebKey,
      dpopJwk: session.dpopJwk,
      dpopJkt: session.dpopJkt,
    };
    await kv.put(KV.session(session.state), JSON.stringify(stored), { expirationTtl: SESSION_TTL });
    const cookie = `${STATE_COOKIE}=${session.state}; Path=${RP_CALLBACK_PATH}; Max-Age=${SESSION_TTL}; HttpOnly; Secure; SameSite=Lax`;
    return redirect(par.authorizationUrl, cookie);
  } catch (err) {
    console.error("singpass staging PAR failed", err instanceof SingpassError ? err.code : err);
    return redirect(`${siteOrigin}/singpass?staging=error&reason=par#demo`);
  }
}

async function callback(request: Request, env: SingpassRpEnv, kv: KVNamespace, siteOrigin: string): Promise<Response> {
  const url = new URL(request.url);
  const state = url.searchParams.get("state") ?? "";
  const clearCookie = `${STATE_COOKIE}=; Path=${RP_CALLBACK_PATH}; Max-Age=0; HttpOnly; Secure; SameSite=Lax`;
  const finish = async (result: StoredResult) => {
    const id = randomToken(16);
    await kv.put(KV.result(id), JSON.stringify(result), { expirationTtl: RESULT_TTL });
    return redirect(`${siteOrigin}/singpass?staging=${id}#demo`, clearCookie);
  };

  // The state must be one we issued, to this same browser.
  const stored = state ? await kv.get<StoredSession>(KV.session(state), "json") : null;
  if (!stored || readCookie(request, STATE_COOKIE) !== state) return finish({ ok: false, error: "state" });
  await kv.delete(KV.session(state));

  try {
    const client = await getClient(env);
    const session = await restoreSession(stored);
    const code = await client.handleRedirect(session, request.url);
    const tokens = await client.exchangeCode(session, code);
    const claims = await client.verifyIdToken(session, tokens.idToken);
    return finish({ ok: true, claims });
  } catch (err) {
    // Log the provider's code; show the visitor only our own category.
    const code = err instanceof SingpassError ? err.code : "verification";
    console.error("singpass staging callback failed", code);
    return finish({ ok: false, error: code === "access_denied" ? "cancelled" : "failed" });
  }
}

async function readResult(url: URL, kv: KVNamespace): Promise<Response> {
  const id = url.searchParams.get("id") ?? "";
  if (!/^[A-Za-z0-9_-]{16,64}$/.test(id)) return json({ error: "invalid_request" }, 400);
  const result = await kv.get<StoredResult>(KV.result(id), "json");
  if (!result) return json({ error: "not_found" }, 404);
  await kv.delete(KV.result(id)); // read once
  return json(result);
}

/**
 * Same origin rule as the mock: these are GETs (navigations and same-origin
 * fetches), allowed without Origin but never from another site. The
 * callback is exempt: Singpass sends the browser there cross-site.
 */
function originOk(request: Request, originAllowed: boolean): boolean {
  if (request.headers.get("Origin")) return originAllowed;
  const site = request.headers.get("Sec-Fetch-Site");
  return site === null || site === "same-origin" || site === "none";
}

/** Routes RP_CALLBACK_PATH and RP_API_PREFIX/*. */
export async function handleSingpassRp(
  request: Request,
  env: SingpassRpEnv,
  deps: SingpassRpDeps & { originAllowed: boolean }
): Promise<Response> {
  const url = new URL(request.url);
  const route = url.pathname === RP_CALLBACK_PATH ? "callback" : url.pathname.slice(RP_API_PREFIX.length);
  const limits = RATE_LIMITS[route];
  if (!limits) return json({ error: "not_found" }, 404);
  if (request.method !== "GET") return json({ error: "invalid_request", error_description: "Method not allowed." }, 405);
  if (route !== "callback" && !originOk(request, deps.originAllowed)) return json({ error: "access_denied" }, 403);
  if (await deps.isRateLimited(`ip:${deps.clientIp}:singpass-rp:${route}`, limits[0], limits[1])) {
    return json({ error: "slow_down", error_description: "Too many requests. Please try again later." }, 429);
  }

  const enabled = isEnabled(env);
  if (route === "config") {
    return json({ enabled, issuer: enabled ? env.SINGPASS_ISSUER : null });
  }
  // The redirect URL's origin is the site; links back go there.
  const siteOrigin = enabled ? new URL(env.SINGPASS_REDIRECT_URI as string).origin : url.origin;
  if (!enabled) {
    return route === "callback" ? redirect("/singpass#demo") : json({ error: "not_enabled" }, 404);
  }
  try {
    if (route === "login") return await login(env, deps.kv, siteOrigin);
    if (route === "callback") return await callback(request, env, deps.kv, siteOrigin);
    return await readResult(url, deps.kv);
  } catch (err) {
    console.error("singpass staging error", err instanceof Error ? err.message : err);
    return json({ error: "server_error" }, 500);
  }
}
