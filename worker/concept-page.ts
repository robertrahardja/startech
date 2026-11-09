/**
 * The page /c/<token>/ answers with when it has no concept to show
 * (worker/concepts.ts): taken offline (Robert's "Pull offline" in hq),
 * unknown, unavailable or rate limited. Polite and neutral, in the styling
 * of the /u/ and /i/ pages, in the visitor's browser language because the
 * link alone does not say which campaign it came from. Fixed copy only:
 * nothing from the request is written into the page.
 */

import { PHONE } from "./interest-page";
import { FOOTER, STYLE, type PageLanguage } from "./unsubscribe-page";

/** gone: pulled offline (410). unknown: no such concept (404). error: R2 unreachable. busy: rate limited. */
export type ConceptPageState = "gone" | "unknown" | "error" | "busy";

const STATUS: Record<ConceptPageState, number> = { gone: 410, unknown: 404, error: 503, busy: 429 };

const COPY: Record<PageLanguage, Record<ConceptPageState, { title: string; body: string }>> = {
  en: {
    gone: {
      title: "This page is no longer available",
      body: `The page we prepared for your company has been taken offline. If you have any questions, please reply to our email or call Robert Rahardja on ${PHONE}.`,
    },
    unknown: {
      title: "This page could not be found",
      body: "Please check the link in our email. If it still does not open, reply to the email and we will send it again.",
    },
    error: {
      title: "Something went wrong",
      body: "This page could not be loaded just now. Please try again in a few minutes.",
    },
    busy: {
      title: "Please try again shortly",
      body: "We received too many requests from your network. Please wait a minute, then try again.",
    },
  },
  ja: {
    gone: {
      title: "このページは公開を終了しました",
      body: `貴社向けにご用意したページは、公開を終了いたしました。ご不明な点がございましたら、メールにご返信いただくか、ロバート・ラハルジャ（${PHONE}）までご連絡ください。`,
    },
    unknown: {
      title: "ページが見つかりませんでした",
      body: "メールに記載のリンクをご確認ください。それでも開けない場合は、メールにご返信いただければ、改めてお送りいたします。",
    },
    error: {
      title: "ただいま表示できませんでした",
      body: "恐れ入りますが、しばらくしてから再度お試しください。",
    },
    busy: {
      title: "しばらくしてから再度お試しください",
      body: "ご利用のネットワークからのアクセスが集中しています。1分ほどおいてから、再度お試しください。",
    },
  },
  "zh-Hans": {
    gone: {
      title: "此页面已下线",
      body: `我们为贵公司准备的页面已下线。如有任何疑问，请回复我们的邮件，或致电 ${PHONE} 联系 Robert Rahardja。`,
    },
    unknown: {
      title: "找不到此页面",
      body: "请核对我们邮件中的链接。如果仍无法打开，请回复邮件，我们会重新发送。",
    },
    error: {
      title: "出现了问题",
      body: "暂时无法加载此页面。请几分钟后再试。",
    },
    busy: {
      title: "请稍后再试",
      body: "我们收到来自您网络的请求过多。请等待一分钟后再试。",
    },
  },
  "zh-Hant": {
    gone: {
      title: "此頁面已下線",
      body: `我們為貴公司準備的頁面已下線。如有任何疑問，請回覆我們的郵件，或致電 ${PHONE} 聯繫 Robert Rahardja。`,
    },
    unknown: {
      title: "找不到此頁面",
      body: "請核對我們郵件中的連結。如果仍無法開啟，請回覆郵件，我們會重新寄送。",
    },
    error: {
      title: "發生問題",
      body: "暫時無法載入此頁面。請幾分鐘後再試。",
    },
    busy: {
      title: "請稍後再試",
      body: "我們收到來自您網路的請求過多。請等待一分鐘後再試。",
    },
  },
  id: {
    gone: {
      title: "Halaman ini sudah tidak tersedia",
      body: `Halaman yang kami siapkan untuk perusahaan Bapak/Ibu telah dinonaktifkan. Apabila ada pertanyaan, silakan balas email kami atau hubungi Robert Rahardja di ${PHONE}.`,
    },
    unknown: {
      title: "Halaman ini tidak ditemukan",
      body: "Mohon periksa tautan di email kami. Apabila masih tidak dapat dibuka, balas email tersebut dan kami akan mengirimkannya kembali.",
    },
    error: {
      title: "Terjadi kesalahan",
      body: "Halaman ini belum dapat dimuat. Silakan coba lagi dalam beberapa menit.",
    },
    busy: {
      title: "Silakan coba lagi sebentar lagi",
      body: "Kami menerima terlalu banyak permintaan dari jaringan Bapak/Ibu. Tunggu satu menit, lalu coba lagi.",
    },
  },
  es: {
    gone: {
      title: "Esta página ya no está disponible",
      body: `La página que preparamos para su empresa se retiró. Si tiene alguna pregunta, responda a nuestro correo o llame a Robert Rahardja al ${PHONE}.`,
    },
    unknown: {
      title: "No encontramos esta página",
      body: "Revise el enlace de nuestro correo. Si aún no se abre, responda al correo y se lo enviaremos de nuevo.",
    },
    error: {
      title: "Algo salió mal",
      body: "No pudimos cargar esta página en este momento. Inténtelo de nuevo en unos minutos.",
    },
    busy: {
      title: "Inténtelo de nuevo en un momento",
      body: "Recibimos demasiadas solicitudes desde su red. Espere un minuto y vuelva a intentarlo.",
    },
  },
  pt: {
    gone: {
      title: "Esta página não está mais disponível",
      body: `A página que preparamos para a sua empresa foi retirada do ar. Em caso de dúvidas, responda ao nosso e-mail ou ligue para Robert Rahardja no ${PHONE}.`,
    },
    unknown: {
      title: "Não encontramos esta página",
      body: "Confira o link do nosso e-mail. Se ainda não abrir, responda ao e-mail e enviaremos novamente.",
    },
    error: {
      title: "Algo deu errado",
      body: "Não foi possível carregar esta página agora. Tente novamente em alguns minutos.",
    },
    busy: {
      title: "Tente novamente em instantes",
      body: "Recebemos muitas solicitações da sua rede. Aguarde um minuto e tente de novo.",
    },
  },
};

/** `status` overrides the state's own, for a 405 that reads as "unknown". */
export function renderConceptPage(language: PageLanguage, state: ConceptPageState, status = STATUS[state]): Response {
  const { title, body } = COPY[language][state];
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
<section lang="${language}"><h1>${title}</h1><p>${body}</p></section>
</main>
<footer>${FOOTER}</footer>
</body>
</html>`;
  return new Response(html, {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });
}
