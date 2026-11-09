/**
 * The pages hq's outreach emails link to: /u/ (unsubscribe), /i/ and /wa/
 * (the one-button "I am interested" and WhatsApp, worker/interest.ts) and
 * /c/ (the website email's comparison page, worker/concepts.ts). The router
 * (worker/index.ts) asks here before the static assets, which would
 * otherwise answer these paths with the SPA shell.
 */

import { CONCEPT_PREFIX, handleConcept } from "./concepts";
import type { Env } from "./env";
import { INTEREST_PREFIX, WHATSAPP_PREFIX, handleInterest, notifyByEmail } from "./interest";
import { rateLimiter } from "./rate-limit";
import { withSecurityHeaders } from "./security";
import { UNSUBSCRIBE_PREFIX, handleUnsubscribe } from "./unsubscribe";

/** The page for one of these links, or null when the path is none of them. */
export async function emailLinkPage(
  request: Request,
  env: Env,
  ctx: ExecutionContext,
  pathname: string
): Promise<Response | null> {
  const isRateLimited = rateLimiter(env.RATE_LIMIT);
  if (pathname.startsWith(UNSUBSCRIBE_PREFIX)) {
    return withSecurityHeaders(await handleUnsubscribe(request, { db: env.CRM_DB, isRateLimited }));
  }
  if (pathname.startsWith(INTEREST_PREFIX) || pathname.startsWith(WHATSAPP_PREFIX)) {
    return withSecurityHeaders(
      await handleInterest(request, {
        db: env.CRM_DB,
        isRateLimited,
        notify: notifyByEmail(env),
        waitUntil: (p) => ctx.waitUntil(p),
      })
    );
  }
  // Sets its own headers: the site's, with same-origin framing for the concept.
  if (pathname.startsWith(CONCEPT_PREFIX)) {
    return handleConcept(request, { bucket: env.CONCEPTS, db: env.CRM_DB, isRateLimited });
  }
  return null;
}
