/**
 * What every /c/ response carries (worker/concepts.ts): the site's security
 * headers with same-origin framing, noindex, and the comparison page's
 * "I am interested" link.
 */

import { withSecurityHeaders } from "./security";
import { TOKEN_CHARS } from "./unsubscribe";

/** Written by the comparison page generator where the "I am interested" link goes. */
const INTEREST_PLACEHOLDER = "__INTEREST_HREF__";

const UNSUB_TOKEN = new RegExp(`^${TOKEN_CHARS}$`);

/**
 * The site's CSP forbids framing, but the comparison page frames the
 * concept (same origin, "site/"). Same-origin framing only; nothing else
 * is loosened, and the site's Cloudflare analytics beacon still loads.
 */
const PAGE_CSP =
  "default-src 'self'; script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self' https://cloudflareinsights.com; frame-src 'self'; frame-ancestors 'self'; form-action 'self'; base-uri 'none'; object-src 'none'";

/** A company's SVG logo is their file, not ours: opened on its own, it may run nothing. */
const SVG_CSP = "default-src 'none'; style-src 'unsafe-inline'; img-src data:; sandbox";

export function withConceptHeaders(response: Response): Response {
  const secured = withSecurityHeaders(response);
  const svg = secured.headers.get("Content-Type") === "image/svg+xml";
  secured.headers.set("Content-Security-Policy", svg ? SVG_CSP : PAGE_CSP);
  secured.headers.set("X-Frame-Options", "SAMEORIGIN");
  secured.headers.set("X-Robots-Tag", "noindex, nofollow");
  return secured;
}

/**
 * /i/<r>, the existing one-button flow, when the link carries the
 * recipient's unsub_token as r; otherwise the page's own contact section.
 * r is validated before it is written into the page.
 */
export function interestHref(r: string | null): string {
  return r && UNSUB_TOKEN.test(r) ? `/i/${r}` : "#contact";
}

export function fillInterestLink(html: string, r: string | null): string {
  return html.replaceAll(INTEREST_PLACEHOLDER, interestHref(r));
}
