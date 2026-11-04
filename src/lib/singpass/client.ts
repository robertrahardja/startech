/**
 * A Singpass FAPI 2.0 relying-party client: PAR, PKCE (S256), DPoP-bound
 * tokens, private_key_jwt client authentication, encrypted ID tokens and
 * (for Myinfo v5 apps) the encrypted userinfo response.
 *
 * Parameter names, endpoints and checks follow the Singpass integration
 * guide (docs.developer.singpass.gov.sg, "Integration Guide" and "Technical
 * Concepts"). Everything environment-specific is in SingpassClientConfig:
 * the same code talks to the StarTech mock server, Singpass staging
 * (https://stg-id.singpass.gov.sg/fapi) or production
 * (https://id.singpass.gov.sg/fapi). See docs/OPERATIONS.md, "Singpass demo".
 *
 * It depends only on fetch and WebCrypto, so it runs unchanged in a browser
 * (the demo page) or in a Worker (where a real integration must run it,
 * because the signing and decryption keys belong on the server).
 */

import {
  JoseError,
  decryptJwe,
  generateSigningKeyPair,
  exportPublicJwk,
  jwkThumbprint,
  randomToken,
  sha256b64url,
  signJws,
  verifyJwsWithJwks,
  type EcPublicJwk,
  type JsonObject,
  type Jwks,
} from "./jose";

export type SingpassAppType = "login" | "myinfo";

export interface SingpassClientConfig {
  /** Issuer identifier, e.g. https://stg-id.singpass.gov.sg/fapi */
  issuer: string;
  /** The App ID from the Singpass Developer Portal (32 characters). */
  clientId: string;
  /** Must be one of the redirect URLs registered for the app. */
  redirectUri: string;
  appType: SingpassAppType;
  /** Space-delimited; must include openid. */
  scope: string;
  /** Mandatory for Login apps, not allowed for Myinfo apps. */
  authenticationContextType?: string;
  /** Private half of a `use: sig` key in the app's registered JWKS. */
  signingKey: { privateKey: CryptoKey; kid: string };
  /** Private half of a `use: enc` key in the app's registered JWKS. */
  decryptionKey: CryptoKey;
  /** Injected so a caller can record or proxy every HTTP exchange. */
  fetch?: typeof fetch;
  /** Called with every request and response, for logging or display. */
  onExchange?: (exchange: HttpExchange) => void;
}

export interface ProviderMetadata {
  issuer: string;
  authorization_endpoint: string;
  pushed_authorization_request_endpoint: string;
  token_endpoint: string;
  userinfo_endpoint: string;
  jwks_uri: string;
  [key: string]: unknown;
}

export interface HttpExchange {
  label: string;
  method: "GET" | "POST";
  url: string;
  requestHeaders: Record<string, string>;
  /** Form parameters for a POST, absent for a GET. */
  requestBody?: Record<string, string>;
  status: number;
  responseHeaders: Record<string, string>;
  responseBody: unknown;
}

/** Everything one login attempt needs to remember between the redirects. */
export interface AuthSession {
  state: string;
  nonce: string;
  codeVerifier: string;
  codeChallenge: string;
  /** Ephemeral DPoP key: one per authentication, used for PAR, token and userinfo. */
  dpopKey: CryptoKeyPair;
  dpopJwk: EcPublicJwk;
  dpopJkt: string;
}

export interface ParResult {
  requestUri: string;
  expiresIn: number;
  authorizationUrl: string;
}

export interface TokenSet {
  accessToken: string;
  idToken: string;
  tokenType: string;
}

/** An OAuth error response, from a JSON body or from the redirect URL. */
export class SingpassError extends Error {
  readonly code: string;
  readonly status?: number;
  constructor(code: string, description: string, status?: number) {
    super(description || code);
    this.name = "SingpassError";
    this.code = code;
    this.status = status;
  }
}

const CLIENT_ASSERTION_TYPE = "urn:ietf:params:oauth:client-assertion-type:jwt-bearer";
/** Singpass: assertion and DPoP proof lifetimes must be at most 2 minutes. */
const JWT_LIFETIME_SECONDS = 110;
/** Allowance for clock difference when checking `exp` on what we receive. */
const CLOCK_SKEW_SECONDS = 30;

const now = () => Math.floor(Date.now() / 1000);

export class SingpassClient {
  readonly config: SingpassClientConfig;
  private metadata?: ProviderMetadata;
  private jwks?: Jwks;

  constructor(config: SingpassClientConfig) {
    if (!config.scope.split(" ").includes("openid")) {
      throw new Error("scope must include openid.");
    }
    if (config.appType === "login" && !config.authenticationContextType) {
      throw new Error("Login apps must send authentication_context_type.");
    }
    this.config = config;
  }

  // ─── HTTP ─────────────────────────────────────────────────────────────────

  private async send(
    label: string,
    method: "GET" | "POST",
    url: string,
    headers: Record<string, string>,
    form?: Record<string, string>
  ): Promise<{ status: number; body: unknown; headers: Headers }> {
    const doFetch = this.config.fetch ?? globalThis.fetch.bind(globalThis);
    const requestHeaders = form
      ? { ...headers, "Content-Type": "application/x-www-form-urlencoded" }
      : headers;
    const res = await doFetch(url, {
      method,
      headers: requestHeaders,
      body: form ? new URLSearchParams(form).toString() : undefined,
    });
    const text = await res.text();
    const type = res.headers.get("content-type") ?? "";
    let body: unknown = text;
    if (type.includes("json")) {
      try {
        body = JSON.parse(text);
      } catch {
        // Leave as text; the caller reports the status.
      }
    }
    const responseHeaders: Record<string, string> = {};
    for (const name of ["content-type", "cache-control", "dpop-nonce", "www-authenticate"]) {
      const value = res.headers.get(name);
      if (value) responseHeaders[name] = value;
    }
    this.config.onExchange?.({
      label,
      method,
      url,
      requestHeaders,
      requestBody: form,
      status: res.status,
      responseHeaders,
      responseBody: body,
    });
    if (!res.ok) {
      const err = (body && typeof body === "object" ? body : {}) as Record<string, unknown>;
      throw new SingpassError(
        typeof err.error === "string" ? err.error : "http_error",
        typeof err.error_description === "string" ? err.error_description : `HTTP ${res.status}`,
        res.status
      );
    }
    return { status: res.status, body, headers: res.headers };
  }

  // ─── Discovery ────────────────────────────────────────────────────────────

  /** OpenID configuration. Singpass asks clients to cache it for an hour or more. */
  async discover(): Promise<ProviderMetadata> {
    if (this.metadata) return this.metadata;
    const url = `${this.config.issuer}/.well-known/openid-configuration`;
    const { body } = await this.send("discovery", "GET", url, { Accept: "application/json" });
    const meta = body as ProviderMetadata;
    if (meta.issuer !== this.config.issuer) {
      throw new SingpassError("invalid_issuer", "Discovery issuer does not match configuration.");
    }
    this.metadata = meta;
    return meta;
  }

  private async providerJwks(): Promise<Jwks> {
    if (this.jwks) return this.jwks;
    const meta = await this.discover();
    const { body } = await this.send("jwks", "GET", meta.jwks_uri, { Accept: "application/json" });
    this.jwks = body as Jwks;
    return this.jwks;
  }

  // ─── Proofs ───────────────────────────────────────────────────────────────

  /** private_key_jwt: iss = sub = client_id, aud = issuer, exp ≤ iat + 2 min. */
  async clientAssertion(): Promise<string> {
    const iat = now();
    return signJws(
      { typ: "JWT", kid: this.config.signingKey.kid },
      {
        iss: this.config.clientId,
        sub: this.config.clientId,
        aud: this.config.issuer,
        iat,
        exp: iat + JWT_LIFETIME_SECONDS,
        jti: crypto.randomUUID(),
      },
      this.config.signingKey.privateKey
    );
  }

  /** RFC 9449 DPoP proof. `ath` binds the proof to an access token (userinfo). */
  async dpopProof(
    session: AuthSession,
    htm: "GET" | "POST",
    htu: string,
    accessToken?: string
  ): Promise<string> {
    const iat = now();
    const payload: JsonObject = {
      jti: crypto.randomUUID(),
      htm,
      htu,
      iat,
      exp: iat + JWT_LIFETIME_SECONDS,
    };
    if (accessToken) payload.ath = await sha256b64url(accessToken);
    return signJws({ typ: "dpop+jwt", jwk: session.dpopJwk }, payload, session.dpopKey.privateKey);
  }

  // ─── Flow ─────────────────────────────────────────────────────────────────

  /**
   * Fresh state, nonce, PKCE pair and DPoP key for one login attempt. A
   * server that stores the session across the redirect needs the DPoP key
   * extractable; a browser does not.
   */
  async createSession(options: { extractableDpopKey?: boolean } = {}): Promise<AuthSession> {
    const codeVerifier = randomToken(32);
    const dpopKey = await generateSigningKeyPair(options.extractableDpopKey ?? false);
    const dpopJwk = await exportPublicJwk(dpopKey.publicKey);
    return {
      state: crypto.randomUUID(),
      nonce: crypto.randomUUID(),
      codeVerifier,
      codeChallenge: await sha256b64url(codeVerifier),
      dpopKey,
      dpopJwk,
      dpopJkt: await jwkThumbprint(dpopJwk),
    };
  }

  /** Step 1: the pushed authorization request, then the URL to send the user to. */
  async pushAuthorizationRequest(session: AuthSession): Promise<ParResult> {
    const meta = await this.discover();
    const endpoint = meta.pushed_authorization_request_endpoint;
    const form: Record<string, string> = {
      response_type: "code",
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      scope: this.config.scope,
      state: session.state,
      nonce: session.nonce,
      code_challenge: session.codeChallenge,
      code_challenge_method: "S256",
      client_assertion_type: CLIENT_ASSERTION_TYPE,
      client_assertion: await this.clientAssertion(),
    };
    if (this.config.authenticationContextType) {
      form.authentication_context_type = this.config.authenticationContextType;
    }
    const { body } = await this.send(
      "par",
      "POST",
      endpoint,
      { DPoP: await this.dpopProof(session, "POST", endpoint) },
      form
    );
    const res = body as { request_uri?: unknown; expires_in?: unknown };
    if (typeof res.request_uri !== "string") {
      throw new SingpassError("invalid_response", "PAR response has no request_uri.");
    }
    const url = new URL(meta.authorization_endpoint);
    url.searchParams.set("client_id", this.config.clientId);
    url.searchParams.set("request_uri", res.request_uri);
    return {
      requestUri: res.request_uri,
      expiresIn: typeof res.expires_in === "number" ? res.expires_in : 0,
      authorizationUrl: url.toString(),
    };
  }

  /**
   * Step 2: the redirect back. Checks `state` (CSRF) and `iss` (mix-up,
   * RFC 9207), and surfaces an Authentication Error Response as an error.
   * Callers must not show `error_description` to users verbatim.
   */
  async handleRedirect(session: AuthSession, redirectUrl: string): Promise<string> {
    const params = new URL(redirectUrl).searchParams;
    if (params.get("state") !== session.state) {
      throw new SingpassError("state_mismatch", "state does not match this session.");
    }
    const iss = params.get("iss");
    if (iss !== null && iss !== (await this.discover()).issuer) {
      throw new SingpassError("invalid_issuer", "iss on the redirect is not the expected issuer.");
    }
    const error = params.get("error");
    if (error) throw new SingpassError(error, params.get("error_description") ?? "");
    const code = params.get("code");
    if (!code) throw new SingpassError("invalid_response", "Redirect has neither code nor error.");
    return code;
  }

  /** Step 3: exchange the code for DPoP-bound tokens. */
  async exchangeCode(session: AuthSession, code: string): Promise<TokenSet> {
    const endpoint = (await this.discover()).token_endpoint;
    const { body } = await this.send(
      "token",
      "POST",
      endpoint,
      { DPoP: await this.dpopProof(session, "POST", endpoint) },
      {
        grant_type: "authorization_code",
        code,
        redirect_uri: this.config.redirectUri,
        code_verifier: session.codeVerifier,
        client_assertion_type: CLIENT_ASSERTION_TYPE,
        client_assertion: await this.clientAssertion(),
      }
    );
    const res = body as Record<string, unknown>;
    if (typeof res.id_token !== "string" || typeof res.access_token !== "string") {
      throw new SingpassError("invalid_response", "Token response is missing a token.");
    }
    if (res.token_type !== "DPoP") {
      throw new SingpassError("invalid_response", "Expected a DPoP-bound token.");
    }
    return { accessToken: res.access_token, idToken: res.id_token, tokenType: res.token_type };
  }

  /** Decrypts a JWE with our enc key, then verifies the inner JWS against the provider JWKS. */
  private async openNestedJwt(jwe: string): Promise<{ header: JsonObject; claims: JsonObject }> {
    const jws = await decryptJwe(jwe, this.config.decryptionKey);
    const { header, payload } = await verifyJwsWithJwks(jws, await this.providerJwks());
    return { header, claims: payload };
  }

  /** Step 4: decrypt, verify the signature, then iss, aud, exp and nonce. */
  async verifyIdToken(session: AuthSession, idToken: string): Promise<JsonObject> {
    const { claims } = await this.openNestedJwt(idToken);
    const issuer = (await this.discover()).issuer;
    if (claims.iss !== issuer) throw new JoseError("ID token iss is not the issuer.");
    const aud = claims.aud;
    if (aud !== this.config.clientId && !(Array.isArray(aud) && aud.includes(this.config.clientId))) {
      throw new JoseError("ID token aud is not this client.");
    }
    if (typeof claims.exp !== "number" || claims.exp + CLOCK_SKEW_SECONDS < now()) {
      throw new JoseError("ID token has expired.");
    }
    if (claims.nonce !== session.nonce) throw new JoseError("ID token nonce does not match.");
    if (typeof claims.sub !== "string") throw new JoseError("ID token has no sub.");
    return claims;
  }

  /** Step 5 (Myinfo v5 apps): GET userinfo with `Authorization: DPoP` and an `ath`-bound proof. */
  async userinfo(session: AuthSession, accessToken: string, expectedSub: string): Promise<JsonObject> {
    const endpoint = (await this.discover()).userinfo_endpoint;
    const { body } = await this.send("userinfo", "GET", endpoint, {
      Authorization: `DPoP ${accessToken}`,
      DPoP: await this.dpopProof(session, "GET", endpoint, accessToken),
    });
    if (typeof body !== "string") throw new SingpassError("invalid_response", "Expected a JWE.");
    const { claims } = await this.openNestedJwt(body.trim());
    if (claims.iss !== (await this.discover()).issuer) throw new JoseError("userinfo iss mismatch.");
    if (claims.aud !== this.config.clientId) throw new JoseError("userinfo aud mismatch.");
    if (claims.sub !== expectedSub) throw new JoseError("userinfo sub is not the ID token sub.");
    return claims;
  }
}
