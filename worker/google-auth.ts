// Google identity verification for /api/demo sign-in.
// The client sends whichever ID token Google Identity Services handed it.
// That token is opaque and untrusted until we independently verify: the
// signature (against Google's current public keys), the issuer, the
// audience (must be this app's client ID, or a stranger's token would pass),
// and expiry. Only the claims that survive this are used for anything.

interface GoogleClaims {
  sub: string;
  email: string;
  email_verified: boolean;
  name?: string;
}

interface GoogleJwk {
  kid: string;
  n: string;
  e: string;
  kty: string;
  alg: string;
}

let cachedJwks: { keys: GoogleJwk[]; fetchedAt: number } | null = null;
const JWKS_CACHE_MS = 60 * 60 * 1000; // Google rotates keys infrequently.

async function fetchGoogleJwks(): Promise<GoogleJwk[]> {
  if (cachedJwks && Date.now() - cachedJwks.fetchedAt < JWKS_CACHE_MS) {
    return cachedJwks.keys;
  }
  const res = await fetch("https://www.googleapis.com/oauth2/v3/certs");
  if (!res.ok) throw new Error("Failed to fetch Google JWKS");
  const data = (await res.json()) as { keys: GoogleJwk[] };
  cachedJwks = { keys: data.keys, fetchedAt: Date.now() };
  return data.keys;
}

function base64UrlToUint8Array(b64url: string): Uint8Array {
  const b64 = b64url.replace(/-/g, "+").replace(/_/g, "/");
  const padded = b64 + "=".repeat((4 - (b64.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function base64UrlToJson<T>(b64url: string): T {
  const bytes = base64UrlToUint8Array(b64url);
  return JSON.parse(new TextDecoder().decode(bytes));
}

/**
 * Verifies a Google-issued OpenID Connect ID token: RS256 signature against
 * Google's published JWKS, issuer, audience, and expiry. Returns the
 * verified claims, or null if anything about the token doesn't check out.
 */
export async function verifyGoogleIdToken(
  idToken: string,
  expectedAudience: string
): Promise<GoogleClaims | null> {
  const parts = idToken.split(".");
  if (parts.length !== 3) return null;
  const [headerB64, payloadB64, signatureB64] = parts;

  let header: { alg: string; kid: string };
  let payload: GoogleClaims & { iss: string; aud: string; exp: number };
  try {
    header = base64UrlToJson(headerB64);
    payload = base64UrlToJson(payloadB64);
  } catch {
    return null;
  }

  if (header.alg !== "RS256") return null;

  const now = Math.floor(Date.now() / 1000);
  if (typeof payload.exp !== "number" || payload.exp <= now) return null;
  if (payload.aud !== expectedAudience) return null;
  if (payload.iss !== "accounts.google.com" && payload.iss !== "https://accounts.google.com") {
    return null;
  }
  if (!payload.email || !payload.email_verified) return null;

  let jwks: GoogleJwk[];
  try {
    jwks = await fetchGoogleJwks();
  } catch {
    return null;
  }

  const jwk = jwks.find((k) => k.kid === header.kid);
  if (!jwk) return null;

  let key: CryptoKey;
  try {
    key = await crypto.subtle.importKey(
      "jwk",
      { kty: jwk.kty, n: jwk.n, e: jwk.e, alg: "RS256", ext: true },
      { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
      false,
      ["verify"]
    );
  } catch {
    return null;
  }

  const signedData = new TextEncoder().encode(`${headerB64}.${payloadB64}`);
  const signature = base64UrlToUint8Array(signatureB64);

  const valid = await crypto.subtle.verify(
    "RSASSA-PKCS1-v1_5",
    key,
    signature,
    signedData
  );
  if (!valid) return null;

  return {
    sub: payload.sub,
    email: payload.email,
    email_verified: payload.email_verified,
    name: payload.name,
  };
}
