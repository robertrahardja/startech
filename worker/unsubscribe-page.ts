/**
 * The pages /u/<token> answers with (worker/unsubscribe.ts): plain HTML,
 * no JavaScript, in the campaign's language. Every string here is fixed
 * copy; nothing the visitor or the database supplies is written into the
 * page except the form's own path, which is a validated token.
 */

import { POSTAL_ADDRESS } from "./resend";

/**
 * The languages hq's campaigns are written in (outreach_campaigns.language
 * and local_language): Simplified Chinese for mainland companies,
 * Traditional for Taiwanese and Hong Kong ones.
 */
export type PageLanguage = "en" | "ja" | "id" | "es" | "pt" | "zh-Hans" | "zh-Hant";

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
  es: {
    button: "Darse de baja",
    pages: {
      confirm: {
        title: "Dejar de recibir correos de StarTech Innovation",
        body: "Haga clic en el botón de abajo y no volveremos a enviar correos a esta dirección.",
      },
      done: {
        title: "Se ha dado de baja",
        body: "No le enviaremos más correos. Gracias por avisarnos y disculpe la molestia.",
      },
      unknown: {
        title: "Este enlace no es válido",
        body: "No encontramos este enlace para darse de baja. Si no desea recibir más correos de StarTech Innovation, responda a cualquiera de ellos con la palabra «baja» y eliminaremos su dirección.",
      },
      error: {
        title: "Algo salió mal",
        body: "No pudimos completar su solicitud en este momento. Inténtelo de nuevo en unos minutos o responda a nuestro correo con la palabra «baja».",
      },
      busy: {
        title: "Inténtelo de nuevo en un momento",
        body: "Recibimos demasiadas solicitudes desde su red. Espere un minuto y vuelva a intentarlo.",
      },
    },
  },
  pt: {
    button: "Descadastrar",
    pages: {
      confirm: {
        title: "Deixar de receber e-mails da StarTech Innovation",
        body: "Clique no botão abaixo e não enviaremos mais e-mails para este endereço.",
      },
      done: {
        title: "Descadastro concluído",
        body: "Não enviaremos mais e-mails para você. Obrigado por nos avisar, e desculpe o incômodo.",
      },
      unknown: {
        title: "Este link não é válido",
        body: "Não encontramos este link de descadastro. Se não quiser receber mais e-mails da StarTech Innovation, responda a qualquer um deles com a palavra \"descadastrar\" e removeremos o seu endereço.",
      },
      error: {
        title: "Algo deu errado",
        body: "Não conseguimos concluir o seu pedido agora. Tente novamente em alguns minutos ou responda ao nosso e-mail com a palavra \"descadastrar\".",
      },
      busy: {
        title: "Tente novamente em instantes",
        body: "Recebemos muitas solicitações da sua rede. Aguarde um minuto e tente de novo.",
      },
    },
  },
  "zh-Hans": {
    button: "退订",
    pages: {
      confirm: {
        title: "退订 StarTech Innovation 的邮件",
        body: "点击下方按钮后，我们将不再向此邮箱发送邮件。",
      },
      done: {
        title: "您已成功退订",
        body: "我们不会再向您发送邮件。感谢您告知我们，打扰之处敬请谅解。",
      },
      unknown: {
        title: "此链接无效",
        body: "我们找不到这个退订链接。如果您不希望再收到 StarTech Innovation 的邮件，请回复任意一封邮件并写上“退订”，我们会删除您的邮箱地址。",
      },
      error: {
        title: "出现了问题",
        body: "暂时无法完成您的请求。请几分钟后再试，或回复我们的邮件并写上“退订”。",
      },
      busy: {
        title: "请稍后再试",
        body: "来自您所在网络的请求过多。请等待一分钟后再试。",
      },
    },
  },
  "zh-Hant": {
    button: "取消訂閱",
    pages: {
      confirm: {
        title: "取消訂閱 StarTech Innovation 的郵件",
        body: "點選下方按鈕後，我們將不再寄送郵件到此信箱。",
      },
      done: {
        title: "您已成功取消訂閱",
        body: "我們不會再寄送郵件給您。感謝您告知，造成打擾敬請見諒。",
      },
      unknown: {
        title: "此連結無效",
        body: "我們找不到這個取消訂閱連結。如果您不希望再收到 StarTech Innovation 的郵件，請回覆任一封郵件並寫上「取消訂閱」，我們會刪除您的信箱地址。",
      },
      error: {
        title: "發生問題",
        body: "目前無法完成您的請求。請幾分鐘後再試，或回覆我們的郵件並寫上「取消訂閱」。",
      },
      busy: {
        title: "請稍後再試",
        body: "來自您所在網路的請求過多。請等待一分鐘後再試。",
      },
    },
  },
};

export const STYLE = `:root{color-scheme:dark}
*{box-sizing:border-box}
body{margin:0;min-height:100vh;display:flex;flex-direction:column;background:#000;color:#fff;font:16px/1.6 system-ui,-apple-system,"Segoe UI",Roboto,"Hiragino Sans","Noto Sans JP","PingFang SC","PingFang TC","Microsoft YaHei","Microsoft JhengHei",sans-serif}
main{flex:1;width:100%;max-width:32rem;margin:0 auto;padding:3rem 1rem 2rem}
.mark{display:block;margin:0 0 2rem}
h1{margin:0 0 .75rem;font-size:1.5rem;line-height:1.35}
h2{margin:2rem 0 .5rem;font-size:1.125rem;line-height:1.35}
p{margin:0 0 1.5rem;color:#c2c2cc}
button{min-height:44px;padding:.75rem 1.5rem;border:1px solid #5b8dfb;border-radius:.5rem;background:#0a68f9;color:#fff;font:inherit;font-weight:600;cursor:pointer}
button:focus-visible{outline:2px solid #fff;outline-offset:2px}
footer{padding:1rem;color:#c2c2cc;font-size:.8125rem;text-align:center}
footer span{white-space:nowrap}`;

/** One line for the company, and no break inside "#06-07" or the postcode. */
export const FOOTER = `StarTech Innovation Pte Ltd<br>${POSTAL_ADDRESS.split(", ")
  .map((part) => `<span>${part}</span>`)
  .join(", ")}`;

/** The title and text in each language: the first as h1, the second below it. */
function sections(languages: PageLanguage[], state: PageState): string {
  return languages
    .map((language, i) => {
      const { title, body } = COPY[language].pages[state];
      const heading = i === 0 ? `<h1>${title}</h1>` : `<h2>${title}</h2>`;
      return `<section lang="${language}">${heading}<p>${body}</p></section>`;
    })
    .join("\n");
}

/**
 * The page for `state`, in the campaign's language and, when the campaign
 * has one, its local language below (`second`: Japanese then Spanish for a
 * Japanese company in Mexico). `formAction` is the /u/<token> path the
 * confirm button posts to; the form sends the same body as an RFC 8058
 * one-click request, so both take the same path through the handler.
 */
export function renderPage(
  language: PageLanguage,
  state: PageState,
  status: number,
  formAction?: string,
  second?: PageLanguage | null
): Response {
  const languages = second && second !== language ? [language, second] : [language];
  const { title } = COPY[language].pages[state];
  const button = languages.map((l) => COPY[l].button).join(" / ");
  const form = formAction
    ? `<form method="post" action="${formAction}"><input type="hidden" name="List-Unsubscribe" value="One-Click"><button type="submit">${button}</button></form>`
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
${sections(languages, state)}
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
