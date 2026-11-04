/**
 * Mock Singpass authorization server for the /singpass demo page.
 *
 * NOT Singpass. A reference implementation of the server side of the
 * Singpass FAPI 2.0 flow, so the page can run the real client
 * (src/lib/singpass/client.ts) end to end: PAR with private_key_jwt and a
 * DPoP proof, PKCE (S256), DPoP-bound authorization code and access token,
 * an ES256-signed ID token encrypted to the client's JWKS (JWE,
 * ECDH-ES+A256KW / A256CBC-HS512) and, for Myinfo apps, an encrypted
 * userinfo response nested in `person_info`. Shapes follow the Singpass
 * integration guide; paths mirror Singpass under /api/demo/singpass/fapi/*.
 *
 * Two endpoints exist only because there is no real Singpass behind it:
 *   POST register             stands in for registering an app (client_id,
 *                             JWKS, redirect URL) on the Developer Portal.
 *   GET  fapi/auth            returns the pending request as JSON instead
 *   POST fapi/auth/decision   of a login page, and the "redirect" as JSON,
 *                             so the demo stays on one page.
 *
 * State lives in KV with short relative TTLs (expirationTtl, never absolute
 * expiration; KV's minimum is 60s): registrations 15 min, PAR request_uri
 * and codes 60s, seen jti values 2 min. The mock's own signing key is kept
 * in KV for a day so every isolate signs with, and publishes, the same key.
 * The user is always the same obviously fake sample person.
 */

import {
  JoseError,
  asPublicJwk,
  decodeJws,
  encryptJwe,
  jwkThumbprint,
  randomToken,
  sha256b64url,
  signJws,
  verifyJws,
  verifyJwsWithJwks,
  importVerifyKey,
  type EcPublicJwk,
  type JsonObject,
  type Jwks,
} from "../src/lib/singpass/jose";

export const SINGPASS_DEMO_PREFIX = "/api/demo/singpass/";

export interface SingpassDemoDeps {
  kv: KVNamespace;
  /** Result of the site's validateOrigin for this request. */
  originAllowed: boolean;
  clientIp: string;
  isRateLimited: (key: string, maxRequests: number, windowSeconds: number) => Promise<boolean>;
}

type AppType = "login" | "myinfo";

interface ClientRecord {
  client_id: string;
  app_type: AppType;
  redirect_uri: string;
  jwks: Jwks;
}

interface ParRecord {
  client_id: string;
  redirect_uri: string;
  scope: string;
  state: string;
  nonce: string;
  code_challenge: string;
  dpop_jkt: string;
  authentication_context_type?: string;
}

interface CodeRecord extends ParRecord {
  auth_time: number;
}

interface ServerKey {
  kid: string;
  privateJwk: JsonWebKey;
}

/** Per IP, per route, per minute. Same shape as rateLimits in index.ts. */
const RATE_LIMITS: Record<string, [number, number]> = {
  "fapi/.well-known/openid-configuration": [30, 60],
  "fapi/jwks": [30, 60],
  register: [6, 60],
  "fapi/par": [10, 60],
  "fapi/auth": [10, 60],
  "fapi/auth/decision": [10, 60],
  "fapi/token": [10, 60],
  "fapi/userinfo": [15, 60],
};

const CLIENT_TTL = 900;
const REQUEST_URI_TTL = 60;
const CODE_TTL = 60;
const JTI_TTL = 120;
const SERVER_KEY_TTL = 86400;
const ID_TOKEN_LIFETIME = 600;
const ACCESS_TOKEN_LIFETIME = 1800;
const MAX_PROOF_AGE = 120;
const MAX_BODY_BYTES = 16 * 1024;

const KV = {
  client: (id: string) => `singpass-demo:client:${id}`,
  par: (id: string) => `singpass-demo:par:${id}`,
  code: (code: string) => `singpass-demo:code:${code}`,
  jti: (scope: string, jti: string) => `singpass-demo:jti:${scope}:${jti}`,
  serverKey: "singpass-demo:server-key",
};

const CLIENT_ASSERTION_TYPE = "urn:ietf:params:oauth:client-assertion-type:jwt-bearer";
const REQUEST_URI_PREFIX = "urn:ietf:params:oauth:request_uri:";
const STATE_PATTERN = /^[A-Za-z0-9/+_\-=.]{1,255}$/;
const LOGIN_SCOPES = ["openid", "user.identity", "name", "email", "mobileno"];
const MYINFO_SCOPES = ["openid", "uinfin", "name", "sex", "dob", "nationality", "email", "mobileno"];

/** Obviously fake. S1234567D is the well-known sample NRIC, not a person. */
const SAMPLE_PERSON = {
  sub: "5ab6c0de-0000-4000-8000-5a3b1e000001",
  identity_number: "S1234567D",
  name: "TAN AH KOW (SAMPLE)",
  email: "tan.ah.kow.sample@example.com",
  mobileno: "80000000",
  sex: { code: "M", desc: "MALE" },
  dob: "1980-01-01",
  nationality: { code: "SG", desc: "SINGAPORE CITIZEN" },
};

const now = () => Math.floor(Date.now() / 1000);

class OAuthError extends Error {
  constructor(
    readonly code: string,
    description: string,
    readonly status = 400
  ) {
    super(description);
  }
}

function json(body: unknown, status = 200, cache = "no-store"): Response {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": cache },
  });
}

function oauthError(err: OAuthError): Response {
  const res = json({ error: err.code, error_description: err.message }, err.status);
  if (err.status === 401 && err.code.startsWith("invalid_")) {
    res.headers.set("WWW-Authenticate", `DPoP error="${err.code}"`);
  }
  return res;
}

// ─── Server signing key ─────────────────────────────────────────────────────

async function serverKey(kv: KVNamespace): Promise<ServerKey> {
  const stored = await kv.get<ServerKey>(KV.serverKey, "json");
  if (stored) return stored;
  // The demo key must be exportable so every isolate can sign with it.
  const pair = (await crypto.subtle.generateKey({ name: "ECDSA", namedCurve: "P-256" }, true, [
    "sign",
    "verify",
  ])) as CryptoKeyPair;
  const created: ServerKey = {
    kid: `startech-mock-${new Date().toISOString().slice(0, 10)}-${randomToken(4)}`,
    privateJwk: (await crypto.subtle.exportKey("jwk", pair.privateKey)) as JsonWebKey,
  };
  await kv.put(KV.serverKey, JSON.stringify(created), { expirationTtl: SERVER_KEY_TTL });
  return created;
}

function serverPublicJwk(key: ServerKey): EcPublicJwk {
  const { x, y } = key.privateJwk;
  return { kty: "EC", crv: "P-256", x: x as string, y: y as string, kid: key.kid, use: "sig", alg: "ES256" };
}

async function serverSign(kv: KVNamespace, header: JsonObject, payload: JsonObject): Promise<string> {
  const key = await serverKey(kv);
  const privateKey = await crypto.subtle.importKey(
    "jwk",
    key.privateJwk,
    { name: "ECDSA", namedCurve: "P-256" },
    false,
    ["sign"]
  );
  return signJws({ ...header, kid: key.kid }, payload, privateKey);
}

// ─── Request helpers ────────────────────────────────────────────────────────

async function readForm(request: Request): Promise<URLSearchParams> {
  if (!(request.headers.get("content-type") ?? "").startsWith("application/x-www-form-urlencoded")) {
    throw new OAuthError("invalid_request", "Body must be application/x-www-form-urlencoded.");
  }
  const text = await request.text();
  if (text.length > MAX_BODY_BYTES) throw new OAuthError("invalid_request", "Body too large.");
  const form = new URLSearchParams(text);
  // RFC 6749 §3.1: parameters must not be repeated.
  const seen = new Set<string>();
  for (const key of form.keys()) {
    if (seen.has(key)) throw new OAuthError("invalid_request", `${key} is repeated.`);
    seen.add(key);
  }
  return form;
}

async function readJson(request: Request): Promise<Record<string, unknown>> {
  const text = await request.text();
  if (text.length > MAX_BODY_BYTES) throw new OAuthError("invalid_request", "Body too large.");
  try {
    const value = JSON.parse(text);
    if (value && typeof value === "object" && !Array.isArray(value)) return value;
  } catch {
    // Fall through.
  }
  throw new OAuthError("invalid_request", "Body must be a JSON object.");
}

function required(form: URLSearchParams, name: string): string {
  const value = form.get(name);
  if (!value) throw new OAuthError("invalid_request", `${name} is required.`);
  return value;
}

/** A jti may be used once. Returns false if it was seen in the last two minutes. */
async function claimJti(kv: KVNamespace, scope: string, jti: unknown): Promise<boolean> {
  if (typeof jti !== "string" || jti.length < 16 || jti.length > 128) return false;
  const key = KV.jti(scope, jti);
  if ((await kv.get(key)) !== null) return false;
  await kv.put(key, "1", { expirationTtl: JTI_TTL });
  return true;
}

async function loadClient(kv: KVNamespace, clientId: string | null): Promise<ClientRecord> {
  if (!clientId || !/^[A-Za-z0-9]{32}$/.test(clientId)) {
    throw new OAuthError("invalid_client", "Unknown client_id.", 401);
  }
  const client = await kv.get<ClientRecord>(KV.client(clientId), "json");
  if (!client) throw new OAuthError("invalid_client", "Unknown or expired client_id.", 401);
  return client;
}

/**
 * private_key_jwt per the Singpass guide: typ JWT, iss = sub = client_id,
 * aud = issuer, exp at most 2 minutes after iat, single-use jti, signed by a
 * `use: sig` key in the registered JWKS.
 */
async function verifyClientAssertion(
  kv: KVNamespace,
  form: URLSearchParams,
  issuer: string
): Promise<ClientRecord> {
  if (form.get("client_assertion_type") !== CLIENT_ASSERTION_TYPE) {
    throw new OAuthError("invalid_client", "client_assertion_type must be jwt-bearer.", 401);
  }
  const assertion = required(form, "client_assertion");
  let claims: JsonObject;
  let header: JsonObject;
  try {
    ({ header, payload: claims } = decodeJws(assertion));
  } catch {
    throw new OAuthError("invalid_client", "client_assertion is not a JWT.", 401);
  }
  if (header.typ !== "JWT") throw new OAuthError("invalid_client", "client_assertion typ must be JWT.", 401);
  const clientId = typeof claims.iss === "string" ? claims.iss : null;
  const client = await loadClient(kv, clientId);
  if (claims.sub !== clientId) throw new OAuthError("invalid_client", "sub must equal iss.", 401);
  const bodyClientId = form.get("client_id");
  if (bodyClientId && bodyClientId !== clientId) {
    throw new OAuthError("invalid_client", "client_id does not match the assertion.", 401);
  }
  if (claims.aud !== issuer) throw new OAuthError("invalid_client", "aud must be the issuer.", 401);
  const t = now();
  if (typeof claims.iat !== "number" || typeof claims.exp !== "number") {
    throw new OAuthError("invalid_client", "iat and exp are required.", 401);
  }
  if (claims.exp <= t) throw new OAuthError("invalid_client", "client_assertion has expired.", 401);
  if (claims.exp - claims.iat > MAX_PROOF_AGE || claims.iat > t + 30) {
    throw new OAuthError("invalid_client", "exp must be within 2 minutes of iat.", 401);
  }
  try {
    await verifyJwsWithJwks(assertion, { keys: client.jwks.keys.filter((k) => k.use === "sig") });
  } catch {
    throw new OAuthError("invalid_client", "client_assertion signature does not verify.", 401);
  }
  if (!(await claimJti(kv, `ca:${client.client_id}`, claims.jti))) {
    throw new OAuthError("invalid_client", "client_assertion jti missing or already used.", 401);
  }
  return client;
}

/**
 * RFC 9449 §4.3 checks. Returns the JWK thumbprint the code or token gets
 * bound to. `htu` is compared without query or fragment.
 */
async function verifyDpop(
  kv: KVNamespace,
  request: Request,
  accessToken?: string
): Promise<string> {
  const proof = request.headers.get("DPoP");
  if (!proof) throw new OAuthError("invalid_request", "DPoP header is required.");
  const fail = (msg: string): never => {
    throw new OAuthError("invalid_dpop_proof", msg);
  };
  let decoded: ReturnType<typeof decodeJws>;
  try {
    decoded = decodeJws(proof);
  } catch {
    return fail("DPoP proof is not a JWT.");
  }
  const { header, payload } = decoded;
  if (header.typ !== "dpop+jwt") fail("typ must be dpop+jwt.");
  if (header.alg !== "ES256") fail("alg must be ES256 on this server.");
  let jwk: EcPublicJwk;
  try {
    jwk = asPublicJwk(header.jwk);
  } catch (err) {
    return fail(err instanceof JoseError ? err.message : "jwk is invalid.");
  }
  try {
    await verifyJws(proof, await importVerifyKey(jwk));
  } catch {
    fail("DPoP proof signature does not verify against its jwk.");
  }
  const url = new URL(request.url);
  if (payload.htm !== request.method) fail("htm does not match the request method.");
  if (payload.htu !== `${url.origin}${url.pathname}`) fail("htu does not match the request URL.");
  const t = now();
  if (typeof payload.iat !== "number" || payload.iat > t + 30 || payload.iat < t - MAX_PROOF_AGE) {
    fail("iat is missing or outside the accepted window.");
  }
  if (payload.exp !== undefined) {
    if (typeof payload.exp !== "number" || payload.exp <= t) fail("DPoP proof has expired.");
    if ((payload.exp as number) - (payload.iat as number) > MAX_PROOF_AGE) fail("exp is more than 2 minutes after iat.");
  }
  if (accessToken !== undefined && payload.ath !== (await sha256b64url(accessToken))) {
    fail("ath does not match the access token.");
  }
  if (!(await claimJti(kv, "dpop", payload.jti))) fail("jti missing or already used.");
  return jwkThumbprint(jwk);
}

// ─── Endpoints ──────────────────────────────────────────────────────────────

function discovery(issuer: string): Response {
  return json(
    {
      issuer,
      authorization_endpoint: `${issuer}/auth`,
      pushed_authorization_request_endpoint: `${issuer}/par`,
      token_endpoint: `${issuer}/token`,
      userinfo_endpoint: `${issuer}/userinfo`,
      jwks_uri: `${issuer}/jwks`,
      require_pushed_authorization_requests: true,
      response_types_supported: ["code"],
      grant_types_supported: ["authorization_code"],
      scopes_supported: [...new Set([...LOGIN_SCOPES, ...MYINFO_SCOPES])],
      subject_types_supported: ["public"],
      code_challenge_methods_supported: ["S256"],
      token_endpoint_auth_methods_supported: ["private_key_jwt"],
      token_endpoint_auth_signing_alg_values_supported: ["ES256"],
      dpop_signing_alg_values_supported: ["ES256"],
      id_token_signing_alg_values_supported: ["ES256"],
      id_token_encryption_alg_values_supported: ["ECDH-ES+A256KW"],
      id_token_encryption_enc_values_supported: ["A256CBC-HS512"],
      userinfo_signing_alg_values_supported: ["ES256"],
      userinfo_encryption_alg_values_supported: ["ECDH-ES+A256KW"],
      userinfo_encryption_enc_values_supported: ["A256CBC-HS512"],
      acr_values_supported: ["urn:singpass:authentication:loa:2", "urn:singpass:authentication:loa:3"],
      authorization_response_iss_parameter_supported: true,
      service_documentation: "https://docs.developer.singpass.gov.sg/docs/technical-specifications/integration-guide",
      x_mock_notice:
        "StarTech reference demo. Not Singpass and not affiliated with Singpass or GovTech. Sample data only.",
    },
    200,
    "public, max-age=300"
  );
}

async function jwksEndpoint(kv: KVNamespace): Promise<Response> {
  return json({ keys: [serverPublicJwk(await serverKey(kv))] }, 200, "public, max-age=60");
}

/** Mock-only: what the Developer Portal does when an app is created. */
async function register(request: Request, kv: KVNamespace, origin: string): Promise<Response> {
  const body = await readJson(request);
  const appType = body.app_type;
  if (appType !== "login" && appType !== "myinfo") {
    throw new OAuthError("invalid_client_metadata", "app_type must be login or myinfo.");
  }
  const redirectUri = typeof body.redirect_uri === "string" ? body.redirect_uri : "";
  let redirect: URL;
  try {
    redirect = new URL(redirectUri);
  } catch {
    throw new OAuthError("invalid_redirect_uri", "redirect_uri must be an absolute URL.");
  }
  // Singpass rejects custom schemes. The demo also pins it to this site.
  if (redirect.origin !== origin || redirect.hash) {
    throw new OAuthError("invalid_redirect_uri", "redirect_uri must be on this site, without a fragment.");
  }

  const rawKeys = (body.jwks as { keys?: unknown } | undefined)?.keys;
  if (!Array.isArray(rawKeys) || rawKeys.length === 0 || rawKeys.length > 4) {
    throw new OAuthError("invalid_client_metadata", "jwks.keys must hold one to four keys.");
  }
  let keys: EcPublicJwk[];
  try {
    keys = rawKeys.map(asPublicJwk);
  } catch (err) {
    throw new OAuthError("invalid_client_metadata", err instanceof Error ? err.message : "Bad JWK.");
  }
  // The Singpass JWKS rules: unique kids, at least one sig and one enc key,
  // enc keys with an ECDH-ES key-wrap alg.
  const kids = keys.map((k) => k.kid);
  if (kids.some((k) => !k) || new Set(kids).size !== kids.length) {
    throw new OAuthError("invalid_client_metadata", "Every key needs a unique kid.");
  }
  if (!keys.some((k) => k.use === "sig")) {
    throw new OAuthError("invalid_client_metadata", "JWKS needs a signing key (use: sig).");
  }
  if (!keys.some((k) => k.use === "enc" && k.alg === "ECDH-ES+A256KW")) {
    throw new OAuthError("invalid_client_metadata", "JWKS needs an encryption key (use: enc, alg: ECDH-ES+A256KW).");
  }

  const clientId = randomToken(24).replace(/[-_]/g, "x").slice(0, 32);
  const record: ClientRecord = { client_id: clientId, app_type: appType, redirect_uri: redirectUri, jwks: { keys } };
  await kv.put(KV.client(clientId), JSON.stringify(record), { expirationTtl: CLIENT_TTL });
  return json({ client_id: clientId, app_type: appType, redirect_uris: [redirectUri], expires_in: CLIENT_TTL }, 201);
}

async function par(request: Request, kv: KVNamespace, issuer: string): Promise<Response> {
  const form = await readForm(request);
  // Without a DPoP header Singpass accepts dpop_jkt; this mock requires the header.
  const dpopJkt = await verifyDpop(kv, request);
  const client = await verifyClientAssertion(kv, form, issuer);
  const state = form.get("state") ?? "";

  if (form.get("response_type") !== "code") throw new OAuthError("invalid_request", "response_type must be code.");
  if (form.get("client_id") !== client.client_id) throw new OAuthError("invalid_request", "client_id is required.");
  if (form.get("redirect_uri") !== client.redirect_uri) {
    throw new OAuthError("invalid_request", "redirect_uri is not registered for this client.");
  }
  if (!STATE_PATTERN.test(state)) throw new OAuthError("invalid_request", "state is missing or malformed.");
  const nonce = required(form, "nonce");
  if (nonce.length > 255) throw new OAuthError("invalid_request", "nonce is too long.");
  if (form.get("code_challenge_method") !== "S256") {
    throw new OAuthError("invalid_request", "code_challenge_method must be S256.");
  }
  const challenge = required(form, "code_challenge");
  if (!/^[A-Za-z0-9_-]{43}$/.test(challenge)) throw new OAuthError("invalid_request", "code_challenge is malformed.");

  const scopes = required(form, "scope").split(" ");
  const allowed = client.app_type === "login" ? LOGIN_SCOPES : MYINFO_SCOPES;
  if (!scopes.includes("openid")) throw new OAuthError("invalid_scope", "scope must include openid.");
  const unknown = scopes.find((s) => !allowed.includes(s));
  if (unknown) throw new OAuthError("invalid_scope", `${unknown} is not allowed for this app.`);

  const contextType = form.get("authentication_context_type") ?? undefined;
  if (client.app_type === "login" && !contextType) {
    throw new OAuthError("invalid_request", "authentication_context_type is mandatory for Login apps.");
  }
  if (client.app_type === "myinfo" && contextType) {
    throw new OAuthError("invalid_request", "authentication_context_type is only allowed for Login apps.");
  }

  const id = randomToken(16);
  const record: ParRecord = {
    client_id: client.client_id,
    redirect_uri: client.redirect_uri,
    scope: scopes.join(" "),
    state,
    nonce,
    code_challenge: challenge,
    dpop_jkt: dpopJkt,
    authentication_context_type: contextType,
  };
  await kv.put(KV.par(id), JSON.stringify(record), { expirationTtl: REQUEST_URI_TTL });
  return json({ request_uri: `${REQUEST_URI_PREFIX}${id}`, expires_in: REQUEST_URI_TTL }, 201);
}

async function loadPar(kv: KVNamespace, clientId: unknown, requestUri: unknown) {
  if (typeof requestUri !== "string" || !requestUri.startsWith(REQUEST_URI_PREFIX)) {
    throw new OAuthError("invalid_request_uri", "request_uri is missing or malformed.");
  }
  const id = requestUri.slice(REQUEST_URI_PREFIX.length);
  const record = await kv.get<ParRecord>(KV.par(id), "json");
  if (!record || record.client_id !== clientId) {
    throw new OAuthError("invalid_request_uri", "request_uri is invalid, expired or already used.");
  }
  return { id, record };
}

/** Mock-only: the pending request a real login page would render. */
async function authorizationPage(url: URL, kv: KVNamespace): Promise<Response> {
  const { record } = await loadPar(kv, url.searchParams.get("client_id"), url.searchParams.get("request_uri"));
  return json({
    mock_login_page: true,
    client_id: record.client_id,
    scope: record.scope,
    authentication_context_type: record.authentication_context_type ?? null,
    sample_user: { name: SAMPLE_PERSON.name, identity_number: SAMPLE_PERSON.identity_number },
  });
}

/** Mock-only: the user finishes (or cancels) login; returns the redirect as JSON. */
async function authorizationDecision(request: Request, kv: KVNamespace, issuer: string): Promise<Response> {
  const body = await readJson(request);
  const { id, record } = await loadPar(kv, body.client_id, body.request_uri);
  await kv.delete(KV.par(id)); // request_uri is single use

  const redirect = new URL(record.redirect_uri);
  redirect.searchParams.set("state", record.state);
  redirect.searchParams.set("iss", issuer);
  if (body.approve !== true) {
    redirect.searchParams.set("error", "access_denied");
    redirect.searchParams.set("error_description", "The user cancelled the login.");
    return json({ redirect_to: redirect.toString() });
  }
  const code = randomToken(32);
  const codeRecord: CodeRecord = { ...record, auth_time: now() };
  await kv.put(KV.code(code), JSON.stringify(codeRecord), { expirationTtl: CODE_TTL });
  redirect.searchParams.set("code", code);
  return json({ redirect_to: redirect.toString() });
}

function idTokenClaims(record: CodeRecord, issuer: string): JsonObject {
  const scopes = record.scope.split(" ");
  const attrs: JsonObject = {};
  if (scopes.includes("user.identity")) {
    attrs.account_type = "standard";
    attrs.identity_number = SAMPLE_PERSON.identity_number;
    attrs.identity_coi = "SG";
  }
  if (scopes.includes("name")) attrs.name = SAMPLE_PERSON.name;
  if (scopes.includes("email")) attrs.email = SAMPLE_PERSON.email;
  if (scopes.includes("mobileno")) attrs.mobileno = SAMPLE_PERSON.mobileno;
  const t = now();
  return {
    iss: issuer,
    aud: record.client_id,
    sub: SAMPLE_PERSON.sub,
    sub_type: "user",
    ...(Object.keys(attrs).length ? { sub_attributes: attrs } : {}),
    acr: "urn:singpass:authentication:loa:2",
    amr: ["pwd", "otp-sms"],
    iat: t,
    exp: t + ID_TOKEN_LIFETIME,
    nonce: record.nonce,
  };
}

function encryptionKey(client: ClientRecord): EcPublicJwk {
  const key = client.jwks.keys.find((k) => k.use === "enc" && k.alg === "ECDH-ES+A256KW");
  if (!key) throw new OAuthError("invalid_client", "No encryption key registered.", 401);
  return key;
}

async function token(request: Request, kv: KVNamespace, issuer: string): Promise<Response> {
  const form = await readForm(request);
  const dpopJkt = await verifyDpop(kv, request);
  const client = await verifyClientAssertion(kv, form, issuer);
  if (form.get("grant_type") !== "authorization_code") {
    throw new OAuthError("unsupported_grant_type", "grant_type must be authorization_code.");
  }
  const code = required(form, "code");
  const record = await kv.get<CodeRecord>(KV.code(code), "json");
  if (!record || record.client_id !== client.client_id) {
    throw new OAuthError("invalid_grant", "code is invalid, expired or already used.");
  }
  if (form.get("redirect_uri") !== record.redirect_uri) {
    throw new OAuthError("invalid_grant", "redirect_uri does not match the authorization request.");
  }
  const verifier = required(form, "code_verifier");
  if (!/^[A-Za-z0-9_-]{43,128}$/.test(verifier) || (await sha256b64url(verifier)) !== record.code_challenge) {
    throw new OAuthError("invalid_grant", "code_verifier does not match code_challenge (PKCE).");
  }
  if (dpopJkt !== record.dpop_jkt) {
    throw new OAuthError("invalid_grant", "DPoP key is not the one the code was issued to.");
  }
  // Consumed only once every binding check has passed, so someone holding a
  // stolen code but not the key cannot burn the real user's login.
  await kv.delete(KV.code(code));

  const t = now();
  const accessToken = await serverSign(
    kv,
    { typ: "at+jwt" },
    {
      iss: issuer,
      sub: SAMPLE_PERSON.sub,
      client_id: client.client_id,
      scope: record.scope,
      iat: t,
      exp: t + ACCESS_TOKEN_LIFETIME,
      jti: crypto.randomUUID(),
      cnf: { jkt: dpopJkt },
    }
  );
  const signedIdToken = await serverSign(kv, { typ: "JWT" }, idTokenClaims(record, issuer));
  const idToken = await encryptJwe(signedIdToken, encryptionKey(client), { cty: "JWT" });
  return json({ access_token: accessToken, id_token: idToken, token_type: "DPoP" });
}

function personInfo(scopes: string[]): JsonObject {
  const meta = { lastupdated: "2026-01-01", source: "1", classification: "C" };
  const out: JsonObject = {};
  if (scopes.includes("uinfin")) out.uinfin = { ...meta, value: SAMPLE_PERSON.identity_number };
  if (scopes.includes("name")) out.name = { ...meta, value: SAMPLE_PERSON.name };
  if (scopes.includes("sex")) out.sex = { ...meta, ...SAMPLE_PERSON.sex };
  if (scopes.includes("dob")) out.dob = { ...meta, value: SAMPLE_PERSON.dob };
  if (scopes.includes("nationality")) out.nationality = { ...meta, ...SAMPLE_PERSON.nationality };
  if (scopes.includes("email")) out.email = { ...meta, source: "4", value: SAMPLE_PERSON.email };
  if (scopes.includes("mobileno")) {
    out.mobileno = { ...meta, source: "4", prefix: { value: "+" }, areacode: { value: "65" }, nbr: { value: "80000000" } };
  }
  return out;
}

async function userinfo(request: Request, kv: KVNamespace, issuer: string): Promise<Response> {
  const authorization = request.headers.get("Authorization") ?? "";
  if (!authorization.startsWith("DPoP ")) {
    throw new OAuthError("invalid_token", "Authorization must use the DPoP scheme.", 401);
  }
  const accessToken = authorization.slice(5).trim();
  const key = await serverKey(kv);
  let claims: JsonObject;
  try {
    ({ payload: claims } = await verifyJws(accessToken, await importVerifyKey(serverPublicJwk(key))));
  } catch {
    throw new OAuthError("invalid_token", "Access token does not verify.", 401);
  }
  if (claims.iss !== issuer || typeof claims.exp !== "number" || claims.exp <= now()) {
    throw new OAuthError("invalid_token", "Access token is expired or not from this issuer.", 401);
  }
  let jkt: string;
  try {
    jkt = await verifyDpop(kv, request, accessToken);
  } catch (err) {
    if (err instanceof OAuthError) throw new OAuthError(err.code, err.message, 401);
    throw err;
  }
  const cnf = claims.cnf as { jkt?: unknown } | undefined;
  if (!cnf || cnf.jkt !== jkt) {
    throw new OAuthError("invalid_token", "Access token is bound to a different DPoP key.", 401);
  }
  const client = await loadClient(kv, typeof claims.client_id === "string" ? claims.client_id : null);
  if (client.app_type !== "myinfo") {
    throw new OAuthError("insufficient_scope", "Login apps read the ID token; userinfo is for Myinfo apps.", 403);
  }
  const signed = await serverSign(
    kv,
    { typ: "JWT" },
    {
      person_info: personInfo(String(claims.scope ?? "").split(" ")),
      iss: issuer,
      sub: claims.sub,
      aud: client.client_id,
      iat: now(),
    }
  );
  const body = await encryptJwe(signed, encryptionKey(client), { cty: "JWT" });
  return new Response(body, { headers: { "Content-Type": "application/jwt", "Cache-Control": "no-store" } });
}

// ─── Router ─────────────────────────────────────────────────────────────────

/**
 * GETs are allowed without an Origin header (browsers omit it on same-origin
 * GETs, and discovery/JWKS are public by design) but never from another
 * site: a cross-site browser request carries Origin or Sec-Fetch-Site.
 * Everything else must pass the site's validateOrigin.
 */
function originOk(request: Request, deps: SingpassDemoDeps): boolean {
  if (request.method !== "GET") return deps.originAllowed;
  if (request.headers.get("Origin")) return deps.originAllowed;
  const site = request.headers.get("Sec-Fetch-Site");
  return site === null || site === "same-origin" || site === "none";
}

export async function handleSingpassDemo(request: Request, deps: SingpassDemoDeps): Promise<Response> {
  const url = new URL(request.url);
  const route = url.pathname.slice(SINGPASS_DEMO_PREFIX.length);
  const limits = RATE_LIMITS[route];
  if (!limits) return json({ error: "not_found", error_description: "No such endpoint." }, 404);

  const isGet = route.startsWith("fapi/.well-known") || route === "fapi/jwks" || route === "fapi/auth" || route === "fapi/userinfo";
  if (request.method !== (isGet ? "GET" : "POST")) {
    return json({ error: "invalid_request", error_description: "Method not allowed." }, 405);
  }
  if (!originOk(request, deps)) return json({ error: "access_denied", error_description: "Forbidden." }, 403);
  if (await deps.isRateLimited(`ip:${deps.clientIp}:singpass:${route}`, limits[0], limits[1])) {
    const res = json({ error: "slow_down", error_description: "Too many requests. Please try again later." }, 429);
    res.headers.set("Retry-After", "60");
    return res;
  }

  const issuer = `${url.origin}${SINGPASS_DEMO_PREFIX}fapi`;
  const kv = deps.kv;
  try {
    switch (route) {
      case "fapi/.well-known/openid-configuration":
        return discovery(issuer);
      case "fapi/jwks":
        return await jwksEndpoint(kv);
      case "register":
        return await register(request, kv, url.origin);
      case "fapi/par":
        return await par(request, kv, issuer);
      case "fapi/auth":
        return await authorizationPage(url, kv);
      case "fapi/auth/decision":
        return await authorizationDecision(request, kv, issuer);
      case "fapi/token":
        return await token(request, kv, issuer);
      case "fapi/userinfo":
        return await userinfo(request, kv, issuer);
    }
  } catch (err) {
    if (err instanceof OAuthError) return oauthError(err);
    return json({ error: "server_error", error_description: "The mock server hit an unexpected error." }, 500);
  }
  return json({ error: "not_found", error_description: "No such endpoint." }, 404);
}
