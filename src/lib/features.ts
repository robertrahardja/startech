/**
 * Feature flags.
 *
 * AI_CHAT is off in production while the OpenAI account's quota is resolved:
 * every /api/chat call returns 429 from OpenAI, which the Worker surfaces as
 * a 502, so the panel opens and then fails in front of the visitor. Better to
 * not offer it than to offer it broken.
 *
 * The code is gated rather than deleted so it can be turned back on in one
 * place once the upstream account is fixed and re-tested on a preview URL.
 *
 * To enable locally or in a preview build:
 *   VITE_ENABLE_AI_CHAT=true npm run build
 */
export const AI_CHAT_ENABLED = import.meta.env.VITE_ENABLE_AI_CHAT === "true";

/**
 * DEMO_CUSTOMISE is off in production: "Customize with your data" needs Google
 * sign-in, and neither VITE_GOOGLE_CLIENT_ID (this build) nor GOOGLE_CLIENT_ID
 * (the Worker) is set, so every visitor hit "Sign-in isn't set up yet" on all
 * 13 demos (checked 2026-11-02). With it off, the demos show their sample
 * result and PDF only, with no button that leads to a dead end.
 *
 * Before turning it back on, also check that:
 * - the Gemini model in worker/index.ts is still served (gemini-2.0-flash was
 *   listed for shutdown on 1 June 2026, and only a 429 falls back to Workers AI);
 * - D1 migrations 0002 and 0003 are applied to startech-demos remotely, or every
 *   demo_leads insert fails on the missing google_sub/model_provider columns.
 *
 * To enable locally or in a preview build:
 *   VITE_ENABLE_DEMO_CUSTOMISE=true npm run build
 */
export const DEMO_CUSTOMISE_ENABLED =
  import.meta.env.VITE_ENABLE_DEMO_CUSTOMISE === "true";
