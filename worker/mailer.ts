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

/** One outreach email from OUTREACH_FROM, once it passes every rule. */
export async function sendOutreach(env: MailerEnv, message: unknown): Promise<SendResult> {
  const from = env.OUTREACH_FROM?.trim();
  if (!from) return { ok: false, error: "sender-not-configured" };
  if (!env.RESEND_API_KEY) return { ok: false, error: "resend-not-configured" };

  const checked = checkOutreach(message);
  if (!checked.ok) return checked;
  const suppressed = await suppressionError(env.CRM_DB, checked.email.to[0]);
  if (suppressed) return { ok: false, error: suppressed };

  return resendSend(env.RESEND_API_KEY, { from, ...checked.email }, checked.idempotencyKey);
}

/** Resend's last event for an email it accepted, so hq can suppress bounces and complaints. */
export async function outreachStatus(env: MailerEnv, id: unknown): Promise<StatusResult> {
  if (!env.RESEND_API_KEY) return { ok: false, error: "resend-not-configured" };
  if (typeof id !== "string" || !RESEND_ID.test(id)) return { ok: false, error: "invalid-id" };
  return resendLastEvent(env.RESEND_API_KEY, id);
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
