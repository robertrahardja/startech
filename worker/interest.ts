/**
 * The one-button reply in hq's outreach emails (Robert, 9 Nov 2026: "make
 * it as easy for them to say I am interested").
 *
 * GET /i/<token> shows one button and changes nothing: mail scanners open
 * every link in a message, and a scanner must not register interest.
 * POST /i/<token> (the button) records it the way a reply would in hq's
 * src/lib/outreach/replies.ts: the recipient is marked replied and
 * interested, its unsent emails are dropped, a lead deal opens on the
 * company unless one is open, and Robert gets an email (the first time).
 *
 * GET /wa/<token> opens WhatsApp with a message to Robert already written
 * in the campaign's language and naming the company. It records nothing.
 *
 * The token is the recipient's unsub_token, the only credential, as on /u/.
 */

import { renderInterestPage } from "./interest-page";
import { OWNER_INBOX, resendSend } from "./resend";
import { TOKEN_CHARS } from "./unsubscribe";
import type { PageLanguage } from "./unsubscribe-page";

export const INTEREST_PREFIX = "/i/";
export const WHATSAPP_PREFIX = "/wa/";

const INTEREST_PATH = new RegExp(`^/i/(${TOKEN_CHARS})/?$`);
const WHATSAPP_PATH = new RegExp(`^/wa/(${TOKEN_CHARS})/?$`);
const MAX_PER_MINUTE = 30;
const WHATSAPP_NUMBER = "6590693236";

/** hq's src/crm/db.ts DEFAULT_ORG_ID and DEFAULT_USER_ID. */
const ORG_ID = "org_startech_default";
const USER_ID = "user_ceo_default";

/** What Robert's notification says about the company. */
export interface Interested {
  company: string;
  country: string | null;
  email: string;
  campaignId: string;
  step: number;
}

export interface InterestContext {
  db: D1Database | undefined;
  isRateLimited: (key: string, max: number, windowSeconds: number) => Promise<boolean>;
  /** Emails Robert. Runs after the response (waitUntil); must not throw. */
  notify: (who: Interested) => Promise<void>;
  waitUntil: (promise: Promise<unknown>) => void;
  now?: () => Date;
}

interface Row {
  id: string;
  email: string;
  step: number;
  campaign_id: string;
  company_id: string | null;
  interested_at: string | null;
  language: string | null;
  local_language: string | null;
  company: string | null;
  country: string | null;
}

const LANGUAGES = new Set<string>(["en", "ja", "id", "es", "pt", "zh-Hans", "zh-Hant"]);
const asLanguage = (code: string | null | undefined): PageLanguage | null =>
  code && LANGUAGES.has(code) ? (code as PageLanguage) : null;

async function findRow(db: D1Database, token: string): Promise<Row | null> {
  return db
    .prepare(
      `SELECT r.id, r.email, r.step, r.campaign_id, r.company_id, r.interested_at,
              c.language, c.local_language, co.name AS company, co.country
         FROM outreach_recipients r
         LEFT JOIN outreach_campaigns c ON c.id = r.campaign_id
         LEFT JOIN companies co ON co.id = r.company_id
        WHERE r.unsub_token = ?
        LIMIT 1`
    )
    .bind(token)
    .first<Row>();
}

/** The reply rule (hq replies.ts stopOnReply), plus interested_at and a deal. */
async function record(db: D1Database, row: Row, now: Date): Promise<void> {
  const at = now.toISOString();
  const crmAt = at.replace("T", " ").slice(0, 19);
  const statements = [
    db
      .prepare(
        `UPDATE outreach_recipients
            SET status = CASE WHEN status IN ('queued', 'active', 'paused', 'done') THEN 'replied' ELSE status END,
                replied_at = COALESCE(replied_at, ?2), interested_at = COALESCE(interested_at, ?2),
                next_at = NULL, updated_at = ?2
          WHERE id = ?1`
      )
      .bind(row.id, at),
    db
      .prepare(
        `UPDATE outreach_sends SET status = 'skipped', error = 'interested'
          WHERE recipient_id = ?1 AND status IN ('pending', 'approved')`
      )
      .bind(row.id),
  ];
  if (row.company_id) {
    statements.push(
      db
        .prepare(
          `INSERT INTO deals (id, org_id, company_id, title, stage, value, currency, probability, deal_type, notes,
                              created_by, created_at, updated_at)
           SELECT ?1, ?2, c.id, 'Interested (outreach): ' || c.name, 'lead', 0, 'SGD', 20, 'new', ?4, ?5, ?6, ?6
             FROM companies c
            WHERE c.id = ?3
              AND NOT EXISTS (SELECT 1 FROM deals d WHERE d.company_id = c.id AND d.stage NOT IN ('won', 'lost'))`
        )
        .bind(
          `deal_${crypto.randomUUID()}`,
          ORG_ID,
          row.company_id,
          `Opened when the company pressed "I am interested" in outreach campaign ${row.campaign_id}. Set the stage and value as it moves.`,
          USER_ID,
          crmAt
        )
    );
  }
  await db.batch(statements);
}

const GREETING: Record<PageLanguage, (company: string) => string> = {
  en: (c) => `Hello Robert, I am interested. Company: ${c}`,
  ja: (c) => `ラハルジャ様、詳しく話を聞いてみたいです。会社名：${c}`,
  "zh-Hans": (c) => `Robert您好，我有兴趣。公司：${c}`,
  "zh-Hant": (c) => `Robert您好，我有興趣。公司：${c}`,
  id: (c) => `Halo Pak Robert, saya tertarik. Perusahaan: ${c}`,
  es: (c) => `Hola Robert, me interesa. Empresa: ${c}`,
  pt: (c) => `Olá Robert, tenho interesse. Empresa: ${c}`,
};

/** wa.me with the greeting in the local language when there is one (the person on WhatsApp is local). */
function whatsappUrl(row: Row | null): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (!row) return base;
  const language = asLanguage(row.local_language) ?? asLanguage(row.language) ?? "en";
  return `${base}?text=${encodeURIComponent(GREETING[language](row.company ?? row.email))}`;
}

async function answer(request: Request, db: D1Database, token: string, isWhatsApp: boolean, ctx: InterestContext): Promise<Response> {
  const row = await findRow(db, token);
  if (isWhatsApp) return Response.redirect(whatsappUrl(row), 302);
  if (!row) return renderInterestPage("en", "unknown", 404);
  const language = asLanguage(row.language) ?? "en";
  const second = asLanguage(row.local_language);
  if (request.method !== "POST") return renderInterestPage(language, "confirm", 200, token, second);
  await record(db, row, ctx.now?.() ?? new Date());
  if (!row.interested_at) {
    ctx.waitUntil(
      ctx.notify({ company: row.company ?? row.email, country: row.country, email: row.email, campaignId: row.campaign_id, step: row.step })
    );
  }
  return renderInterestPage(language, "done", 200, token, second);
}

export async function handleInterest(request: Request, ctx: InterestContext): Promise<Response> {
  const path = new URL(request.url).pathname;
  const isWhatsApp = path.startsWith(WHATSAPP_PREFIX);
  const allowed = isWhatsApp ? ["GET", "HEAD"] : ["GET", "HEAD", "POST"];
  if (!allowed.includes(request.method)) {
    const refused = renderInterestPage("en", "unknown", 405);
    refused.headers.set("Allow", allowed.join(", "));
    return refused;
  }
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  if (await ctx.isRateLimited(`ip:${ip}:${INTEREST_PREFIX}`, MAX_PER_MINUTE, 60)) {
    const busy = renderInterestPage("en", "busy", 429);
    busy.headers.set("Retry-After", "60");
    return busy;
  }
  const token = path.match(isWhatsApp ? WHATSAPP_PATH : INTEREST_PATH)?.[1];
  if (!token) return isWhatsApp ? Response.redirect(whatsappUrl(null), 302) : renderInterestPage("en", "unknown", 404);
  if (!ctx.db) return renderInterestPage("en", "error", 503);
  try {
    return await answer(request, ctx.db, token, isWhatsApp, ctx);
  } catch (err) {
    console.error("Interest failed:", err instanceof Error ? err.message : err);
    return isWhatsApp ? Response.redirect(whatsappUrl(null), 302) : renderInterestPage("en", "error", 503);
  }
}

export interface NotifyEnv {
  RESEND_API_KEY?: string;
  OUTREACH_FROM?: string;
}

/** Robert's email when a company presses the button. Never throws. */
export function notifyByEmail(env: NotifyEnv, send: typeof resendSend = resendSend): InterestContext["notify"] {
  return async (who) => {
    const from = env.OUTREACH_FROM?.trim();
    if (!from || !env.RESEND_API_KEY) return;
    const where = who.country ? ` (${who.country})` : "";
    try {
      const result = await send(env.RESEND_API_KEY, {
        from,
        to: [OWNER_INBOX],
        reply_to: who.email,
        subject: `Interested: ${who.company}${where}`,
        text: [
          `${who.company}${where} pressed "I am interested" after email ${who.step} of 3 in outreach campaign ${who.campaignId}.`,
          "",
          `Their address: ${who.email} (reply to this email to answer them).`,
          "A lead deal is open in hq (Clients > Deals), and their remaining outreach emails are cancelled.",
          "They were promised a reply within one working day.",
        ].join("\n"),
      });
      if (!result.ok) console.error("Interest notification not sent:", result.error);
    } catch (err) {
      console.error("Interest notification failed:", err instanceof Error ? err.message : err);
    }
  };
}
