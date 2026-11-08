/**
 * Everything outside /api/ that the Singpass and unsubscribe routes do not
 * answer: the static assets from the ASSETS binding, with SECURITY_HEADERS,
 * a long cache for fonts, and the locale markup on the HTML shell.
 */

import type { Env } from "./env";
import { withLocaleMarkup } from "./locale-markup";
import { SECURITY_HEADERS } from "./security";

export async function serveAsset(request: Request, env: Env, url: URL): Promise<Response> {
  const assetResponse = await env.ASSETS.fetch(request);
  const headers = new Headers(assetResponse.headers);
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    headers.set(key, value);
  }
  // Font filenames are not content-hashed the way the bundle's are, so
  // they need an explicit long cache. They only change when the typeface
  // itself is replaced, at which point the filename changes too.
  if (url.pathname.startsWith("/fonts/")) {
    headers.set("Cache-Control", "public, max-age=31536000, immutable");
  }

  const asset = new Response(assetResponse.body, {
    status: assetResponse.status,
    statusText: assetResponse.statusText,
    headers,
  });

  // Only the HTML shell carries locale markup; hashed JS, CSS and images
  // are returned untouched.
  const type = headers.get("content-type") ?? "";
  if (asset.ok && type.includes("text/html")) {
    return withLocaleMarkup(asset, url.pathname);
  }
  return asset;
}
