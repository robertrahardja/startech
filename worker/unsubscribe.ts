/**
 * GET and POST /u/<token>: the unsubscribe link in hq's outreach emails.
 *
 * GET only shows a confirmation page and changes nothing, because mail
 * scanners and link previews fetch every URL in a message. POST
 * unsubscribes: that covers the page's own button and the RFC 8058
 * one-click request a mail provider sends for List-Unsubscribe-Post.
 * There is deliberately no Origin check. The token is the only credential,
 * and a one-click POST comes from the mail provider, not from this site.
 *
 * Writes only outreach_suppression and outreach_recipients, the tables
 * st_dasboard's migrations/0007_outreach.sql shares with this Worker.
 */

import { renderPage, type PageLanguage } from "./unsubscribe-page";

export const UNSUBSCRIBE_PREFIX = "/u/";

/** What an unsub_token may look like. Anything else is never looked up. */
export const TOKEN_CHARS = "[A-Za-z0-9_-]{16,128}";

const TOKEN_PATH = new RegExp(`^/u/(${TOKEN_CHARS})/?$`);

/**
 * Per IP, per minute. Generous, because mail providers send one-click
 * requests for many people from a few shared addresses.
 */
const MAX_PER_MINUTE = 30;

export interface UnsubscribeContext {
  /** The CRM database (CRM_DB). Missing means the page cannot work. */
  db: D1Database | undefined;
  isRateLimited: (key: string, max: number, windowSeconds: number) => Promise<boolean>;
}

interface Recipient {
  id: string;
  email: string;
  language: string | null;
  local_language: string | null;
}

const LANGUAGES = new Set<string>(["en", "ja", "id", "es", "pt", "zh-Hans", "zh-Hant"]);

function asLanguage(code: string | null | undefined): PageLanguage | null {
  return code && LANGUAGES.has(code) ? (code as PageLanguage) : null;
}

/** zh-TW, zh-HK and zh-Hant read Traditional; other Chinese tags Simplified. */
function fromBrowserTag(tag: string): PageLanguage | null {
  const t = tag.split(";")[0].trim().toLowerCase();
  if (t.startsWith("zh")) return /hant|-tw|-hk|-mo/.test(t) ? "zh-Hant" : "zh-Hans";
  return asLanguage(t.slice(0, 2));
}

/** For a page that knows no campaign: the visitor's first supported browser language. Also /c/'s pages. */
export function browserLanguage(acceptLanguage: string | null): PageLanguage {
  const tags = (acceptLanguage ?? "").split(",");
  return tags.map(fromBrowserTag).find((language) => language !== null) ?? "en";
}

async function findRecipient(db: D1Database, token: string): Promise<Recipient | null> {
  return db
    .prepare(
      `SELECT r.id, r.email, c.language, c.local_language
         FROM outreach_recipients r
         LEFT JOIN outreach_campaigns c ON c.id = r.campaign_id
        WHERE r.unsub_token = ?
        LIMIT 1`
    )
    .bind(token)
    .first<Recipient>();
}

/**
 * Suppresses the address for every campaign and marks this recipient.
 * Repeating it changes nothing: an address already suppressed, in any
 * letter case and for any reason, keeps its first row.
 */
async function unsubscribe(db: D1Database, recipient: Recipient): Promise<void> {
  await db.batch([
    db
      .prepare(
        `INSERT OR IGNORE INTO outreach_suppression (email, reason, source)
         SELECT ?, 'unsubscribe', ?
          WHERE NOT EXISTS (SELECT 1 FROM outreach_suppression WHERE email = ? COLLATE NOCASE)`
      )
      .bind(recipient.email, recipient.id, recipient.email),
    db
      .prepare(
        `UPDATE outreach_recipients SET status = 'unsubscribed', updated_at = datetime('now')
          WHERE id = ? AND status <> 'unsubscribed'`
      )
      .bind(recipient.id),
  ]);
}

async function answer(
  db: D1Database,
  token: string,
  isPost: boolean,
  fallback: PageLanguage
): Promise<Response> {
  const recipient = await findRecipient(db, token);
  if (!recipient) return renderPage(fallback, "unknown", 404);
  const language = asLanguage(recipient.language) ?? fallback;
  const second = asLanguage(recipient.local_language);
  if (!isPost) return renderPage(language, "confirm", 200, `${UNSUBSCRIBE_PREFIX}${token}`, second);
  await unsubscribe(db, recipient);
  return renderPage(language, "done", 200, undefined, second);
}

export async function handleUnsubscribe(
  request: Request,
  ctx: UnsubscribeContext
): Promise<Response> {
  const fallback = browserLanguage(request.headers.get("Accept-Language"));
  const isPost = request.method === "POST";
  if (!isPost && request.method !== "GET" && request.method !== "HEAD") {
    const refused = renderPage(fallback, "unknown", 405);
    refused.headers.set("Allow", "GET, HEAD, POST");
    return refused;
  }

  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  if (await ctx.isRateLimited(`ip:${ip}:${UNSUBSCRIBE_PREFIX}`, MAX_PER_MINUTE, 60)) {
    const busy = renderPage(fallback, "busy", 429);
    busy.headers.set("Retry-After", "60");
    return busy;
  }

  const token = new URL(request.url).pathname.match(TOKEN_PATH)?.[1];
  if (!token) return renderPage(fallback, "unknown", 404);
  if (!ctx.db) return renderPage(fallback, "error", 503);
  try {
    return await answer(ctx.db, token, isPost, fallback);
  } catch (err) {
    console.error("Unsubscribe failed:", err instanceof Error ? err.message : err);
    return renderPage(fallback, "error", 503);
  }
}
