/**
 * POST /c/<token>/view: one row in web_views (st_dasboard migrations/
 * 0022_web_concepts.sql) when the comparison page has been visible for
 * 3 seconds. The page's own script sends it, so mail scanners, which fetch
 * the link but run no script and do not stay, never count. It sends it only
 * from the company's unversioned link, so Robert opening a frozen copy in hq
 * does not count either. hq shows the count beside each sent concept.
 */

import { readPointer } from "./concept-pointer";

/** Per IP, per minute, as on /i/: an office behind one address may open it several times. */
const MAX_PER_MINUTE = 30;

export interface ViewContext {
  bucket: R2Bucket | undefined;
  db: D1Database | undefined;
  isRateLimited: (key: string, max: number, windowSeconds: number) => Promise<boolean>;
  now?: () => Date;
}

const empty = (status: number, headers: Record<string, string> = {}) => new Response(null, { status, headers });

export async function recordView(request: Request, token: string, ctx: ViewContext): Promise<Response> {
  if (request.method !== "POST") return empty(405, { Allow: "POST" });
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  if (await ctx.isRateLimited(`ip:${ip}:/c/view`, MAX_PER_MINUTE, 60)) return empty(429, { "Retry-After": "60" });
  if (!ctx.bucket || !ctx.db) return empty(503);
  // Only a concept that is still online counts: no rows for made-up tokens.
  const pointer = await readPointer(ctx.bucket, token);
  if (!pointer) return empty(404);
  if (pointer.pulled) return empty(410);
  const at = (ctx.now?.() ?? new Date()).toISOString();
  await ctx.db.prepare("INSERT INTO web_views (token, at) VALUES (?1, ?2)").bind(token, at).run();
  return empty(204);
}
