/**
 * Drives the /singpass demo: the real SingpassClient against the mock
 * authorization server in worker/singpass-demo.ts, one visible step at a
 * time. Kept out of the component so the UI only renders state.
 *
 * Two pieces exist only because the server is a mock: registering the app
 * (on Singpass that is the Developer Portal, done once by a person) and the
 * login decision (on Singpass that is a browser redirect to the login page).
 * Everything in between is the client a real integration would run.
 */

import {
  SingpassClient,
  SingpassError,
  type AuthSession,
  type HttpExchange,
  type SingpassAppType,
} from "../../lib/singpass/client";
import {
  decodeJweHeader,
  decodeJws,
  exportPublicJwk,
  generateEncryptionKeyPair,
  generateSigningKeyPair,
  randomToken,
  type JsonObject,
} from "../../lib/singpass/jose";

export const DEMO_API = "/api/demo/singpass";

export const STEP_IDS = [
  "register",
  "discovery",
  "session",
  "par",
  "authorize",
  "redirect",
  "replay",
  "token",
  "idToken",
  "userinfo",
] as const;

export type StepId = (typeof STEP_IDS)[number];
export type StepStatus = "pending" | "running" | "waiting" | "done" | "error";

export interface Fact {
  label: string;
  value: string | JsonObject;
}

export interface StepState {
  status: StepStatus;
  exchanges: HttpExchange[];
  facts: Fact[];
  error?: string;
}

/** What the mock login page would show. */
export interface PendingLogin {
  scope: string;
  authenticationContextType: string | null;
  sampleName: string;
  sampleId: string;
}

export interface FlowCallbacks {
  onStep: (id: StepId, patch: Partial<StepState>) => void;
  onExchange: (id: StepId, exchange: HttpExchange) => void;
  /** Resolves true to approve, false to cancel. */
  login: (pending: PendingLogin) => Promise<boolean>;
}

export type FlowOutcome =
  | { kind: "done"; profile: JsonObject }
  | { kind: "cancelled" }
  | { kind: "error"; step: StepId; message: string };

/** Scopes Singpass allows each app type to ask for in this demo. */
const SCOPES: Record<SingpassAppType, string> = {
  login: "openid user.identity name",
  myinfo: "openid uinfin name dob nationality",
};

/** Long values shortened for display: the shape stays visible, the secret does not. */
export function redact(value: string): string {
  if (value.length <= 24) return value;
  return `${value.slice(0, 14)}…${value.slice(-6)} (${value.length} chars)`;
}

const SECRET_FIELDS = new Set([
  "dpop",
  "authorization",
  "client_assertion",
  "code_verifier",
  "code",
  "access_token",
  "id_token",
]);

function redactRecord(record: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(record)) {
    out[key] =
      typeof value === "string" && SECRET_FIELDS.has(key.toLowerCase()) ? redact(value) : value;
  }
  return out;
}

function redactUrl(url: string): string {
  const parsed = new URL(url);
  for (const key of ["code"]) {
    const value = parsed.searchParams.get(key);
    if (value) parsed.searchParams.set(key, redact(value));
  }
  return decodeURIComponent(parsed.toString());
}

/** One exchange as an HTTP-shaped transcript, with secrets shortened. */
export function formatExchange(ex: HttpExchange): { request: string; response: string } {
  const url = new URL(redactUrl(ex.url));
  const head = [`${ex.method} ${url.pathname}${decodeURIComponent(url.search)} HTTP/1.1`, `Host: ${url.host}`];
  for (const [name, value] of Object.entries(redactRecord(ex.requestHeaders))) {
    head.push(`${name}: ${String(value)}`);
  }
  let request = head.join("\n");
  if (ex.requestBody) {
    const body = redactRecord(ex.requestBody);
    request += `\n\n${Object.entries(body)
      .map(([k, v]) => `${k}=${String(v)}`)
      .join("\n&")}`;
  }
  const lines = [`HTTP/1.1 ${ex.status}`];
  for (const [name, value] of Object.entries(ex.responseHeaders)) lines.push(`${name}: ${value}`);
  const body =
    typeof ex.responseBody === "string"
      ? redact(ex.responseBody)
      : JSON.stringify(
          ex.responseBody && typeof ex.responseBody === "object"
            ? redactUrlFields(redactRecord(ex.responseBody as Record<string, unknown>))
            : ex.responseBody,
          null,
          2
        );
  return { request, response: `${lines.join("\n")}\n\n${body}` };
}

function redactUrlFields(record: Record<string, unknown>): Record<string, unknown> {
  if (typeof record.redirect_to === "string") {
    return { ...record, redirect_to: redactUrl(record.redirect_to) };
  }
  return record;
}

function errorMessage(err: unknown): string {
  if (err instanceof SingpassError) return `${err.code}: ${err.message}`;
  if (err instanceof Error) return err.message;
  return String(err);
}

/** Same-origin JSON call to a mock-only endpoint, recorded like the client's own. */
async function mockCall(
  label: string,
  method: "GET" | "POST",
  url: string,
  body: JsonObject | undefined,
  record: (ex: HttpExchange) => void
): Promise<JsonObject> {
  const requestHeaders: Record<string, string> = { Accept: "application/json" };
  if (body) requestHeaders["Content-Type"] = "application/json";
  const res = await fetch(url, {
    method,
    headers: requestHeaders,
    body: body ? JSON.stringify(body) : undefined,
  });
  const parsed = (await res.json().catch(() => ({}))) as JsonObject;
  record({
    label,
    method,
    url: new URL(url, window.location.origin).toString(),
    requestHeaders,
    requestBody: body
      ? Object.fromEntries(Object.entries(body).map(([k, v]) => [k, typeof v === "string" ? v : JSON.stringify(v)]))
      : undefined,
    status: res.status,
    responseHeaders: { "content-type": res.headers.get("content-type") ?? "" },
    responseBody: parsed,
  });
  if (!res.ok) {
    throw new SingpassError(
      typeof parsed.error === "string" ? parsed.error : "http_error",
      typeof parsed.error_description === "string" ? parsed.error_description : `HTTP ${res.status}`,
      res.status
    );
  }
  return parsed;
}

export async function runDemoFlow(appType: SingpassAppType, cb: FlowCallbacks): Promise<FlowOutcome> {
  const origin = window.location.origin;
  let current: StepId = "register";

  const begin = (id: StepId) => {
    current = id;
    cb.onStep(id, { status: "running" });
  };
  const finish = (id: StepId, facts: Fact[]) => cb.onStep(id, { status: "done", facts });
  // Last exchange per label, so a step can decode the proofs it just sent.
  const sent = new Map<string, HttpExchange>();
  const record = (ex: HttpExchange) => {
    sent.set(ex.label, ex);
    cb.onExchange(current, ex);
  };

  try {
    // 1. Register: keys made here, private halves never leave the browser.
    begin("register");
    const signing = await generateSigningKeyPair();
    const encryption = await generateEncryptionKeyPair();
    const suffix = randomToken(4);
    const sigJwk = await exportPublicJwk(signing.publicKey, { kid: `demo-sig-${suffix}`, use: "sig", alg: "ES256" });
    const encJwk = await exportPublicJwk(encryption.publicKey, {
      kid: `demo-enc-${suffix}`,
      use: "enc",
      alg: "ECDH-ES+A256KW",
    });
    const redirectUri = `${origin}/singpass`;
    const registration = await mockCall(
      "register",
      "POST",
      `${DEMO_API}/register`,
      { app_type: appType, redirect_uri: redirectUri, jwks: { keys: [sigJwk, encJwk] } },
      record
    );
    const clientId = String(registration.client_id);
    finish("register", [
      { label: "client_id", value: clientId },
      { label: "jwks (public only, no d)", value: { keys: [sigJwk, encJwk] } as unknown as JsonObject },
    ]);

    const client = new SingpassClient({
      issuer: `${origin}${DEMO_API}/fapi`,
      clientId,
      redirectUri,
      appType,
      scope: SCOPES[appType],
      authenticationContextType: appType === "login" ? "APP_AUTHENTICATION_DEFAULT" : undefined,
      signingKey: { privateKey: signing.privateKey, kid: sigJwk.kid as string },
      decryptionKey: encryption.privateKey,
      onExchange: record,
    });

    // 2. Discovery.
    begin("discovery");
    const meta = await client.discover();
    finish("discovery", [
      { label: "issuer", value: meta.issuer },
      { label: "pushed_authorization_request_endpoint", value: meta.pushed_authorization_request_endpoint },
      { label: "code_challenge_methods_supported", value: JSON.stringify(meta.code_challenge_methods_supported) },
      { label: "dpop_signing_alg_values_supported", value: JSON.stringify(meta.dpop_signing_alg_values_supported) },
    ]);

    // 3. Per-login secrets.
    begin("session");
    const session = await client.createSession();
    finish("session", [
      { label: "state", value: session.state },
      { label: "nonce", value: session.nonce },
      { label: "code_verifier", value: redact(session.codeVerifier) },
      { label: "code_challenge = BASE64URL(SHA-256(code_verifier))", value: session.codeChallenge },
      { label: "DPoP public key (jwk)", value: session.dpopJwk as unknown as JsonObject },
      { label: "DPoP key thumbprint (jkt)", value: session.dpopJkt },
    ]);

    // 4. PAR.
    begin("par");
    const parResult = await client.pushAuthorizationRequest(session);
    finish("par", [
      { label: "request_uri", value: parResult.requestUri },
      { label: "expires_in", value: String(parResult.expiresIn) },
      ...decodedProofs(sent.get("par")),
    ]);

    // 5. Authorization: the mock returns JSON where Singpass shows a login page.
    begin("authorize");
    const pending = await mockCall("authorize", "GET", parResult.authorizationUrl, undefined, record);
    cb.onStep("authorize", {
      status: "waiting",
      facts: [{ label: "authorization URL", value: parResult.authorizationUrl }],
    });
    const sample = (pending.sample_user ?? {}) as JsonObject;
    const approved = await cb.login({
      scope: String(pending.scope ?? ""),
      authenticationContextType:
        typeof pending.authentication_context_type === "string" ? pending.authentication_context_type : null,
      sampleName: String(sample.name ?? ""),
      sampleId: String(sample.identity_number ?? ""),
    });
    cb.onStep("authorize", { status: "running" });
    const decision = await mockCall(
      "decision",
      "POST",
      `${DEMO_API}/fapi/auth/decision`,
      { client_id: clientId, request_uri: parResult.requestUri, approve: approved },
      record
    );
    finish("authorize", [{ label: "authorization URL", value: parResult.authorizationUrl }]);

    // 6. Redirect back.
    begin("redirect");
    const redirectTo = String(decision.redirect_to);
    let code: string;
    try {
      code = await client.handleRedirect(session, redirectTo);
    } catch (err) {
      if (err instanceof SingpassError && err.code === "access_denied") {
        finish("redirect", [
          { label: "redirect", value: redactUrl(redirectTo) },
          { label: "error", value: err.code },
        ]);
        return { kind: "cancelled" };
      }
      throw err;
    }
    finish("redirect", [
      { label: "redirect", value: redactUrl(redirectTo) },
      { label: "state matches", value: "✓" },
      { label: "iss matches", value: "✓" },
    ]);

    // 7. A stolen code and verifier, presented with someone else's DPoP key.
    begin("replay");
    const stranger = await client.createSession();
    const stolen: AuthSession = {
      ...session,
      dpopKey: stranger.dpopKey,
      dpopJwk: stranger.dpopJwk,
      dpopJkt: stranger.dpopJkt,
    };
    try {
      await client.exchangeCode(stolen, code);
      cb.onStep("replay", { status: "error", error: "accepted" });
      return { kind: "error", step: "replay", message: "accepted" };
    } catch (err) {
      if (!(err instanceof SingpassError) || !err.status || err.status >= 500) throw err;
      finish("replay", [
        { label: "other device's DPoP jkt", value: stranger.dpopJkt },
        { label: "server answered", value: `${err.status} ${err.code}: ${err.message}` },
      ]);
    }

    // 8. Token exchange, with the right key.
    begin("token");
    const tokens = await client.exchangeCode(session, code);
    const access = decodeJws(tokens.accessToken);
    const cnf = (access.payload.cnf ?? {}) as JsonObject;
    finish("token", [
      { label: "token_type", value: tokens.tokenType },
      { label: "access_token payload", value: access.payload },
      { label: "cnf.jkt equals this login's DPoP key", value: cnf.jkt === session.dpopJkt ? "✓" : "✗" },
      { label: "id_token JWE header", value: decodeJweHeader(tokens.idToken) },
      ...decodedProofs(sent.get("token")),
    ]);

    // 9. ID token.
    begin("idToken");
    const claims = await client.verifyIdToken(session, tokens.idToken);
    finish("idToken", [
      { label: "decrypted with", value: `${encJwk.kid} (ECDH-ES+A256KW, A256CBC-HS512)` },
      { label: "signature verified against jwks_uri", value: "✓ ES256" },
      { label: "iss, aud, exp, nonce", value: "✓" },
      { label: "claims", value: claims },
    ]);

    let profile: JsonObject = claims;

    // 10. Userinfo (Myinfo v5 apps only).
    if (appType === "myinfo") {
      begin("userinfo");
      const info = await client.userinfo(session, tokens.accessToken, String(claims.sub));
      const proof = sent.get("userinfo")?.requestHeaders.DPoP;
      finish("userinfo", [
        ...(proof ? [{ label: "DPoP proof payload (note ath)", value: decodeJws(proof).payload }] : []),
        { label: "decrypted and verified", value: info },
      ]);
      profile = (info.person_info ?? info) as JsonObject;
    }

    return { kind: "done", profile };
  } catch (err) {
    const message = errorMessage(err);
    cb.onStep(current, { status: "error", error: message });
    return { kind: "error", step: current, message };
  }
}

function decodedProofs(ex: HttpExchange | undefined): Fact[] {
  if (!ex) return [];
  const facts: Fact[] = [];
  const dpop = ex.requestHeaders.DPoP;
  if (dpop) {
    const { header, payload } = decodeJws(dpop);
    facts.push({ label: "DPoP proof header", value: header }, { label: "DPoP proof payload", value: payload });
  }
  const assertion = ex.requestBody?.client_assertion;
  if (assertion) {
    const { header, payload } = decodeJws(assertion);
    facts.push(
      { label: "client_assertion header", value: header },
      { label: "client_assertion payload", value: payload }
    );
  }
  return facts;
}
