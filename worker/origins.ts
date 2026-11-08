/** Which origins may call the API, and the CORS headers it answers with. */

import type { Env } from "./env";

/** Country sites at <name>.startech-innovation.com whose forms post to /api/contact. */
const COUNTRY_SITES = ["indonesia", "malaysia", "philippines", "thailand", "vietnam"] as const;

export function validateOrigin(request: Request, env: Env): boolean {
  const origin = request.headers.get("Origin");
  if (!origin) return false;

  const allowedOrigins = [
    "https://startech-innovation.com",
    "https://www.startech-innovation.com",
    // Country sites (apps/indonesia, apps/country-site) post their forms
    // here so leads land in hq.
    ...COUNTRY_SITES.map((c) => `https://${c}.startech-innovation.com`),
  ];

  if (env.ENVIRONMENT !== "production") {
    allowedOrigins.push("http://localhost:5173", "http://localhost:8787");
  }

  // Preview versions (`wrangler versions upload`) are served from
  // <8-hex>-startech.rr-startech-innovation.workers.dev; only this Worker's
  // own previews match, so testing a preview does not need the live domain.
  if (/^https:\/\/[0-9a-f]{8}-startech(-(indonesia|malaysia|philippines|thailand|vietnam))?\.rr-startech-innovation\.workers\.dev$/.test(origin)) {
    return true;
  }

  return allowedOrigins.includes(origin);
}

export function corsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get("Origin") || "";
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Requested-With",
    "Access-Control-Max-Age": "86400",
  };
}
