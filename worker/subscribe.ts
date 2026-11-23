/**
 * POST /api/subscribe: the website's "Get our updates" sign-up (the footer
 * and /updates). JSON { email, consent: true, name?, company?, language?,
 * page? }.
 *
 * Double opt-in: the address is saved unconfirmed (subscribers, hq's
 * migrations/0025) and gets one email with a confirm link, /k/c/<token>
 * (worker/keep-updated.ts). Anyone can type someone else's address, so the
 * email is fixed copy with nothing the visitor typed, goes to an address at
 * most once per ten minutes, and tells a recipient who did not ask to
 * ignore it. An address already on the list gets nothing.
 *
 * The answer is the same whether or not the address was known, and the
 * email goes after the response, so neither the body nor its timing tells a
 * visitor who is subscribed.
 */

import type { Env } from "./env";
import { isRequestTooLarge } from "./http";
import { pressOf } from "./interest";
import { isListed, newSubscriberId, newSubscriberToken, subscriberByEmail } from "./keep-updated";
import { OWNER_INBOX, POSTAL_ADDRESS, resendSend } from "./resend";
import { sanitizeEmail, sanitizeString } from "./sanitize";
import { asLanguage } from "./unsubscribe";
import { SITE_URL } from "../src/lib/site";

/** The site's locales (LOCALES in src/i18n/locales.ts, which needs the DOM types). */
type Locale = "en" | "ja" | "ko" | "zh-Hans" | "zh-Hant" | "es" | "pt";

/**
 * The sign-up's consent line, word for word as each locale shows it
 * (updates.consent in src/i18n/; test/keep-updated.test.mjs checks they
 * match). The server keeps its own copy so the record of consent is the
 * text shown, not text a request supplies.
 */
export const SIGNUP_CONSENT: Record<Locale, string> = {
  en: "I would like to receive StarTech Innovation's update about once a quarter. Unsubscribe any time.",
  ja: "StarTech Innovation からの四半期に一度程度のお知らせの受け取りを希望します。配信はいつでも停止できます。",
  ko: "StarTech Innovation의 소식을 분기에 한 번 정도 받겠습니다. 언제든지 수신을 거부할 수 있습니다.",
  "zh-Hans": "我希望大约每季度收到一次 StarTech Innovation 的最新动态。可随时退订。",
  "zh-Hant": "我希望大約每季收到一次 StarTech Innovation 的最新動態。可隨時取消訂閱。",
  es: "Deseo recibir la actualización de StarTech Innovation aproximadamente una vez por trimestre. Puedo darme de baja en cualquier momento.",
  pt: "Quero receber a atualização da StarTech Innovation cerca de uma vez por trimestre. Posso cancelar quando quiser.",
};

/** One confirmation email per address per ten minutes. */
const RESEND_AFTER_SECONDS = 600;

const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

/** What every accepted request answers, known address or not. */
const ACCEPTED = { success: true, message: "Thank you. If this address is not on our list yet, we have sent it an email to confirm." };

const json = (status: number, body: object) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

export const CONFIRM_SUBJECT = "Please confirm: StarTech Innovation updates";

/** The confirmation email's text. Fixed copy: only the token varies. */
export function confirmText(token: string): string {
  return [
    "Please open this link and press Confirm if you would like a short update from StarTech Innovation about once a quarter:",
    `${SITE_URL}/k/c/${token}`,
    "If you did not ask for this, ignore this email.",
    `StarTech Innovation Pte. Ltd., ${POSTAL_ADDRESS}`,
  ].join("\n\n");
}

/** True the first time in ten minutes; the KV key is a hash, never the address. */
async function firstInTenMinutes(kv: KVNamespace, email: string): Promise<boolean> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(email));
  const hex = Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
  const key = `subscribe:${hex}`;
  if ((await kv.get(key)) !== null) return false;
  await kv.put(key, "1", { expirationTtl: RESEND_AFTER_SECONDS });
  return true;
}

/** Sends the confirm link, or logs why not. Runs after the response; never throws. */
async function sendConfirmation(env: Env, email: string, subscriberId: string, token: string, now: Date): Promise<void> {
  const from = env.OUTREACH_FROM?.trim();
  if (!from || !env.RESEND_API_KEY) {
    console.error("Subscribe confirmation not sent: OUTREACH_FROM or RESEND_API_KEY is not set.");
    return;
  }
  try {
    if (!(await firstInTenMinutes(env.RATE_LIMIT, email))) return;
    const window = Math.floor(now.getTime() / (RESEND_AFTER_SECONDS * 1000));
    const result = await resendSend(
      env.RESEND_API_KEY,
      {
        from,
        to: [email],
        reply_to: OWNER_INBOX,
        subject: CONFIRM_SUBJECT,
        text: confirmText(token),
        headers: { "Auto-Submitted": "auto-generated", "X-Auto-Response-Suppress": "All" },
      },
      `subscribe-confirm/${subscriberId}/${window}`
    );
    if (!result.ok) console.error("Subscribe confirmation not sent:", result.error);
  } catch (err) {
    console.error("Subscribe confirmation failed:", err instanceof Error ? err.message : err);
  }
}

/** "/updates", "/ja/updates": a site path, or null. */
function sitePath(input: unknown): string | null {
  if (typeof input !== "string" || !input.startsWith("/")) return null;
  const clean = input.replace(/[^A-Za-z0-9/_.#-]/g, "").slice(0, 200);
  return clean || null;
}

export async function handleSubscribe(request: Request, env: Env, ctx: ExecutionContext, now: () => Date = () => new Date()): Promise<Response> {
  if (isRequestTooLarge(request, 16 * 1024)) return json(413, { success: false, error: "Request too large." });
  if (request.headers.get("X-Requested-With") !== "XMLHttpRequest") {
    return json(403, { success: false, error: "Invalid request." });
  }
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json(400, { success: false, error: "Invalid request body." });
  }
  if (!body || typeof body !== "object") return json(400, { success: false, error: "Invalid request body." });

  // Honeypot, as on /testimonial: a field people never see. Pretend it worked.
  if (typeof body.website === "string" && body.website !== "") return json(200, ACCEPTED);

  const str = (v: unknown) => (typeof v === "string" ? v : "");
  const oneLine = (v: unknown) => sanitizeString(str(v), 200).replace(/[\r\n]/g, " ") || null;
  const email = sanitizeEmail(str(body.email)).toLowerCase();
  if (!EMAIL_RE.test(email)) return json(400, { success: false, error: "Invalid email address." });
  if (body.consent !== true) return json(400, { success: false, error: "Please tick the box to agree." });

  const locale = (Object.hasOwn(SIGNUP_CONSENT, str(body.language)) ? str(body.language) : "en") as Locale;
  // Korean has no updates edition yet, so its subscribers get English.
  const language = asLanguage(locale) ?? "en";
  const at = now();
  const meta = JSON.stringify({ page: sitePath(body.page), form: "website", ...pressOf(request, at) });

  const db = env.CRM_DB;
  if (!db) return json(503, { success: false, error: "Sign-up is not available right now. Please try again later." });
  try {
    const earlier = await subscriberByEmail(db, email);
    if (earlier && isListed(earlier)) return json(200, ACCEPTED);
    const id = earlier?.id ?? newSubscriberId();
    const token = earlier?.token ?? newSubscriberToken();
    // A new address, or one not yet confirmed or unsubscribed: the record of
    // consent becomes this request. confirmed_at stays as it was until the
    // link is pressed; an unsubscribe stays until then too.
    await db
      .prepare(
        `INSERT INTO subscribers (id, email, name, company, language, source, consent_text, consent_meta, consent_at, token)
         VALUES (?1, ?2, ?3, ?4, ?5, 'website', ?6, ?7, ?8, ?9)
         ON CONFLICT(email) DO UPDATE SET
           name = COALESCE(excluded.name, subscribers.name), company = COALESCE(excluded.company, subscribers.company),
           language = excluded.language, consent_text = excluded.consent_text,
           consent_meta = excluded.consent_meta, consent_at = excluded.consent_at
         WHERE subscribers.confirmed_at IS NULL OR subscribers.unsubscribed_at IS NOT NULL`
      )
      .bind(id, email, oneLine(body.name), oneLine(body.company), language, SIGNUP_CONSENT[locale], meta, at.toISOString(), token)
      .run();
    const saved = earlier ?? (await subscriberByEmail(db, email));
    if (saved && !isListed(saved)) ctx.waitUntil(sendConfirmation(env, email, saved.id, saved.token, at));
  } catch (err) {
    console.error("Subscribe failed:", err instanceof Error ? err.message : err);
    return json(503, { success: false, error: "Sign-up is not available right now. Please try again later." });
  }
  return json(200, ACCEPTED);
}
