/**
 * What the fetch handler and its route modules see. ack.ts, mailer.ts and
 * the Singpass modules declare the narrower subsets they read.
 */

import type { SingpassRpEnv } from "./singpass-rp";

/** SINGPASS_* vars and secrets: see worker/singpass-rp.ts and docs/OPERATIONS.md. */
export interface Env extends SingpassRpEnv {
  ASSETS: Fetcher;
  /** Used only by /api/chat and /api/tts now — /api/demo moved to Gemini. */
  OPENAI_API_KEY: string;
  ELEVENLABS_API_KEY: string;
  RESEND_API_KEY: string;
  /**
   * Sender for hq's outreach (the Mailer entrypoint) and for the automatic
   * acknowledgement to website enquiries, e.g.
   * "Robert Rahardja <robert@mail.startech-innovation.com>". Must be on a
   * domain verified in Resend. Unset: both are off. See docs/OPERATIONS.md.
   */
  OUTREACH_FROM?: string;
  /** The second sending domain's Resend key and sender (worker/mailer.ts). */
  RESEND_API_KEY_2?: string;
  OUTREACH_FROM_2?: string;
  ENVIRONMENT: string;
  /** "true" turns the chat and speech endpoints back on. Absent means off. */
  ENABLE_AI_CHAT?: string;
  DB: D1Database;
  /** The st_dasboard CRM database; contact-form leads are written here. */
  CRM_DB?: D1Database;
  /** Spreadsheets attached to the flyer form. hq serves them back to the CEO. */
  LEADS?: R2Bucket;
  /** The website programme's concepts, served at /c/<token>/ (worker/concepts.ts). */
  CONCEPTS?: R2Bucket;
  /** OAuth client ID demo sign-in tokens must have been issued for. */
  GOOGLE_CLIENT_ID: string;
  /** Primary model for /api/demo — free tier, text and vision both. */
  GOOGLE_GEMINI_API_KEY: string;
  /** Fallback model host for /api/demo once Gemini's free tier is spent. */
  AI: Ai;
  /** Shared rate-limit and blocklist counters, durable across isolates. */
  RATE_LIMIT: KVNamespace;
}
