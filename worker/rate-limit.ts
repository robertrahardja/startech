// Rate limiting (Cloudflare KV, shared across every isolate/edge).
// Defense-in-depth: supplement with Cloudflare WAF rate limiting rules.
//
// A previous version of this kept counts in an in-process Map, which reset
// every time Cloudflare spun up a fresh isolate and never saw requests
// another edge location handled — a determined caller could bypass it just
// by spreading requests around. KV gives every isolate the same counters.

export async function isRateLimited(
  kv: KVNamespace,
  key: string,
  maxRequests: number,
  windowSeconds: number
): Promise<boolean> {
  const kvKey = `ratelimit:${key}`;
  const now = Math.floor(Date.now() / 1000);
  const { value, metadata } = await kv.getWithMetadata<{ resetAt: number }>(kvKey);
  // Keys written before resetAt was recorded lost their expiry and would
  // block forever, so they count as an expired window.
  const live = value !== null && metadata !== null && metadata.resetAt > now;
  const resetAt = live ? metadata.resetAt : now + windowSeconds;
  const count = live ? parseInt(value, 10) : 0;

  if (count >= maxRequests) return true;

  // Every put must carry the expiry: a put without one makes the key
  // permanent. KV rejects expiries under 60 seconds, and an absolute
  // `expiration` of exactly now + 60 is already under 60 by the time KV
  // checks it (Worker exception 1101 on every second send within a
  // minute). A relative TTL is measured from KV's own receipt, so 60 holds.
  await kv.put(kvKey, String(count + 1), {
    expirationTtl: Math.max(resetAt - now, 60),
    metadata: { resetAt },
  });
  return false;
}

/**
 * Global daily ceiling on Gemini calls, shared across every visitor — not a
 * per-user limit, a whole-site one. Set well under Gemini 2.0 Flash's
 * published free-tier daily request limit rather than right up against it,
 * since that published figure can change without notice and per-user rate
 * limiting elsewhere already bounds any single account's contribution here.
 */
const GEMINI_DAILY_CEILING = 1000;

/** Today's UTC date as YYYY-MM-DD — the window this ceiling resets on. */
function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

/**
 * True once today's global Gemini call count has reached the ceiling —
 * read-only, does not itself count as a call. Checked before a Gemini
 * attempt so a day that's already spent skips straight to the Workers AI
 * fallback instead of finding out from a failed request.
 */
export async function isGeminiDailyCeilingReached(kv: KVNamespace): Promise<boolean> {
  const raw = await kv.get(`ratelimit:global:gemini:${todayKey()}`);
  const count = raw ? parseInt(raw, 10) : 0;
  return count >= GEMINI_DAILY_CEILING;
}

/** Records one Gemini call against today's global ceiling. */
export async function recordGeminiCall(kv: KVNamespace): Promise<void> {
  const kvKey = `ratelimit:global:gemini:${todayKey()}`;
  const raw = await kv.get(kvKey);
  const count = raw ? parseInt(raw, 10) : 0;
  await kv.put(kvKey, String(count + 1), {
    expirationTtl: count === 0 ? 26 * 3600 : undefined,
  });
}

/** True if this IP or Google account has been manually blocklisted. */
export async function isBlocked(kv: KVNamespace, ...identifiers: string[]): Promise<boolean> {
  for (const id of identifiers) {
    if (!id) continue;
    if ((await kv.get(`blocklist:${id}`)) !== null) return true;
  }
  return false;
}

/** isRateLimited bound to one namespace, the form the Singpass and unsubscribe routes take. */
export function rateLimiter(
  kv: KVNamespace
): (key: string, maxRequests: number, windowSeconds: number) => Promise<boolean> {
  return (key, maxRequests, windowSeconds) => isRateLimited(kv, key, maxRequests, windowSeconds);
}
