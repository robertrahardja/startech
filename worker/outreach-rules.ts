/**
 * What the Mailer requires of every outreach email before it reaches
 * Resend. hq writes the content; this decides whether it may go out.
 *
 * The footer rule enforces the anti-spam laws (Singapore's Spam Control
 * Act, Japan's 特定電子メール法 and the others): a working unsubscribe link
 * to /u/<token> and StarTech's postal address, in the text part and in the
 * HTML part when there is one.
 */

import { areTags, isAddress, isBody, isOneLine, passHeaders } from "./mail-checks";
import { OWNER_INBOX, type ResendEmail } from "./resend";
import { TOKEN_CHARS } from "./unsubscribe";

/** The message hq passes to `Mailer.send`. */
export interface OutreachMessage {
  to: string;
  subject: string;
  text: string;
  html?: string;
  /** Defaults to StarTech's inbox: the sending domain has no mailbox. */
  replyTo?: string;
  /** List-Unsubscribe, List-Unsubscribe-Post, List-Id, In-Reply-To, References, X-Entity-Ref-ID. */
  headers?: Record<string, string>;
  tags?: { name: string; value: string }[];
  /** Resend sends at most once per key for 24 hours; the outreach_sends id fits. */
  idempotencyKey?: string;
  /** Which sending domain: "primary" (default) or "secondary" (worker/mailer.ts). */
  sender?: "primary" | "secondary";
}

export type CheckedOutreach =
  | { ok: true; email: Omit<ResendEmail, "from">; idempotencyKey?: string }
  | { ok: false; error: string };

/** The unsubscribe link, on either of the domains this Worker serves. */
const UNSUBSCRIBE_LINK = new RegExp(
  `https://(?:www\\.)?startech-innovation\\.com/u/${TOKEN_CHARS}(?![A-Za-z0-9_-])`
);

/**
 * The parts of the postal address line (POSTAL_ADDRESS in worker/resend.ts)
 * that must appear. Punctuation and the unit number are left to hq.
 */
const ADDRESS_PARTS = ["1003 Bukit Merah Central", "Singapore 159836"];

interface FieldRule {
  field: keyof OutreachMessage;
  error: string;
  required?: boolean;
  check: (value: unknown) => boolean;
}

const FIELD_RULES: FieldRule[] = [
  { field: "to", error: "invalid-to", required: true, check: isAddress },
  { field: "subject", error: "invalid-subject", required: true, check: (v) => isOneLine(v, 200) },
  { field: "text", error: "invalid-text", required: true, check: (v) => isBody(v, 50_000) },
  { field: "html", error: "invalid-html", check: (v) => isBody(v, 200_000) },
  { field: "replyTo", error: "invalid-reply-to", check: isAddress },
  { field: "headers", error: "invalid-headers", check: (v) => passHeaders(v) !== null },
  { field: "tags", error: "invalid-tags", check: areTags },
  { field: "idempotencyKey", error: "invalid-idempotency-key", check: (v) => isOneLine(v, 256) },
];

function fieldError(message: Record<string, unknown>, rule: FieldRule): string | null {
  const value = message[rule.field];
  if (value === undefined && !rule.required) return null;
  return rule.check(value) ? null : rule.error;
}

/** Whitespace and &nbsp; flattened, so an HTML line break inside the address still counts. */
function hasFooter(body: string): boolean {
  const flat = body.replace(/&nbsp;|&#160;/g, " ").replace(/\s+/g, " ");
  return UNSUBSCRIBE_LINK.test(flat) && ADDRESS_PARTS.every((part) => flat.includes(part));
}

/**
 * hq's allowed headers, plus List-Unsubscribe and its RFC 8058 one-click
 * partner taken from the message's own /u/ link when hq did not set them,
 * so every outreach email gets the mail client's unsubscribe button.
 */
function headersFor(message: OutreachMessage): Record<string, string> {
  // Already checked by FIELD_RULES: null here only means hq sent none.
  const headers = passHeaders(message.headers) ?? {};
  const link = message.text.match(UNSUBSCRIBE_LINK)?.[0];
  if (link && !headers["List-Unsubscribe"]) {
    headers["List-Unsubscribe"] = `<${link}>`;
    headers["List-Unsubscribe-Post"] = "List-Unsubscribe=One-Click";
  }
  return headers;
}

/** The Resend fields for an outreach message, or the first rule it breaks. */
export function checkOutreach(input: unknown): CheckedOutreach {
  if (typeof input !== "object" || input === null) return { ok: false, error: "invalid-message" };
  const fields = input as Record<string, unknown>;
  const error = FIELD_RULES.map((rule) => fieldError(fields, rule)).find(Boolean);
  if (error) return { ok: false, error };

  const message = input as OutreachMessage;
  const parts = message.html === undefined ? [message.text] : [message.text, message.html];
  if (!parts.every(hasFooter)) return { ok: false, error: "missing-required-footer" };

  return {
    ok: true,
    idempotencyKey: message.idempotencyKey,
    email: {
      to: [message.to],
      subject: message.subject,
      text: message.text,
      html: message.html,
      reply_to: message.replyTo ?? OWNER_INBOX,
      headers: headersFor(message),
      tags: message.tags,
    },
  };
}
