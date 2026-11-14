/**
 * StarTech Innovation - Cloudflare Worker
 *
 * Handles API endpoints:
 * - POST /api/chat    — Proxies to OpenAI GPT-4o-mini with streaming SSE
 * - POST /api/tts     — Proxies to ElevenLabs text-to-speech
 *                        (both off unless ENABLE_AI_CHAT; worker/ai-chat.ts)
 * - POST /api/contact — Saves the lead to the CRM, then emails via Resend.
 *                        JSON from the homepage form; multipart from /flyer
 *                        when a spreadsheet is attached (stored in R2).
 *                        utm_* fields become the contact's source in hq.
 *                        (worker/contact.ts)
 * - POST /api/testimonial — a client's testimonial from /testimonial
 *                        (worker/testimonial.ts)
 * - POST /api/demo    — AI-powered product demos with lead capture, backed
 *                        by Gemini (free tier) with a Workers AI fallback
 *                        (worker/demo.ts)
 * - /api/demo/singpass/* — mock Singpass FAPI 2.0 authorization server for
 *                        the /singpass demo (worker/singpass-demo.ts)
 * - /.well-known/jwks.json, /singpass/callback, /api/demo/singpass/staging/*
 *                      — StarTech as a Singpass staging relying party
 *                        (worker/singpass-rp.ts), off unless configured
 * - GET/POST /u/<token> — public unsubscribe link in hq's outreach emails
 *                        (worker/unsubscribe.ts)
 * - GET/POST /i/<token>, GET /wa/<token> — the one-button "I am interested"
 *                        and the WhatsApp link (worker/interest.ts)
 * - GET /c/<token>/...  — the private comparison page and concept website
 *                        from R2 (CONCEPTS); POST /c/<token>/view counts a
 *                        view (worker/concepts.ts)
 *   These four come through worker/email-links.ts.
 *
 * Static assets are served by the ASSETS binding (Cloudflare Workers static
 * assets), with the locale markup on the HTML shell (worker/assets.ts).
 *
 * This file is the router: which path goes where, the CORS preflight, and
 * the origin check, method check and per-endpoint rate limit in front of
 * the API routes.
 *
 * The named export Mailer (worker/mailer-entrypoint.ts) is an RPC
 * entrypoint for hq's service binding, not an HTTP route.
 */

import { chatIfEnabled, ttsIfEnabled } from "./ai-chat";
import { serveAsset } from "./assets";
import { handleContact } from "./contact";
import { handleDemo } from "./demo";
import type { Env } from "./env";
import { jsonError } from "./http";
import { corsHeaders, validateOrigin } from "./origins";
import { isRateLimited, rateLimiter } from "./rate-limit";
import { SECURITY_HEADERS, withApiHeaders, withSecurityHeaders } from "./security";
import { SINGPASS_DEMO_PREFIX, handleSingpassDemo, type SingpassDemoDeps } from "./singpass-demo";
import {
  RP_API_PREFIX,
  RP_CALLBACK_PATH,
  RP_JWKS_PATH,
  handleRpJwks,
  handleSingpassRp,
} from "./singpass-rp";
import { handleTestimonial } from "./testimonial";
import { emailLinkPage } from "./email-links";
import { sitemapResponse } from "./sitemap";

export { Mailer } from "./mailer-entrypoint";

type ApiHandler = (
  request: Request,
  env: Env,
  ctx: ExecutionContext
) => Response | Promise<Response>;

/** The POST endpoints behind the API checks. Any other /api/ path is a 404. */
const API_ROUTES: Partial<Record<string, ApiHandler>> = {
  "/api/chat": chatIfEnabled,
  "/api/tts": ttsIfEnabled,
  "/api/contact": handleContact,
  "/api/testimonial": handleTestimonial,
  "/api/demo": handleDemo,
};

// Rate limiting per endpoint, [max requests, window seconds] per IP.
// /api/demo manages its own limiting inside handleDemo — it needs to key on
// the verified Google account as well as IP, which isn't known until the
// request body is parsed.
const API_RATE_LIMITS: Record<string, [number, number]> = {
  "/api/chat": [20, 60],
  "/api/tts": [10, 60],
  "/api/contact": [3, 60],
  "/api/testimonial": [3, 60],
};

/** What both Singpass modules check origin and rate-limit with. */
function singpassDeps(request: Request, env: Env): SingpassDemoDeps {
  return {
    kv: env.RATE_LIMIT,
    originAllowed: validateOrigin(request, env),
    clientIp: request.headers.get("CF-Connecting-IP") || "unknown",
    isRateLimited: rateLimiter(env.RATE_LIMIT),
  };
}

/**
 * The API routes: origin and method checks, the per-endpoint rate limit,
 * then the handler, whose answer gets the CORS and security headers.
 */
async function handleApi(
  request: Request,
  env: Env,
  ctx: ExecutionContext,
  pathname: string
): Promise<Response> {
  // Origin validation for API routes
  if (!validateOrigin(request, env)) {
    return jsonError("Forbidden.", 403);
  }

  // Method check
  if (request.method !== "POST") {
    return jsonError("Method not allowed.", 405);
  }

  const clientIp =
    request.headers.get("CF-Connecting-IP") ||
    request.headers.get("X-Forwarded-For") ||
    "unknown";

  const limits = API_RATE_LIMITS[pathname];
  if (
    limits &&
    env.RATE_LIMIT &&
    (await isRateLimited(env.RATE_LIMIT, `ip:${clientIp}:${pathname}`, limits[0], limits[1]))
  ) {
    return new Response(
      JSON.stringify({ error: "Too many requests. Please try again later." }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": "60",
          ...corsHeaders(request),
          ...SECURITY_HEADERS,
        },
      }
    );
  }

  // Route to handler
  const handler = API_ROUTES[pathname];
  let response: Response;
  try {
    response = handler ? await handler(request, env, ctx) : jsonError("Not found.", 404);
  } catch {
    response = jsonError("Internal server error.", 500);
  }

  // Add CORS + security headers to all API responses
  return withApiHeaders(response, request);
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === "OPTIONS" && url.pathname.startsWith("/api/")) {
      return new Response(null, {
        status: 204,
        headers: { ...corsHeaders(request), ...SECURITY_HEADERS },
      });
    }

    // Singpass relying party: its public JWKS (fetched by Singpass, so no
    // origin check or rate limit) and the redirect URL registered with it.
    if (url.pathname === RP_JWKS_PATH) {
      return withSecurityHeaders(handleRpJwks(env));
    }
    if (url.pathname === RP_CALLBACK_PATH || url.pathname.startsWith(RP_API_PREFIX)) {
      return withSecurityHeaders(await handleSingpassRp(request, env, singpassDeps(request, env)));
    }

    // The pages hq's outreach emails link to (/u/, /i/, /wa/, /c/), before
    // the static assets, which would answer them with the SPA shell.
    const linked = await emailLinkPage(request, env, ctx, url.pathname);
    if (linked) return linked;

    // Built from the route table rather than kept as a static file.
    if (url.pathname === "/sitemap.xml") {
      return withSecurityHeaders(sitemapResponse());
    }

    // Static assets — add security headers
    if (!url.pathname.startsWith("/api/")) {
      return serveAsset(request, env, url);
    }

    // The Singpass demo's mock server has GET routes (discovery, JWKS,
    // userinfo) and OAuth-shaped errors, so it routes, rate-limits and checks
    // origin itself, with the site's validateOrigin and isRateLimited.
    if (url.pathname.startsWith(SINGPASS_DEMO_PREFIX)) {
      return withSecurityHeaders(await handleSingpassDemo(request, singpassDeps(request, env)));
    }

    return handleApi(request, env, ctx, url.pathname);
  },
};
