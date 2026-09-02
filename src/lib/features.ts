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
