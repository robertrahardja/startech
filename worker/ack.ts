/**
 * The one automatic reply a website enquiry gets (handleContact in
 * worker/index.ts): thank you, Robert replies within one working day, the
 * spreadsheet arrived (when there was one), and nothing more is automatic.
 *
 * Off until OUTREACH_FROM is set. It runs after the response has gone
 * (ctx.waitUntil) and never throws, so it cannot fail or slow the enquiry.
 *
 * Nothing the visitor typed is written into it. Anyone can enter someone
 * else's address in a form, so the reply is fixed copy, reaches an address
 * at most once a day, and tells a recipient who did not write to ignore it.
 */

import { OWNER_INBOX, POSTAL_ADDRESS, resendSend } from "./resend";

export interface AckEnv {
  RESEND_API_KEY?: string;
  OUTREACH_FROM?: string;
  /** Remembers, by a hash of the address, who had an acknowledgement today. */
  RATE_LIMIT: KVNamespace;
}

export interface Enquiry {
  /** Already validated by handleContact. */
  email: string;
  /** The form's topic field as sent, e.g. "thailand"; "" from the main site. */
  topic: string;
  /** The form's locale field, when a site sends one. */
  locale: string;
  /** Sanitized utm_campaign. Country sites default it to "<topic>-<locale>". */
  utmCampaign: string;
  hasSpreadsheet: boolean;
}

type AckLanguage = "en" | "ja" | "id";

interface AckCopy {
  subject: string;
  opening: string;
  spreadsheet: string;
  closing: string;
}

const SIGNATURE = `StarTech Innovation Pte Ltd\n${POSTAL_ADDRESS}\nhttps://startech-innovation.com`;

const ACK_COPY: Record<AckLanguage, AckCopy> = {
  en: {
    subject: "Thank you for your message to StarTech Innovation",
    opening:
      "Hello,\n\nThank you for contacting StarTech Innovation. Your message has reached us, and Robert Rahardja, our Managing Director, will reply to you personally within one working day.",
    spreadsheet: "We have also received the spreadsheet you attached.",
    closing:
      "This is an automatic confirmation, and the only automatic email you will receive from us. Everything after this comes from Robert directly.\n\nIf you did not contact us, please ignore this email.\n\nKind regards,",
  },
  ja: {
    subject: "お問い合わせありがとうございます（StarTech Innovation）",
    opening:
      "このたびは StarTech Innovation にお問い合わせいただき、誠にありがとうございます。\n\nメッセージを確かに受け付けました。1営業日以内に、代表取締役のロバート・ラハルジャよりご返信いたします。",
    spreadsheet: "添付いただいたファイルも、確かに受け取りました。",
    closing:
      "本メールは受付確認のための自動送信です。自動でお送りするメールはこの1通のみで、今後のご連絡はすべてロバートより直接差し上げます。\n\nお心当たりのない場合は、恐れ入りますが本メールを破棄してください。\n\n今後ともよろしくお願いいたします。",
  },
  id: {
    subject: "Terima kasih atas pesan Anda kepada StarTech Innovation",
    opening:
      "Yth. Bapak/Ibu,\n\nTerima kasih telah menghubungi StarTech Innovation. Pesan Anda sudah kami terima, dan Robert Rahardja, Managing Director kami, akan membalas langsung dalam satu hari kerja.",
    spreadsheet: "File yang Anda lampirkan juga sudah kami terima.",
    closing:
      "Email ini adalah konfirmasi otomatis dan merupakan satu-satunya email otomatis dari kami. Balasan selanjutnya akan dikirim langsung oleh Robert.\n\nJika Anda tidak merasa menghubungi kami, mohon abaikan email ini.\n\nHormat kami,",
  },
};

/** Sites that serve Japanese first, with English as their other language. */
const JAPANESE_FIRST = new Set(["thailand", "vietnam", "japan"]);

/** "thailand-en" → "en": the country sites' utm_campaign default when a visit was untagged. */
function campaignLocale(topic: string, utmCampaign: string): string {
  return utmCampaign.match(new RegExp(`^${topic}-([a-z]{2})$`))?.[1] ?? "";
}

/**
 * Indonesia: Bahasa Indonesia. Thailand, Vietnam and Japan: the language the
 * visitor used when the request says (its locale field, else the campaign
 * default), otherwise Japanese; a language we have no copy in gets English.
 * Every other form: English.
 */
function ackLanguage(enquiry: Pick<Enquiry, "topic" | "locale" | "utmCampaign">): AckLanguage {
  if (enquiry.topic === "indonesia") return "id";
  if (!JAPANESE_FIRST.has(enquiry.topic)) return "en";
  const used =
    enquiry.locale.trim().slice(0, 2).toLowerCase() || campaignLocale(enquiry.topic, enquiry.utmCampaign);
  return used === "" || used === "ja" ? "ja" : "en";
}

function ackText(copy: AckCopy, hasSpreadsheet: boolean): string {
  const paragraphs = hasSpreadsheet
    ? [copy.opening, copy.spreadsheet, copy.closing, SIGNATURE]
    : [copy.opening, copy.closing, SIGNATURE];
  return paragraphs.join("\n\n");
}

/** True the first time an address is seen today; the KV key is a hash, never the address. */
async function firstToday(kv: KVNamespace, email: string): Promise<boolean> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(email.toLowerCase()));
  const hex = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
  const key = `ack:${hex}`;
  if ((await kv.get(key)) !== null) return false;
  await kv.put(key, "1", { expirationTtl: 86_400 });
  return true;
}

/** Sends the acknowledgement, or logs why not. Never throws. */
export async function acknowledgeEnquiry(env: AckEnv, enquiry: Enquiry): Promise<void> {
  const from = env.OUTREACH_FROM?.trim();
  if (!from || !env.RESEND_API_KEY) return;
  try {
    if (!(await firstToday(env.RATE_LIMIT, enquiry.email))) return;
    const copy = ACK_COPY[ackLanguage(enquiry)];
    const result = await resendSend(env.RESEND_API_KEY, {
      from,
      to: [enquiry.email],
      reply_to: OWNER_INBOX,
      subject: copy.subject,
      text: ackText(copy, enquiry.hasSpreadsheet),
      // RFC 3834, and Exchange's equivalent: out-of-office replies should
      // not answer an automatic message.
      headers: { "Auto-Submitted": "auto-replied", "X-Auto-Response-Suppress": "All" },
    });
    if (!result.ok) console.error("Enquiry acknowledgement not sent:", result.error);
  } catch (err) {
    console.error("Enquiry acknowledgement failed:", err instanceof Error ? err.message : err);
  }
}
