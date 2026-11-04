#!/usr/bin/env node
/**
 * Generates one private P-256 JWK for the Singpass relying party and prints
 * it to stdout, so it can be piped straight into a Worker secret without
 * ever touching disk or the repo:
 *
 *   node scripts/singpass-keys.mjs sig | npx wrangler secret put SINGPASS_SIG_PRIVATE_JWK
 *   node scripts/singpass-keys.mjs enc | npx wrangler secret put SINGPASS_ENC_PRIVATE_JWK
 *
 * sig: ES256, signs private_key_jwt client assertions.
 * enc: ECDH-ES+A256KW, receives the encrypted ID token.
 *
 * The Worker publishes the public halves at /.well-known/jwks.json. To
 * rotate, generate a new key (new kid), put it, deploy; Singpass refetches
 * the JWKS. Singpass asks that kids are never reused, so each includes the
 * date and a random suffix.
 */
import { webcrypto } from "node:crypto";

const purpose = process.argv[2];
if (purpose !== "sig" && purpose !== "enc") {
  console.error("Usage: node scripts/singpass-keys.mjs sig|enc");
  process.exit(1);
}

const algorithm =
  purpose === "sig" ? { name: "ECDSA", namedCurve: "P-256" } : { name: "ECDH", namedCurve: "P-256" };
const usages = purpose === "sig" ? ["sign", "verify"] : ["deriveBits"];
const { privateKey } = await webcrypto.subtle.generateKey(algorithm, true, usages);
const { kty, crv, x, y, d } = await webcrypto.subtle.exportKey("jwk", privateKey);

const suffix = Buffer.from(webcrypto.getRandomValues(new Uint8Array(4))).toString("hex");
const kid = `startech-${purpose}-${new Date().toISOString().slice(0, 10)}-${suffix}`;
const jwk = {
  kty,
  crv,
  x,
  y,
  d,
  kid,
  use: purpose,
  alg: purpose === "sig" ? "ES256" : "ECDH-ES+A256KW",
};

process.stdout.write(JSON.stringify(jwk));
console.error(`Generated ${purpose} key ${kid}. Public half will appear at /.well-known/jwks.json.`);
