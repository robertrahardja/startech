/**
 * The pages /i/<token> answers with (worker/interest.ts): the one-button
 * "I am interested" from hq's outreach emails. Plain HTML, no JavaScript,
 * in the campaign's language and its local language below. Every string is
 * fixed copy; nothing from the database is written into the page except
 * the validated token in the form and WhatsApp paths.
 */

import { FOOTER, STYLE, type PageLanguage } from "./unsubscribe-page";

/**
 * confirm: one button, because mail scanners open every link in a message
 * and must not register interest. done: recorded, with the ways to reach
 * Robert now. unknown, error, busy: as on the unsubscribe page.
 */
export type InterestState = "confirm" | "done" | "unknown" | "error" | "busy";

interface Copy {
  button: string;
  pages: Record<InterestState, { title: string; body: string }>;
  phone: string;
  email: string;
  wechat: string;
}

export const PHONE = "+65 9069 3236";
const EMAIL = "robert.rahardja@startech-innovation.com";
const WECHAT_ID = "Robertlianhai";

const COPY: Record<PageLanguage, Copy> = {
  en: {
    button: "I am interested",
    pages: {
      confirm: {
        title: "Tell StarTech Innovation you are interested",
        body: "Press the button below and Robert Rahardja, our Managing Director, will contact you within one working day.",
      },
      done: {
        title: "Thank you",
        body: "We have let Robert Rahardja know. He will contact you personally within one working day. If you would rather reach him now:",
      },
      unknown: {
        title: "This link is not valid",
        body: `We could not find this link. You can still reach Robert Rahardja by replying to our email or calling ${PHONE}.`,
      },
      error: {
        title: "Something went wrong",
        body: "We could not record your answer just now. Please try again in a few minutes, or reply to our email.",
      },
      busy: {
        title: "Please try again shortly",
        body: "We received too many requests from your network. Please wait a minute, then try again.",
      },
    },
    phone: "Phone",
    email: "Email",
    wechat: "WeChat",
  },
  ja: {
    button: "話を聞いてみたい",
    pages: {
      confirm: {
        title: "StarTech Innovation へのご関心をお知らせください",
        body: "下のボタンを押していただくと、1営業日以内に代表のロバート・ラハルジャよりご連絡いたします。",
      },
      done: {
        title: "ありがとうございます",
        body: "ロバート・ラハルジャに伝えました。1営業日以内に本人よりご連絡いたします。すぐにご連絡をご希望の場合は、こちらからどうぞ。",
      },
      unknown: {
        title: "このリンクは無効です",
        body: `リンクを確認できませんでした。メールへのご返信、またはお電話（${PHONE}）でもご連絡いただけます。`,
      },
      error: {
        title: "ただいま処理できませんでした",
        body: "恐れ入りますが、しばらくしてから再度お試しいただくか、メールにご返信ください。",
      },
      busy: {
        title: "しばらくしてから再度お試しください",
        body: "ご利用のネットワークからのアクセスが集中しています。1分ほどおいてから、再度お試しください。",
      },
    },
    phone: "電話",
    email: "メール",
    wechat: "WeChat",
  },
  "zh-Hans": {
    button: "我有兴趣，请联系我",
    pages: {
      confirm: {
        title: "告诉 StarTech Innovation 您有兴趣",
        body: "点击下方按钮后，我们的董事总经理 Robert Rahardja 将在一个工作日内与您联系。",
      },
      done: {
        title: "谢谢您",
        body: "我们已通知 Robert Rahardja，他将在一个工作日内亲自与您联系。如果您希望现在就联系他：",
      },
      unknown: {
        title: "此链接无效",
        body: `我们找不到这个链接。您仍可回复我们的邮件或致电 ${PHONE} 联系 Robert Rahardja。`,
      },
      error: {
        title: "出现了问题",
        body: "暂时无法记录您的回复。请几分钟后再试，或直接回复我们的邮件。",
      },
      busy: {
        title: "请稍后再试",
        body: "我们收到来自您网络的请求过多。请等待一分钟后再试。",
      },
    },
    phone: "电话",
    email: "邮箱",
    wechat: "微信",
  },
  "zh-Hant": {
    button: "我有興趣，請與我聯繫",
    pages: {
      confirm: {
        title: "告訴 StarTech Innovation 您有興趣",
        body: "按下方按鈕後，我們的董事總經理 Robert Rahardja 將在一個工作天內與您聯繫。",
      },
      done: {
        title: "謝謝您",
        body: "我們已通知 Robert Rahardja，他將在一個工作天內親自與您聯繫。如果您希望現在就聯繫他：",
      },
      unknown: {
        title: "此連結無效",
        body: `我們找不到這個連結。您仍可回覆我們的郵件或致電 ${PHONE} 聯繫 Robert Rahardja。`,
      },
      error: {
        title: "發生問題",
        body: "暫時無法記錄您的回覆。請幾分鐘後再試，或直接回覆我們的郵件。",
      },
      busy: {
        title: "請稍後再試",
        body: "我們收到來自您網路的請求過多。請等待一分鐘後再試。",
      },
    },
    phone: "電話",
    email: "電子郵件",
    wechat: "微信",
  },
  id: {
    button: "Saya tertarik",
    pages: {
      confirm: {
        title: "Beri tahu StarTech Innovation bahwa Bapak/Ibu tertarik",
        body: "Tekan tombol di bawah, dan Robert Rahardja, Managing Director kami, akan menghubungi Bapak/Ibu dalam satu hari kerja.",
      },
      done: {
        title: "Terima kasih",
        body: "Kami telah memberi tahu Robert Rahardja. Beliau akan menghubungi Bapak/Ibu secara langsung dalam satu hari kerja. Jika ingin menghubunginya sekarang:",
      },
      unknown: {
        title: "Tautan ini tidak valid",
        body: `Kami tidak menemukan tautan ini. Bapak/Ibu tetap dapat menghubungi Robert Rahardja dengan membalas email kami atau menelepon ${PHONE}.`,
      },
      error: {
        title: "Terjadi kesalahan",
        body: "Kami belum dapat mencatat jawaban Bapak/Ibu. Silakan coba lagi dalam beberapa menit, atau balas email kami.",
      },
      busy: {
        title: "Silakan coba lagi sebentar lagi",
        body: "Kami menerima terlalu banyak permintaan dari jaringan Bapak/Ibu. Tunggu satu menit, lalu coba lagi.",
      },
    },
    phone: "Telepon",
    email: "Email",
    wechat: "WeChat",
  },
  es: {
    button: "Me interesa",
    pages: {
      confirm: {
        title: "Indique a StarTech Innovation que le interesa",
        body: "Presione el botón y Robert Rahardja, nuestro director general, se pondrá en contacto con usted en un día hábil.",
      },
      done: {
        title: "Gracias",
        body: "Ya avisamos a Robert Rahardja. Se pondrá en contacto con usted personalmente en un día hábil. Si prefiere comunicarse ahora:",
      },
      unknown: {
        title: "Este enlace no es válido",
        body: `No encontramos este enlace. Puede comunicarse con Robert Rahardja respondiendo a nuestro correo o llamando al ${PHONE}.`,
      },
      error: {
        title: "Algo salió mal",
        body: "No pudimos registrar su respuesta en este momento. Inténtelo de nuevo en unos minutos o responda a nuestro correo.",
      },
      busy: {
        title: "Inténtelo de nuevo en un momento",
        body: "Recibimos demasiadas solicitudes desde su red. Espere un minuto y vuelva a intentarlo.",
      },
    },
    phone: "Teléfono",
    email: "Correo",
    wechat: "WeChat",
  },
  pt: {
    button: "Tenho interesse",
    pages: {
      confirm: {
        title: "Avise a StarTech Innovation do seu interesse",
        body: "Clique no botão e Robert Rahardja, nosso diretor-geral, entrará em contato em até um dia útil.",
      },
      done: {
        title: "Obrigado",
        body: "Já avisamos Robert Rahardja. Ele entrará em contato pessoalmente em até um dia útil. Se preferir falar com ele agora:",
      },
      unknown: {
        title: "Este link não é válido",
        body: `Não encontramos este link. Ainda é possível falar com Robert Rahardja respondendo ao nosso e-mail ou ligando para ${PHONE}.`,
      },
      error: {
        title: "Algo deu errado",
        body: "Não conseguimos registrar a sua resposta agora. Tente novamente em alguns minutos ou responda ao nosso e-mail.",
      },
      busy: {
        title: "Tente novamente em instantes",
        body: "Recebemos muitas solicitações da sua rede. Aguarde um minuto e tente de novo.",
      },
    },
    phone: "Telefone",
    email: "E-mail",
    wechat: "WeChat",
  },
};

const EXTRA_STYLE = `.channels{list-style:none;margin:0 0 1.5rem;padding:0}
.channels li{margin:0 0 .5rem}
.channels a{display:inline-block;min-height:44px;line-height:44px;color:#9fc0ff}`;

/** Phone, email, WhatsApp, and WeChat when the page is in Chinese. */
function channels(language: PageLanguage, languages: PageLanguage[], token: string): string {
  const c = COPY[language];
  // A full-width colon after Chinese or Japanese ("电话："), ": " otherwise.
  const colon = language === "ja" || language.startsWith("zh") ? "：" : ": ";
  const items = [
    `<li>${c.phone}${colon}<a href="tel:+6590693236">${PHONE}</a></li>`,
    `<li>WhatsApp${colon}<a href="/wa/${token}">${PHONE}</a></li>`,
    `<li>${c.email}${colon}<a href="mailto:${EMAIL}">${EMAIL}</a></li>`,
  ];
  if (languages.some((l) => l.startsWith("zh"))) items.push(`<li>${c.wechat}${colon}${WECHAT_ID}</li>`);
  return `<ul class="channels">${items.join("")}</ul>`;
}

function sections(languages: PageLanguage[], state: InterestState): string {
  return languages
    .map((language, i) => {
      const { title, body } = COPY[language].pages[state];
      const heading = i === 0 ? `<h1>${title}</h1>` : `<h2>${title}</h2>`;
      return `<section lang="${language}">${heading}<p>${body}</p></section>`;
    })
    .join("\n");
}

/**
 * `token` is set for confirm (the form posts to /i/<token>) and done (the
 * WhatsApp link); `second` is the campaign's local language, shown below.
 */
export function renderInterestPage(
  language: PageLanguage,
  state: InterestState,
  status: number,
  token?: string,
  second?: PageLanguage | null
): Response {
  const languages = second && second !== language ? [language, second] : [language];
  const { title } = COPY[language].pages[state];
  const button = languages.map((l) => COPY[l].button).join(" / ");
  const form =
    state === "confirm" && token
      ? `<form method="post" action="/i/${token}"><button type="submit">${button}</button></form>`
      : "";
  const reach = state === "done" && token ? channels(language, languages, token) : "";
  const html = `<!doctype html>
<html lang="${language}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${title}</title>
<link rel="icon" type="image/svg+xml" href="/assets/startech-mark.svg">
<style>${STYLE}
${EXTRA_STYLE}</style>
</head>
<body>
<main>
<img class="mark" src="/assets/startech-mark.svg" alt="StarTech Innovation" width="40" height="40">
${sections(languages, state)}
${form}${reach}
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
