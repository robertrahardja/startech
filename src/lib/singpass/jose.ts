/**
 * The small slice of JOSE that a Singpass FAPI 2.0 integration needs, on
 * WebCrypto alone so the same file runs in the browser and in a Worker:
 *
 *   - ES256 JWS sign / verify (client assertions, DPoP proofs, ID tokens)
 *   - RFC 7638 JWK thumbprints (DPoP key binding, `dpop_jkt`, `cnf.jkt`)
 *   - JWE with ECDH-ES+A256KW and A256CBC-HS512, the scheme Singpass uses to
 *     encrypt every ID token and userinfo response (RFC 7516 / RFC 7518)
 *
 * Only P-256 is implemented. Singpass also accepts P-384 and P-521 keys; a
 * production integration that registers those would need ES384/ES512 here.
 * No dependency, because a JOSE library is ~40KB and the demo needs a tenth
 * of it, and because each step is then readable in one place.
 */

export interface EcPublicJwk {
  kty: "EC";
  crv: "P-256";
  x: string;
  y: string;
  kid?: string;
  use?: "sig" | "enc";
  alg?: string;
}

export interface Jwks {
  keys: EcPublicJwk[];
}

export type JsonObject = Record<string, unknown>;

export class JoseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "JoseError";
  }
}

// Typed loosely on purpose: this file compiles against both the DOM lib
// (the page) and @cloudflare/workers-types (the Worker), whose WebCrypto
// parameter types differ in name and shape though the runtime API is one.
const subtle = (): SubtleCrypto => crypto.subtle;
const encoder = new TextEncoder();
const decoder = new TextDecoder();

const ES256 = { name: "ECDSA", hash: "SHA-256" };
const P256_SIGN = { name: "ECDSA", namedCurve: "P-256" };
const P256_ECDH = { name: "ECDH", namedCurve: "P-256" };

const JWE_ALG = "ECDH-ES+A256KW";
const JWE_ENC = "A256CBC-HS512";

// ─── Encoding ───────────────────────────────────────────────────────────────

function utf8(text: string): Uint8Array<ArrayBuffer> {
  return encoder.encode(text) as Uint8Array<ArrayBuffer>;
}

function b64urlEncode(input: ArrayBuffer | Uint8Array): string {
  const bytes = input instanceof Uint8Array ? input : new Uint8Array(input);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function b64urlDecode(input: string): Uint8Array<ArrayBuffer> {
  if (!/^[A-Za-z0-9_-]*$/.test(input)) throw new JoseError("Not base64url.");
  const padded = input.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((input.length + 3) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function b64urlJson(value: unknown): string {
  return b64urlEncode(utf8(JSON.stringify(value)));
}

function parseJsonSegment(segment: string): JsonObject {
  let parsed: unknown;
  try {
    parsed = JSON.parse(decoder.decode(b64urlDecode(segment)));
  } catch {
    throw new JoseError("Malformed JOSE segment.");
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new JoseError("JOSE segment is not a JSON object.");
  }
  return parsed as JsonObject;
}

/** Cryptographically random base64url string; 32 bytes gives 43 chars. */
export function randomToken(byteLength = 32): string {
  return b64urlEncode(crypto.getRandomValues(new Uint8Array(byteLength)));
}

export async function sha256b64url(text: string): Promise<string> {
  return b64urlEncode(await subtle().digest("SHA-256", utf8(text)));
}

function concat(...parts: Uint8Array[]): Uint8Array<ArrayBuffer> {
  const out = new Uint8Array(parts.reduce((n, p) => n + p.length, 0));
  let offset = 0;
  for (const part of parts) {
    out.set(part, offset);
    offset += part.length;
  }
  return out;
}

function uint32be(value: number): Uint8Array {
  const out = new Uint8Array(4);
  new DataView(out.buffer).setUint32(0, value);
  return out;
}

function uint64be(value: number): Uint8Array {
  const out = new Uint8Array(8);
  const view = new DataView(out.buffer);
  view.setUint32(0, Math.floor(value / 2 ** 32));
  view.setUint32(4, value >>> 0);
  return out;
}

/** Compares without an early exit, so timing does not leak the match length. */
function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

// ─── Keys ───────────────────────────────────────────────────────────────────

/**
 * An ES256 signing key pair. The private half is not extractable unless a
 * server has to park it between requests (the DPoP key across a redirect).
 */
export function generateSigningKeyPair(extractable = false): Promise<CryptoKeyPair> {
  return subtle().generateKey(P256_SIGN, extractable, ["sign", "verify"]) as Promise<CryptoKeyPair>;
}

/** Imports a private P-256 JWK (with `d`) for signing or for decrypting JWEs. */
export function importPrivateJwk(jwk: JsonWebKey, purpose: "sig" | "enc"): Promise<CryptoKey> {
  const { kty, crv, x, y, d } = jwk;
  if (kty !== "EC" || crv !== "P-256" || !d) throw new JoseError("Expected a private P-256 JWK.");
  return purpose === "sig"
    ? subtle().importKey("jwk", { kty, crv, x, y, d }, P256_SIGN, false, ["sign"])
    : subtle().importKey("jwk", { kty, crv, x, y, d }, P256_ECDH, false, ["deriveBits"]);
}

/** An ECDH P-256 key pair for receiving JWEs. Private half not extractable. */
export function generateEncryptionKeyPair(): Promise<CryptoKeyPair> {
  return subtle().generateKey(P256_ECDH, false, ["deriveBits"]) as Promise<CryptoKeyPair>;
}

/** Public JWK with only the members a JWKS should carry. Never includes `d`. */
export async function exportPublicJwk(
  publicKey: CryptoKey,
  extra: Pick<EcPublicJwk, "kid" | "use" | "alg"> = {}
): Promise<EcPublicJwk> {
  const jwk = (await subtle().exportKey("jwk", publicKey)) as JsonWebKey;
  if (jwk.kty !== "EC" || jwk.crv !== "P-256" || !jwk.x || !jwk.y) {
    throw new JoseError("Only P-256 EC keys are supported.");
  }
  return { kty: "EC", crv: "P-256", x: jwk.x, y: jwk.y, ...extra };
}

/** Accepts only a well-formed public P-256 JWK; rejects one carrying `d`. */
export function asPublicJwk(value: unknown): EcPublicJwk {
  if (!value || typeof value !== "object") throw new JoseError("JWK must be an object.");
  const jwk = value as Record<string, unknown>;
  if ("d" in jwk) throw new JoseError("JWK exposes a private key (d).");
  if (jwk.kty !== "EC" || jwk.crv !== "P-256") throw new JoseError("JWK must be EC P-256.");
  if (typeof jwk.x !== "string" || typeof jwk.y !== "string") {
    throw new JoseError("JWK is missing x or y.");
  }
  const out: EcPublicJwk = { kty: "EC", crv: "P-256", x: jwk.x, y: jwk.y };
  if (typeof jwk.kid === "string") out.kid = jwk.kid;
  if (jwk.use === "sig" || jwk.use === "enc") out.use = jwk.use;
  if (typeof jwk.alg === "string") out.alg = jwk.alg;
  return out;
}

export function importVerifyKey(jwk: EcPublicJwk): Promise<CryptoKey> {
  const { kty, crv, x, y } = jwk;
  return subtle().importKey("jwk", { kty, crv, x, y }, P256_SIGN, false, ["verify"]);
}

function importEcdhPublicKey(jwk: EcPublicJwk): Promise<CryptoKey> {
  const { kty, crv, x, y } = jwk;
  return subtle().importKey("jwk", { kty, crv, x, y }, P256_ECDH, false, []);
}

/** RFC 7638 thumbprint: SHA-256 over the required members in lexical order. */
export function jwkThumbprint(jwk: EcPublicJwk): Promise<string> {
  return sha256b64url(JSON.stringify({ crv: jwk.crv, kty: jwk.kty, x: jwk.x, y: jwk.y }));
}

// ─── JWS (ES256, compact) ───────────────────────────────────────────────────

export interface DecodedJws {
  header: JsonObject;
  payload: JsonObject;
}

export async function signJws(
  header: JsonObject,
  payload: JsonObject,
  privateKey: CryptoKey
): Promise<string> {
  const input = `${b64urlJson({ ...header, alg: "ES256" })}.${b64urlJson(payload)}`;
  // WebCrypto's ECDSA output is already the raw r||s form JWS requires.
  const signature = await subtle().sign(ES256, privateKey, utf8(input));
  return `${input}.${b64urlEncode(signature)}`;
}

/** Header and payload of a compact JWS, unverified. For display and routing. */
export function decodeJws(token: string): DecodedJws {
  const parts = token.split(".");
  if (parts.length !== 3) throw new JoseError("Not a compact JWS.");
  return { header: parseJsonSegment(parts[0]), payload: parseJsonSegment(parts[1]) };
}

export async function verifyJws(token: string, publicKey: CryptoKey): Promise<DecodedJws> {
  const decoded = decodeJws(token);
  if (decoded.header.alg !== "ES256") throw new JoseError("Only ES256 is accepted.");
  const [h, p, s] = token.split(".");
  const ok = await subtle().verify(ES256, publicKey, b64urlDecode(s), utf8(`${h}.${p}`));
  if (!ok) throw new JoseError("Signature does not verify.");
  return decoded;
}

/** Verifies against a JWKS, picking the key by `kid` when the header has one. */
export async function verifyJwsWithJwks(token: string, jwks: Jwks): Promise<DecodedJws> {
  const { header } = decodeJws(token);
  const candidates = jwks.keys.filter(
    (k) => k.use !== "enc" && (typeof header.kid !== "string" || k.kid === header.kid)
  );
  if (candidates.length === 0) throw new JoseError("No matching signing key in JWKS.");
  for (const jwk of candidates) {
    try {
      return await verifyJws(token, await importVerifyKey(jwk));
    } catch {
      // Try the next key; a JWKS may hold several during rotation.
    }
  }
  throw new JoseError("Signature does not verify against any key in the JWKS.");
}

// ─── JWE (ECDH-ES+A256KW, A256CBC-HS512, compact) ───────────────────────────

/** RFC 7518 §4.6.2 Concat KDF, one SHA-256 round: enough for a 256-bit KEK. */
async function concatKdf(sharedSecret: ArrayBuffer, alg: string): Promise<ArrayBuffer> {
  const algId = utf8(alg);
  const otherInfo = concat(
    uint32be(algId.length),
    algId,
    uint32be(0), // PartyUInfo (apu): empty
    uint32be(0), // PartyVInfo (apv): empty
    uint32be(256) // SuppPubInfo: key length in bits
  );
  const input = concat(uint32be(1), new Uint8Array(sharedSecret), otherInfo);
  return subtle().digest("SHA-256", input);
}

async function deriveKek(privateKey: CryptoKey, publicKey: CryptoKey): Promise<CryptoKey> {
  // `as never`: the DOM lib calls this member `public`, workers-types `$public`.
  const ecdh = { name: "ECDH", public: publicKey } as never;
  const z = await subtle().deriveBits(ecdh, privateKey, 256);
  const kek = await concatKdf(z, JWE_ALG);
  return subtle().importKey("raw", kek, "AES-KW", false, ["wrapKey", "unwrapKey"]);
}

/** HMAC-SHA-512 over AAD || IV || ciphertext || AL, truncated to 32 bytes. */
async function cbcHsTag(
  macKey: Uint8Array<ArrayBuffer>,
  aad: Uint8Array,
  iv: Uint8Array,
  ciphertext: Uint8Array
): Promise<Uint8Array> {
  const key = await subtle().importKey("raw", macKey, { name: "HMAC", hash: "SHA-512" }, false, [
    "sign",
  ]);
  const mac = await subtle().sign("HMAC", key, concat(aad, iv, ciphertext, uint64be(aad.length * 8)));
  return new Uint8Array(mac).slice(0, 32);
}

export async function encryptJwe(
  plaintext: string,
  recipient: EcPublicJwk,
  extraHeader: JsonObject = {}
): Promise<string> {
  const ephemeral = (await subtle().generateKey(P256_ECDH, true, ["deriveBits"])) as CryptoKeyPair;
  const epk = await exportPublicJwk(ephemeral.publicKey);
  const kek = await deriveKek(ephemeral.privateKey, await importEcdhPublicKey(recipient));

  // A256CBC-HS512 uses a 64-byte CEK: first half MAC key, second half AES key.
  const cekBytes = crypto.getRandomValues(new Uint8Array(64));
  const cek = await subtle().importKey("raw", cekBytes, { name: "HMAC", hash: "SHA-512" }, true, [
    "sign",
  ]);
  const encryptedKey = await subtle().wrapKey("raw", cek, kek, "AES-KW");

  const header = {
    ...extraHeader,
    alg: JWE_ALG,
    enc: JWE_ENC,
    ...(recipient.kid ? { kid: recipient.kid } : {}),
    epk: { kty: epk.kty, crv: epk.crv, x: epk.x, y: epk.y },
  };
  const protectedHeader = b64urlJson(header);
  const aad = utf8(protectedHeader);
  const iv = crypto.getRandomValues(new Uint8Array(16));

  const encKey = await subtle().importKey("raw", cekBytes.slice(32), "AES-CBC", false, ["encrypt"]);
  const ciphertext = new Uint8Array(
    await subtle().encrypt({ name: "AES-CBC", iv }, encKey, utf8(plaintext))
  );
  const tag = await cbcHsTag(cekBytes.slice(0, 32), aad, iv, ciphertext);

  return [
    protectedHeader,
    b64urlEncode(encryptedKey),
    b64urlEncode(iv),
    b64urlEncode(ciphertext),
    b64urlEncode(tag),
  ].join(".");
}

/** Protected header of a compact JWE, for display. Does not decrypt. */
export function decodeJweHeader(jwe: string): JsonObject {
  const parts = jwe.split(".");
  if (parts.length !== 5) throw new JoseError("Not a compact JWE.");
  return parseJsonSegment(parts[0]);
}

export async function decryptJwe(jwe: string, privateKey: CryptoKey): Promise<string> {
  const parts = jwe.split(".");
  if (parts.length !== 5) throw new JoseError("Not a compact JWE.");
  const header = parseJsonSegment(parts[0]);
  if (header.alg !== JWE_ALG || header.enc !== JWE_ENC) {
    throw new JoseError(`Unsupported JWE algorithm ${String(header.alg)} / ${String(header.enc)}.`);
  }
  const epk = asPublicJwk(header.epk);
  const kek = await deriveKek(privateKey, await importEcdhPublicKey(epk));

  let cekBytes: Uint8Array<ArrayBuffer>;
  try {
    const cek = await subtle().unwrapKey(
      "raw",
      b64urlDecode(parts[1]),
      kek,
      "AES-KW",
      { name: "HMAC", hash: "SHA-512" },
      true,
      ["sign"]
    );
    cekBytes = new Uint8Array((await subtle().exportKey("raw", cek)) as ArrayBuffer);
  } catch {
    throw new JoseError("Content key does not unwrap: wrong decryption key.");
  }
  if (cekBytes.length !== 64) throw new JoseError("Content key has the wrong length.");

  const iv = b64urlDecode(parts[2]);
  const ciphertext = b64urlDecode(parts[3]);
  const expected = await cbcHsTag(cekBytes.slice(0, 32), utf8(parts[0]), iv, ciphertext);
  if (!timingSafeEqual(expected, b64urlDecode(parts[4]))) {
    throw new JoseError("JWE authentication tag does not match.");
  }

  const encKey = await subtle().importKey("raw", cekBytes.slice(32), "AES-CBC", false, ["decrypt"]);
  return decoder.decode(await subtle().decrypt({ name: "AES-CBC", iv }, encKey, ciphertext));
}
