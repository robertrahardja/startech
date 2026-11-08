/**
 * The pages /u/<token> answers with (worker/unsubscribe.ts): plain HTML,
 * no JavaScript, in the campaign's language. Every string here is fixed
 * copy; nothing the visitor or the database supplies is written into the
 * page except the form's own path, which is a validated token.
 */

import { POSTAL_ADDRESS } from "./resend";

/** The languages hq's campaigns are written in (outreach_campaigns.language). */
export type PageLanguage = "en" | "ja" | "id";

/**
 * confirm: asks before unsubscribing, because mail scanners open links.
 * done: the address is suppressed. unknown: no such token, said neutrally.
 * error: the database could not be reached. busy: rate limited.
 */
export type PageState = "confirm" | "done" | "unknown" | "error" | "busy";

interface LanguageCopy {
  button: string;
  pages: Record<PageState, { title: string; body: string }>;
}

const COPY: Record<PageLanguage, LanguageCopy> = {
  en: {
    button: "Unsubscribe",
    pages: {
      confirm: {
        title: "Unsubscribe from StarTech Innovation emails",
        body: "Press the button below and we will not email this address again.",
      },
      done: {
        title: "You are unsubscribed",
        body: "We will not send you any more emails. Thank you for letting us know, and sorry for the interruption.",
      },
      unknown: {
        title: "This link is not valid",
        body: "We could not find this unsubscribe link. If you would like no more emails from StarTech Innovation, reply to any of them with the word \"unsubscribe\" and we will remove your address.",
      },
      error: {
        title: "Something went wrong",
        body: "We could not complete your request just now. Please try again in a few minutes, or reply to our email with the word \"unsubscribe\".",
      },
      busy: {
        title: "Please try again shortly",
        body: "We received too many requests from your network. Please wait a minute, then try again.",
      },
    },
  },
  ja: {
    button: "配信を停止する",
    pages: {
      confirm: {
        title: "StarTech Innovation からのメール配信停止",
        body: "下のボタンを押すと、このアドレスへのメール送信を停止いたします。",
      },
      done: {
        title: "配信を停止しました",
        body: "今後、StarTech Innovation からメールをお送りすることはございません。お手数をおかけしました。ご連絡いただき、ありがとうございました。",
      },
      unknown: {
        title: "このリンクは無効です",
        body: "配信停止のリンクを確認できませんでした。今後のメールが不要な場合は、受信したメールに「配信停止」とご返信ください。アドレスを削除いたします。",
      },
      error: {
        title: "ただいま処理できませんでした",
        body: "恐れ入りますが、しばらくしてから再度お試しいただくか、受信したメールに「配信停止」とご返信ください。",
      },
      busy: {
        title: "しばらくしてから再度お試しください",
        body: "ご利用のネットワークからのアクセスが集中しています。1分ほどおいてから、再度お試しください。",
      },
    },
  },
  id: {
    button: "Berhenti berlangganan",
    pages: {
      confirm: {
        title: "Berhenti menerima email dari StarTech Innovation",
        body: "Tekan tombol di bawah ini, dan kami tidak akan mengirim email lagi ke alamat ini.",
      },
      done: {
        title: "Anda telah berhenti berlangganan",
        body: "Kami tidak akan mengirimkan email lagi kepada Anda. Terima kasih atas pemberitahuannya, dan mohon maaf atas gangguannya.",
      },
      unknown: {
        title: "Tautan ini tidak valid",
        body: "Kami tidak dapat menemukan tautan berhenti berlangganan ini. Jika Anda tidak ingin menerima email dari StarTech Innovation lagi, silakan balas salah satu email kami dengan kata \"berhenti\", dan alamat Anda akan kami hapus.",
      },
      error: {
        title: "Terjadi kendala",
        body: "Permintaan Anda belum dapat kami proses saat ini. Silakan coba lagi dalam beberapa menit, atau balas email kami dengan kata \"berhenti\".",
      },
      busy: {
        title: "Mohon coba lagi sebentar lagi",
        body: "Kami menerima terlalu banyak permintaan dari jaringan Anda. Silakan tunggu sekitar satu menit, lalu coba lagi.",
      },
    },
  },
};

const STYLE = `:root{color-scheme:dark}
*{box-sizing:border-box}
body{margin:0;min-height:100vh;display:flex;flex-direction:column;background:#000;color:#fff;font:16px/1.6 system-ui,-apple-system,"Segoe UI",Roboto,"Hiragino Sans","Noto Sans JP",sans-serif}
main{flex:1;width:100%;max-width:32rem;margin:0 auto;padding:3rem 1rem 2rem}
.mark{display:block;margin:0 0 2rem}
h1{margin:0 0 .75rem;font-size:1.5rem;line-height:1.35}
p{margin:0 0 1.5rem;color:#c2c2cc}
button{min-height:44px;padding:.75rem 1.5rem;border:1px solid #5b8dfb;border-radius:.5rem;background:#0a68f9;color:#fff;font:inherit;font-weight:600;cursor:pointer}
button:focus-visible{outline:2px solid #fff;outline-offset:2px}
footer{padding:1rem;color:#c2c2cc;font-size:.8125rem;text-align:center}
footer span{white-space:nowrap}`;

/** One line for the company, and no break inside "#06-07" or the postcode. */
const FOOTER = `StarTech Innovation Pte Ltd<br>${POSTAL_ADDRESS.split(", ")
  .map((part) => `<span>${part}</span>`)
  .join(", ")}`;

/**
 * The page for `state`. `formAction` is the /u/<token> path the confirm
 * button posts to; the form sends the same body as an RFC 8058 one-click
 * request, so both take the same path through the handler.
 */
export function renderPage(
  language: PageLanguage,
  state: PageState,
  status: number,
  formAction?: string
): Response {
  const copy = COPY[language];
  const { title, body } = copy.pages[state];
  const form = formAction
    ? `<form method="post" action="${formAction}"><input type="hidden" name="List-Unsubscribe" value="One-Click"><button type="submit">${copy.button}</button></form>`
    : "";
  const html = `<!doctype html>
<html lang="${language}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${title}</title>
<link rel="icon" type="image/svg+xml" href="/assets/startech-mark.svg">
<style>${STYLE}</style>
</head>
<body>
<main>
<img class="mark" src="/assets/startech-mark.svg" alt="StarTech Innovation" width="40" height="40">
<h1>${title}</h1>
<p>${body}</p>
${form}
</main>
<footer>${FOOTER}</footer>
</body>
</html>`;
  return new Response(html, {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
