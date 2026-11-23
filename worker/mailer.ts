/**
 * What the Mailer entrypoint does (worker/mailer-entrypoint.ts), kept free
 * of `cloudflare:workers` so `node --test` can load it.
 *
 * Outreach stays off until OUTREACH_FROM is set: without a verified sender
 * nothing is sent, and hq gets `sender-not-configured` back.
 */

import { isBody, isOneLine } from "./mail-checks";
import { checkOutreach } from "./outreach-rules";
import {
  OWNER_INBOX,
  siteSender,
  resendLastEvent,
  resendSend,
  type SendResult,
  type StatusResult,
} from "./resend";

export interface MailerEnv {
  RESEND_API_KEY?: string;
  /**
   * The second sending domain (outreach.startech-innovation.com), warmed up
   * beside the first so twice as much can go out safely: its own Resend key
   * (sending access to that domain only) and sender. hq picks it per message
   * with `sender: "secondary"`.
   */
  RESEND_API_KEY_2?: string;
  OUTREACH_FROM_2?: string;
  /**
   * A Resend key that may read emails, for hq's delivery checks only. The
   * two sending keys are "sending access" and Resend refuses their reads
   * (restricted_api_key, found 10 Nov 2026), so without this key bounces
   * and complaints go unseen.
   */
  RESEND_STATUS_KEY?: string;
  /**
   * The outreach sender, e.g. "Robert Rahardja <robert@mail.startech-innovation.com>",
   * on a domain verified in Resend. Unset: outreach and acknowledgements are off.
   */
  OUTREACH_FROM?: string;
  /** Holds outreach_suppression, checked before every send. */
  CRM_DB?: D1Database;
}

/** Resend email ids are UUIDs; this only keeps the path segment clean. */
const RESEND_ID = /^[A-Za-z0-9_-]{1,100}$/;

/**
 * hq checks the suppression list before it calls send. This is the second
 * check at the last point before Resend, so a bug in hq's send loop still
 * cannot mail an address that unsubscribed or bounced. It fails closed.
 */
async function suppressionError(db: D1Database | undefined, to: string): Promise<string | null> {
  if (!db) return "suppression-check-failed";
  try {
    const hit = await db
      .prepare("SELECT 1 AS hit FROM outreach_suppression WHERE email = ? COLLATE NOCASE LIMIT 1")
      .bind(to)
      .first();
    return hit ? "suppressed" : null;
  } catch (err) {
    console.error("Suppression check failed:", err instanceof Error ? err.message : err);
    return "suppression-check-failed";
  }
}

type Sender = { from: string | undefined; key: string | undefined };

/** The sending domain a message asks for: primary unless it says "secondary". */
function senderFor(env: MailerEnv, message: unknown): Sender | null {
  const asked = typeof message === "object" && message !== null ? (message as { sender?: unknown }).sender : undefined;
  if (asked === undefined || asked === "primary") return { from: env.OUTREACH_FROM?.trim(), key: env.RESEND_API_KEY };
  if (asked === "secondary") return { from: env.OUTREACH_FROM_2?.trim(), key: env.RESEND_API_KEY_2 };
  return null;
}

/** One outreach email from its sending domain's sender, once it passes every rule. */
export async function sendOutreach(env: MailerEnv, message: unknown): Promise<SendResult> {
  const sender = senderFor(env, message);
  if (!sender) return { ok: false, error: "invalid-sender" };
  const { from, key } = sender;
  if (!from) return { ok: false, error: "sender-not-configured" };
  if (!key) return { ok: false, error: "resend-not-configured" };

  const checked = checkOutreach(message);
  if (!checked.ok) return checked;
  const suppressed = await suppressionError(env.CRM_DB, checked.email.to[0]);
  if (suppressed) return { ok: false, error: suppressed };

  return resendSend(key, { from, ...checked.email }, checked.idempotencyKey);
}

/** Resend's last event for an email it accepted, so hq can suppress bounces and complaints. */
export async function outreachStatus(env: MailerEnv, id: unknown): Promise<StatusResult> {
  if (!env.RESEND_API_KEY) return { ok: false, error: "resend-not-configured" };
  if (typeof id !== "string" || !RESEND_ID.test(id)) return { ok: false, error: "invalid-id" };
  if (env.RESEND_STATUS_KEY) return resendLastEvent(env.RESEND_STATUS_KEY, id);
  const first = await resendLastEvent(env.RESEND_API_KEY, id);
  // An email from the second domain may only be visible to its own key.
  return first.ok || !env.RESEND_API_KEY_2 ? first : resendLastEvent(env.RESEND_API_KEY_2, id);
}

/**
 * A plain-text email to StarTech's own inbox, e.g. hq's weekly report.
 * Without OUTREACH_FROM it uses Resend's sandbox sender, which can still
 * reach the owner's inbox.
 */
export async function notifyOwner(env: MailerEnv, subject: unknown, text: unknown): Promise<SendResult> {
  if (!env.RESEND_API_KEY) return { ok: false, error: "resend-not-configured" };
  if (!isOneLine(subject, 200)) return { ok: false, error: "invalid-subject" };
  if (!isBody(text, 100_000)) return { ok: false, error: "invalid-text" };
  const from = env.OUTREACH_FROM?.trim() || siteSender("StarTech HQ", "hq");
  return resendSend(env.RESEND_API_KEY, { from, to: [OWNER_INBOX], subject, text });
}
