/**
 * The pages /k/ answers with (worker/keep-updated.ts): "keep me updated"
 * from hq's outreach emails, the website sign-up's confirm link, and the
 * updates' own unsubscribe link. Plain HTML, no JavaScript, in the
 * subscriber's or campaign's language with the campaign's local language
 * below, like /i/ (worker/interest-page.ts). Every string is fixed copy;
 * nothing from the database is written into the page except validated
 * tokens in form and link paths.
 */

import { FOOTER, STYLE, type PageLanguage } from "./unsubscribe-page";

/**
 * keep, confirm, unsubscribe: one button each, because mail scanners open
 * every link in a message. done: on the list. unsubscribed: off it.
 * unknown, error, busy: as on the unsubscribe page.
 */
export type KeepState = "keep" | "confirm" | "unsubscribe" | "done" | "unsubscribed" | "unknown" | "error" | "busy";

type Button = "keep" | "confirm" | "unsubscribe";

interface Copy {
  buttons: Record<Button, string>;
  pages: Record<KeepState, { title: string; body: string }>;
  /** The done page's link to /k/u/<token>. */
  unsubscribeLink: string;
}

const COPY: Record<PageLanguage, Copy> = {
  en: {
    buttons: { keep: "Keep me updated", confirm: "Confirm", unsubscribe: "Unsubscribe" },
    pages: {
      keep: {
        title: "Keep up with StarTech Innovation",
        body: "A short update from StarTech Innovation about once a quarter; unsubscribe any time.",
      },
      confirm: {
        title: "Confirm your StarTech Innovation updates",
        body: "Press the button to confirm that you would like a short update from StarTech Innovation about once a quarter; unsubscribe any time.",
      },
      unsubscribe: {
        title: "Unsubscribe from StarTech Innovation updates",
        body: "Press the button below and we will stop sending you our updates.",
      },
      done: {
        title: "Thank you",
        body: "You will hear from us about once a quarter.",
      },
      unsubscribed: {
        title: "You are unsubscribed",
        body: "We will not send you any more updates. Thank you for letting us know.",
      },
      unknown: {
        title: "This link is not valid",
        body: "We could not find this link. If you would like no more emails from StarTech Innovation, reply to any of them and we will remove your address.",
      },
      error: {
        title: "Something went wrong",
        body: "We could not complete your request just now. Please try again in a few minutes.",
      },
      busy: {
        title: "Please try again shortly",
        body: "We received too many requests from your network. Please wait a minute, then try again.",
      },
    },
    unsubscribeLink: "Unsubscribe from these updates",
  },
  ja: {
    buttons: { keep: "最新情報を受け取る", confirm: "確認する", unsubscribe: "配信を停止する" },
    pages: {
      keep: {
        title: "StarTech Innovation の最新情報",
        body: "StarTech Innovation より、四半期に一度程度、簡単なお知らせをお送りいたします。配信はいつでも停止いただけます。",
      },
      confirm: {
        title: "配信登録のご確認",
        body: "StarTech Innovation からの四半期に一度程度のお知らせをご希望の場合は、下のボタンを押してご確認ください。配信はいつでも停止いただけます。",
      },
      unsubscribe: {
        title: "StarTech Innovation のお知らせの配信停止",
        body: "下のボタンを押すと、お知らせの配信を停止いたします。",
      },
      done: {
        title: "ありがとうございます",
        body: "四半期に一度程度、お知らせをお送りいたします。",
      },
      unsubscribed: {
        title: "配信を停止しました",
        body: "今後、お知らせをお送りすることはございません。ご連絡いただき、ありがとうございました。",
      },
      unknown: {
        title: "このリンクは無効です",
        body: "リンクを確認できませんでした。今後のメールが不要な場合は、受信したメールにご返信ください。アドレスを削除いたします。",
      },
      error: {
        title: "ただいま処理できませんでした",
        body: "恐れ入りますが、しばらくしてから再度お試しください。",
      },
      busy: {
        title: "しばらくしてから再度お試しください",
        body: "ご利用のネットワークからのアクセスが集中しています。1分ほどおいてから、再度お試しください。",
      },
    },
    unsubscribeLink: "お知らせの配信を停止する",
  },
  "zh-Hans": {
    buttons: { keep: "订阅最新动态", confirm: "确认", unsubscribe: "退订" },
    pages: {
      keep: {
        title: "关注 StarTech Innovation 最新动态",
        body: "StarTech Innovation 大约每季度发送一次简短的最新动态，您可随时退订。",
      },
      confirm: {
        title: "确认订阅 StarTech Innovation 最新动态",
        body: "请点击下方按钮，确认您希望大约每季度收到一次 StarTech Innovation 的简短动态。您可随时退订。",
      },
      unsubscribe: {
        title: "退订 StarTech Innovation 最新动态",
        body: "点击下方按钮后，我们将不再向您发送最新动态。",
      },
      done: {
        title: "谢谢您",
        body: "我们大约每季度会向您发送一次最新动态。",
      },
      unsubscribed: {
        title: "您已退订",
        body: "我们将不再向您发送最新动态。感谢您告知我们。",
      },
      unknown: {
        title: "此链接无效",
        body: "我们找不到这个链接。如果您不希望再收到 StarTech Innovation 的邮件，请回复其中任意一封，我们会删除您的地址。",
      },
      error: {
        title: "出现了问题",
        body: "暂时无法完成您的请求。请几分钟后再试。",
      },
      busy: {
        title: "请稍后再试",
        body: "我们收到来自您网络的请求过多。请等待一分钟后再试。",
      },
    },
    unsubscribeLink: "退订最新动态",
  },
  "zh-Hant": {
    buttons: { keep: "訂閱最新動態", confirm: "確認", unsubscribe: "取消訂閱" },
    pages: {
      keep: {
        title: "關注 StarTech Innovation 最新動態",
        body: "StarTech Innovation 大約每季寄送一次簡短的最新動態，您可隨時取消訂閱。",
      },
      confirm: {
        title: "確認訂閱 StarTech Innovation 最新動態",
        body: "請按下方按鈕，確認您希望大約每季收到一次 StarTech Innovation 的簡短動態。您可隨時取消訂閱。",
      },
      unsubscribe: {
        title: "取消訂閱 StarTech Innovation 最新動態",
        body: "按下方按鈕後，我們將不再寄送最新動態給您。",
      },
      done: {
        title: "謝謝您",
        body: "我們大約每季會寄送一次最新動態給您。",
      },
      unsubscribed: {
        title: "您已取消訂閱",
        body: "我們將不再寄送最新動態給您。感謝您告知我們。",
      },
      unknown: {
        title: "此連結無效",
        body: "我們找不到這個連結。如果您不希望再收到 StarTech Innovation 的郵件，請回覆其中任何一封，我們會刪除您的地址。",
      },
      error: {
        title: "發生問題",
        body: "暫時無法完成您的請求。請幾分鐘後再試。",
      },
      busy: {
        title: "請稍後再試",
        body: "我們收到來自您網路的請求過多。請等待一分鐘後再試。",
      },
    },
    unsubscribeLink: "取消訂閱最新動態",
  },
  id: {
    buttons: { keep: "Kirimi saya kabar terbaru", confirm: "Konfirmasi", unsubscribe: "Berhenti berlangganan" },
    pages: {
      keep: {
        title: "Ikuti kabar dari StarTech Innovation",
        body: "Kabar singkat dari StarTech Innovation sekitar sekali per kuartal; berhenti berlangganan kapan saja.",
      },
      confirm: {
        title: "Konfirmasi kabar dari StarTech Innovation",
        body: "Tekan tombol untuk mengonfirmasi bahwa Bapak/Ibu ingin menerima kabar singkat dari StarTech Innovation sekitar sekali per kuartal; berhenti berlangganan kapan saja.",
      },
      unsubscribe: {
        title: "Berhenti berlangganan kabar StarTech Innovation",
        body: "Tekan tombol di bawah, dan kami tidak akan mengirimkan kabar kami lagi.",
      },
      done: {
        title: "Terima kasih",
        body: "Bapak/Ibu akan menerima kabar dari kami sekitar sekali per kuartal.",
      },
      unsubscribed: {
        title: "Langganan telah dihentikan",
        body: "Kami tidak akan mengirimkan kabar lagi. Terima kasih telah memberi tahu kami.",
      },
      unknown: {
        title: "Tautan ini tidak valid",
        body: "Kami tidak menemukan tautan ini. Jika Bapak/Ibu tidak ingin menerima email lagi dari StarTech Innovation, balas salah satu email kami dan kami akan menghapus alamat Bapak/Ibu.",
      },
      error: {
        title: "Terjadi kesalahan",
        body: "Kami belum dapat memproses permintaan ini. Silakan coba lagi dalam beberapa menit.",
      },
      busy: {
        title: "Silakan coba lagi sebentar lagi",
        body: "Kami menerima terlalu banyak permintaan dari jaringan Bapak/Ibu. Tunggu satu menit, lalu coba lagi.",
      },
    },
    unsubscribeLink: "Berhenti berlangganan kabar ini",
  },
  es: {
    buttons: { keep: "Quiero recibir novedades", confirm: "Confirmar", unsubscribe: "Darme de baja" },
    pages: {
      keep: {
        title: "Manténgase al día con StarTech Innovation",
        body: "Una breve actualización de StarTech Innovation aproximadamente una vez por trimestre; puede darse de baja en cualquier momento.",
      },
      confirm: {
        title: "Confirme las novedades de StarTech Innovation",
        body: "Presione el botón para confirmar que desea recibir una breve actualización de StarTech Innovation aproximadamente una vez por trimestre; puede darse de baja en cualquier momento.",
      },
      unsubscribe: {
        title: "Darse de baja de las novedades de StarTech Innovation",
        body: "Presione el botón y dejaremos de enviarle nuestras novedades.",
      },
      done: {
        title: "Gracias",
        body: "Recibirá noticias nuestras aproximadamente una vez por trimestre.",
      },
      unsubscribed: {
        title: "Se ha dado de baja",
        body: "No le enviaremos más novedades. Gracias por avisarnos.",
      },
      unknown: {
        title: "Este enlace no es válido",
        body: "No encontramos este enlace. Si no desea recibir más correos de StarTech Innovation, responda a cualquiera de ellos y eliminaremos su dirección.",
      },
      error: {
        title: "Algo salió mal",
        body: "No pudimos completar su solicitud en este momento. Inténtelo de nuevo en unos minutos.",
      },
      busy: {
        title: "Inténtelo de nuevo en un momento",
        body: "Recibimos demasiadas solicitudes desde su red. Espere un minuto y vuelva a intentarlo.",
      },
    },
    unsubscribeLink: "Darse de baja de estas novedades",
  },
  pt: {
    buttons: { keep: "Quero receber novidades", confirm: "Confirmar", unsubscribe: "Cancelar inscrição" },
    pages: {
      keep: {
        title: "Acompanhe a StarTech Innovation",
        body: "Uma breve atualização da StarTech Innovation cerca de uma vez por trimestre; cancele quando quiser.",
      },
      confirm: {
        title: "Confirme as novidades da StarTech Innovation",
        body: "Clique no botão para confirmar que deseja receber uma breve atualização da StarTech Innovation cerca de uma vez por trimestre; cancele quando quiser.",
      },
      unsubscribe: {
        title: "Cancelar as novidades da StarTech Innovation",
        body: "Clique no botão e deixaremos de enviar as nossas novidades.",
      },
      done: {
        title: "Obrigado",
        body: "Você receberá notícias nossas cerca de uma vez por trimestre.",
      },
      unsubscribed: {
        title: "Inscrição cancelada",
        body: "Não enviaremos mais novidades. Obrigado por nos avisar.",
      },
      unknown: {
        title: "Este link não é válido",
        body: "Não encontramos este link. Se não quiser receber mais e-mails da StarTech Innovation, responda a qualquer um deles e removeremos o seu endereço.",
      },
      error: {
        title: "Algo deu errado",
        body: "Não conseguimos concluir o seu pedido agora. Tente novamente em alguns minutos.",
      },
      busy: {
        title: "Tente novamente em instantes",
        body: "Recebemos muitas solicitações da sua rede. Aguarde um minuto e tente de novo.",
      },
    },
    unsubscribeLink: "Cancelar estas novidades",
  },
};

const BUTTON_OF: Partial<Record<KeepState, Button>> = { keep: "keep", confirm: "confirm", unsubscribe: "unsubscribe" };

const EXTRA_STYLE = `.unsubscribe a{display:inline-block;min-height:44px;line-height:44px;color:#9fc0ff}`;

/** The languages shown: the first, and the second below it when it differs. */
const shown = (language: PageLanguage, second?: PageLanguage | null): PageLanguage[] =>
  second && second !== language ? [language, second] : [language];

/** The button's label as the page shows it: "Keep me updated / 最新情報を受け取る". */
const buttonLabel = (languages: PageLanguage[], button: Button) =>
  languages.map((l) => COPY[l].buttons[button]).join(" / ");

/**
 * The exact words a /k/<token> page shows, for subscribers.consent_text:
 * each language's line, then the button as pressed.
 */
export function keepConsentText(language: PageLanguage, second?: PageLanguage | null): string {
  const languages = shown(language, second);
  return [...languages.map((l) => COPY[l].pages.keep.body), `[${buttonLabel(languages, "keep")}]`].join("\n");
}

function sections(languages: PageLanguage[], state: KeepState): string {
  return languages
    .map((language, i) => {
      const { title, body } = COPY[language].pages[state];
      const heading = i === 0 ? `<h1>${title}</h1>` : `<h2>${title}</h2>`;
      return `<section lang="${language}">${heading}<p>${body}</p></section>`;
    })
    .join("\n");
}

export interface KeepPageOptions {
  /** The campaign's local language, shown below. */
  second?: PageLanguage | null;
  /** keep, confirm, unsubscribe: the path the button posts to. */
  action?: string;
  /** done: the subscriber's token, for the unsubscribe link. */
  subscriberToken?: string;
}

export function renderKeepPage(
  language: PageLanguage,
  state: KeepState,
  status: number,
  options: KeepPageOptions = {}
): Response {
  const languages = shown(language, options.second);
  const { title } = COPY[language].pages[state];
  const button = BUTTON_OF[state];
  const form =
    button && options.action
      ? `<form method="post" action="${options.action}"><button type="submit">${buttonLabel(languages, button)}</button></form>`
      : "";
  const unsubscribe =
    state === "done" && options.subscriberToken
      ? `<p class="unsubscribe"><a href="/k/u/${options.subscriberToken}">${languages.map((l) => COPY[l].unsubscribeLink).join(" / ")}</a></p>`
      : "";
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
${form}${unsubscribe}
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
