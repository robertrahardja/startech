/**
 * The Resend client shared by the Mailer entrypoint (worker/mailer.ts) and
 * the enquiry acknowledgement (worker/ack.ts).
 *
 * The Resend API key is a secret of this Worker only. That is why hq sends
 * its outreach through the Mailer service binding instead of calling Resend
 * itself.
 */

const RESEND_EMAILS = "https://api.resend.com/emails";

/**
 * The site's own sending domain, verified in Resend (2026-11-08). The
 * Resend key is restricted to it, so every email the site sends uses it.
 */
export const SITE_MAIL_DOMAIN = "mail.startech-innovation.com";

/** The From line for a site email: a display name and a role address. */
export const siteSender = (name: string, local: string) => `${name} <${local}@${SITE_MAIL_DOMAIN}>`;

/** StarTech's inbox: where the website's enquiry notifications already go. */
export const OWNER_INBOX = "rr.startech.innovation@gmail.com";

/**
 * StarTech's postal address. Every outreach email must carry it (Singapore's
 * Spam Control Act, Japan's 特定電子メール法 and the others), and the
 * acknowledgement carries it too.
 */
export const POSTAL_ADDRESS = "1003 Bukit Merah Central #06-07, Singapore 159836";

export type SendResult = { ok: true; id: string } | { ok: false; error: string };

export type StatusResult =
  | { ok: true; id: string; lastEvent: string }
  | { ok: false; error: string };

/** The body of POST /emails, in Resend's field names. */
export interface ResendEmail {
  from: string;
  to: [string];
  subject: string;
  text: string;
  html?: string;
  reply_to?: string;
  headers?: Record<string, string>;
  tags?: { name: string; value: string }[];
}

/** Long enough for Resend on a slow day; short enough that a stuck call cannot hold the caller. */
const TIMEOUT_MS = 15_000;

/** "resend-422:validation_error": the status, plus Resend's error name when it sent one. */
function resendError(status: number, body: { name?: unknown } | null): string {
  const name = body?.name;
  return typeof name === "string" && /^[a-z_]{1,64}$/.test(name)
    ? `resend-${status}:${name}`
    : `resend-${status}`;
}

async function readJson(res: Response): Promise<Record<string, unknown> | null> {
  return (await res.json().catch(() => null)) as Record<string, unknown> | null;
}

/**
 * Sends one email. Never throws: a network failure, a timeout and a Resend
 * refusal all come back as `{ ok: false }`. With an idempotency key, Resend
 * sends at most once per key for 24 hours, so a retried call is safe.
 */
export async function resendSend(
  apiKey: string,
  email: ResendEmail,
  idempotencyKey?: string
): Promise<SendResult> {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };
  if (idempotencyKey) headers["Idempotency-Key"] = idempotencyKey;

  let res: Response;
  try {
    res = await fetch(RESEND_EMAILS, {
      method: "POST",
      headers,
      body: JSON.stringify(email),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch {
    return { ok: false, error: "resend-unreachable" };
  }
  const body = await readJson(res);
  if (!res.ok) return { ok: false, error: resendError(res.status, body) };
  return typeof body?.id === "string"
    ? { ok: true, id: body.id }
    : { ok: false, error: "resend-bad-response" };
}

/**
 * The last delivery event Resend recorded for an email it accepted:
 * "sent", "delivered", "delivery_delayed", "bounced", "complained" and so on.
 */
export async function resendLastEvent(apiKey: string, id: string): Promise<StatusResult> {
  let res: Response;
  try {
    res = await fetch(`${RESEND_EMAILS}/${encodeURIComponent(id)}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch {
    return { ok: false, error: "resend-unreachable" };
  }
  const body = await readJson(res);
  if (res.status === 404) return { ok: false, error: "not-found" };
  if (!res.ok) return { ok: false, error: resendError(res.status, body) };
  const lastEvent = typeof body?.last_event === "string" ? body.last_event : "unknown";
  return { ok: true, id, lastEvent };
}
