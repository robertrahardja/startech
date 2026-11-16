/**
 * The updates list's links (Robert, 16 Nov 2026: people who want to keep up
 * with StarTech join a list with real consent, for a quarterly update).
 *
 * /k/<token>    "Not now, but keep me updated" in hq's outreach emails. The
 *               token is the recipient's unsub_token, as on /u/ and /i/.
 * /k/c/<token>  the confirm link the website sign-up emails
 *               (worker/subscribe.ts). The token is subscribers.token.
 * /k/u/<token>  the updates' own unsubscribe link, subscribers.token too.
 *
 * GET (and HEAD) shows one button and changes nothing: mail scanners open
 * every link in a message. POST is the button. Some scanners press buttons
 * as well (Yonex UK's "I am interested", 10 Nov 2026), so a press that looks
 * like one (pressOf in worker/interest.ts) is kept as an unconfirmed record
 * and changes nothing else: it neither confirms the address nor stops the
 * outreach sequence. A later press by a person confirms it. The token proves
 * access to the mailbox, so a person's press on /k/ is confirmation itself.
 *
 * subscribers is hq's table (st_dasboard migrations/0025); this Worker only
 * reads and writes rows in it.
 */

import { describePress, pressOf, type Press } from "./interest";
import { keepConsentText, renderKeepPage } from "./keep-updated-page";
import { TOKEN_CHARS, asLanguage, browserLanguage } from "./unsubscribe";
import type { PageLanguage } from "./unsubscribe-page";

export const KEEP_PREFIX = "/k/";

const KEEP_PATH = new RegExp(`^/k/(${TOKEN_CHARS})/?$`);
const CONFIRM_PATH = new RegExp(`^/k/c/(${TOKEN_CHARS})/?$`);
const UNSUBSCRIBE_PATH = new RegExp(`^/k/u/(${TOKEN_CHARS})/?$`);
const MAX_PER_MINUTE = 30;

/** hq's src/crm/db.ts DEFAULT_ORG_ID and DEFAULT_USER_ID. */
const ORG_ID = "org_startech_default";
const USER_ID = "user_ceo_default";

export interface KeepContext {
  db: D1Database | undefined;
  isRateLimited: (key: string, max: number, windowSeconds: number) => Promise<boolean>;
  now?: () => Date;
}

interface Recipient {
  id: string;
  email: string;
  campaign_id: string;
  company_id: string | null;
  language: string | null;
  local_language: string | null;
  company: string | null;
}

export interface Subscriber {
  id: string;
  email: string;
  language: string;
  token: string;
  confirmed_at: string | null;
  unsubscribed_at: string | null;
}

/** sub_<uuid>, and the 32-hex token for the confirm and unsubscribe links. */
export const newSubscriberId = () => `sub_${crypto.randomUUID()}`;
export const newSubscriberToken = () => crypto.randomUUID().replace(/-/g, "");

const SUBSCRIBER_COLUMNS = "id, email, language, token, confirmed_at, unsubscribed_at";

export async function subscriberByEmail(db: D1Database, email: string): Promise<Subscriber | null> {
  return db.prepare(`SELECT ${SUBSCRIBER_COLUMNS} FROM subscribers WHERE email = ? LIMIT 1`).bind(email).first<Subscriber>();
}

async function subscriberByToken(db: D1Database, token: string): Promise<Subscriber | null> {
  return db.prepare(`SELECT ${SUBSCRIBER_COLUMNS} FROM subscribers WHERE token = ? LIMIT 1`).bind(token).first<Subscriber>();
}

/** True when the address is on the list: confirmed and not unsubscribed. */
export const isListed = (s: Subscriber) => s.confirmed_at !== null && s.unsubscribed_at === null;

async function findRecipient(db: D1Database, token: string): Promise<Recipient | null> {
  return db
    .prepare(
      `SELECT r.id, r.email, r.campaign_id, r.company_id, c.language, c.local_language, co.name AS company
         FROM outreach_recipients r
         LEFT JOIN outreach_campaigns c ON c.id = r.campaign_id
         LEFT JOIN companies co ON co.id = r.company_id
        WHERE r.unsub_token = ?
        LIMIT 1`
    )
    .bind(token)
    .first<Recipient>();
}

/** The CRM note on the company: what was pressed, from where, and what it did. */
function noteText(email: string, campaignId: string, press: Press, earlier: Subscriber | null): string {
  const what = `${email} pressed "Keep me updated" in outreach campaign ${campaignId}. ${describePress(press)}`;
  if (press.scanner) {
    return `${what} Recorded but not confirmed, and the outreach sequence goes on: only a press by a person confirms it and stops the sequence.`;
  }
  const was = earlier ? " This confirms an earlier record that was unconfirmed or unsubscribed." : "";
  return `${what} Confirmed for the quarterly update, and the remaining outreach emails are cancelled.${was}`;
}

/**
 * The /k/<token> press. A new address is recorded whatever pressed; an
 * existing one changes only when a person confirms one that was unconfirmed
 * or unsubscribed. Only a person's press stops the sequence. The company
 * gets a CRM note whenever the record changes, so repeated presses add none.
 */
async function recordKeep(db: D1Database, row: Recipient, language: PageLanguage, second: PageLanguage | null, press: Press): Promise<string> {
  const email = row.email.trim().toLowerCase();
  const at = press.at;
  const person = !press.scanner;
  const earlier = await subscriberByEmail(db, email);
  const changes = !earlier || (person && !isListed(earlier));
  const statements: D1PreparedStatement[] = [];
  if (changes) {
    const meta = JSON.stringify({ page: KEEP_PREFIX, campaign: row.campaign_id, ...press });
    statements.push(
      db
        .prepare(
          `INSERT INTO subscribers (id, email, company, company_id, language, source, consent_text, consent_meta, consent_at, confirmed_at, token)
           VALUES (?1, ?2, ?3, ?4, ?5, 'outreach', ?6, ?7, ?8, ?9, ?10)
           ON CONFLICT(email) DO UPDATE SET
             consent_text = excluded.consent_text, consent_meta = excluded.consent_meta, consent_at = excluded.consent_at,
             confirmed_at = excluded.confirmed_at, unsubscribed_at = NULL,
             company = COALESCE(subscribers.company, excluded.company),
             company_id = COALESCE(subscribers.company_id, excluded.company_id)
           WHERE excluded.confirmed_at IS NOT NULL
             AND (subscribers.confirmed_at IS NULL OR subscribers.unsubscribed_at IS NOT NULL)`
        )
        .bind(
          newSubscriberId(), email, row.company, row.company_id, language,
          keepConsentText(language, second), meta, at, person ? at : null, newSubscriberToken()
        )
    );
  }
  if (person) {
    statements.push(
      db
        .prepare(
          `UPDATE outreach_recipients
              SET status = CASE WHEN status IN ('queued', 'active', 'paused') THEN 'done' ELSE status END,
                  next_at = NULL, updated_at = ?2
            WHERE id = ?1`
        )
        .bind(row.id, at),
      db
        .prepare(
          `UPDATE outreach_sends SET status = 'skipped', error = 'keep-updated'
            WHERE recipient_id = ? AND status IN ('pending', 'approved')`
        )
        .bind(row.id)
    );
  }
  if (changes && row.company_id) {
    statements.push(
      db
        .prepare(
          `INSERT INTO activities (id, org_id, type, company_id, subject, description, completed_at, is_completed, created_by, created_at)
           VALUES (?, ?, 'note', ?, 'Asked to be kept updated', ?, ?, 1, ?, ?)`
        )
        .bind(`act_${crypto.randomUUID()}`, ORG_ID, row.company_id, noteText(email, row.campaign_id, press, earlier), at, USER_ID, at)
    );
  }
  if (statements.length) await db.batch(statements);
  // Read back rather than trusting the token just generated: a concurrent
  // press may have inserted the row first.
  return earlier?.token ?? (await subscriberByEmail(db, email))?.token ?? "";
}

async function keep(request: Request, db: D1Database, token: string, ctx: KeepContext, fallback: PageLanguage): Promise<Response> {
  const row = await findRecipient(db, token);
  if (!row) return renderKeepPage(fallback, "unknown", 404);
  const language = asLanguage(row.language) ?? "en";
  const second = asLanguage(row.local_language);
  if (request.method !== "POST") return renderKeepPage(language, "keep", 200, { second, action: `${KEEP_PREFIX}${token}` });
  const press = pressOf(request, ctx.now?.() ?? new Date());
  const subscriberToken = await recordKeep(db, row, language, second, press);
  return renderKeepPage(language, "done", 200, { second, subscriberToken });
}

/** /k/c/: a person's press confirms (again, after an unsubscribe); a scanner's changes nothing. */
async function confirm(request: Request, db: D1Database, token: string, ctx: KeepContext, fallback: PageLanguage): Promise<Response> {
  const sub = await subscriberByToken(db, token);
  if (!sub) return renderKeepPage(fallback, "unknown", 404);
  const language = asLanguage(sub.language) ?? fallback;
  if (request.method !== "POST") return renderKeepPage(language, "confirm", 200, { action: `/k/c/${token}` });
  const press = pressOf(request, ctx.now?.() ?? new Date());
  if (!press.scanner && !isListed(sub)) {
    await db
      .prepare(
        `UPDATE subscribers
            SET confirmed_at = ?2, unsubscribed_at = NULL,
                consent_meta = json_set(COALESCE(consent_meta, '{}'), '$.confirm', json(?3))
          WHERE id = ?1`
      )
      .bind(sub.id, press.at, JSON.stringify({ page: "/k/c/", ...press }))
      .run();
  }
  return renderKeepPage(language, "done", 200, { subscriberToken: token });
}

/** /k/u/: no scanner check, like /u/: a one-click unsubscribe comes from the mail provider. */
async function unsubscribe(request: Request, db: D1Database, token: string, ctx: KeepContext, fallback: PageLanguage): Promise<Response> {
  const sub = await subscriberByToken(db, token);
  if (!sub) return renderKeepPage(fallback, "unknown", 404);
  const language = asLanguage(sub.language) ?? fallback;
  if (request.method !== "POST") return renderKeepPage(language, "unsubscribe", 200, { action: `/k/u/${token}` });
  const at = (ctx.now?.() ?? new Date()).toISOString();
  await db
    .prepare("UPDATE subscribers SET unsubscribed_at = COALESCE(unsubscribed_at, ?2) WHERE id = ?1")
    .bind(sub.id, at)
    .run();
  return renderKeepPage(language, "unsubscribed", 200);
}

export async function handleKeepUpdated(request: Request, ctx: KeepContext): Promise<Response> {
  const fallback = browserLanguage(request.headers.get("Accept-Language"));
  if (!["GET", "HEAD", "POST"].includes(request.method)) {
    const refused = renderKeepPage(fallback, "unknown", 405);
    refused.headers.set("Allow", "GET, HEAD, POST");
    return refused;
  }
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  if (await ctx.isRateLimited(`ip:${ip}:${KEEP_PREFIX}`, MAX_PER_MINUTE, 60)) {
    const busy = renderKeepPage(fallback, "busy", 429);
    busy.headers.set("Retry-After", "60");
    return busy;
  }
  const path = new URL(request.url).pathname;
  const route =
    ([
      [CONFIRM_PATH, confirm],
      [UNSUBSCRIBE_PATH, unsubscribe],
      [KEEP_PATH, keep],
    ] as const).find(([pattern]) => pattern.test(path)) ?? null;
  if (!route) return renderKeepPage(fallback, "unknown", 404);
  if (!ctx.db) return renderKeepPage(fallback, "error", 503);
  const token = path.match(route[0])![1];
  try {
    return await route[1](request, ctx.db, token, ctx, fallback);
  } catch (err) {
    console.error("Keep updated failed:", err instanceof Error ? err.message : err);
    return renderKeepPage(fallback, "error", 503);
  }
}
