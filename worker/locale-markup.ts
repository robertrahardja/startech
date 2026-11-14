// Locale in the served HTML.
// The app is a single-page application: one index.html is served for every
// route, and React sets <html lang> and the hreflang links after it boots.
// Crawlers and screen readers read the markup as delivered, so without this
// every translated page is announced as English. HTMLRewriter patches the
// response as it streams, so the cost is negligible and the client-side code
// stays unchanged (it simply sets the same values again).
//
// The same pass writes each page's title, description, canonical URL and
// link-preview tags (src/lib/pageMeta.ts), and the homepage's structured
// data, for the same reason: crawlers and the apps that build link previews
// read the HTML as delivered, without running the app.

import { pageMeta } from "../src/lib/pageMeta";
import { resolvePage } from "../src/lib/routes";
import { SITE_NAME, SITE_URL as SITE, SOCIAL_PROFILES } from "../src/lib/site";

/** The image link previews show, 1200 x 630 (public/assets/). */
const SHARE_IMAGE = {
  url: `${SITE}/assets/startech-share.png`,
  width: "1200",
  height: "630",
  alt: "StarTech Innovation: From spreadsheet to system.",
};

/**
 * Who StarTech is, as schema.org structured data, on the homepage: the
 * name, logo and contact details shown on the site, and the four social
 * accounts as the same organisation.
 */
const ORGANIZATION = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: `${SITE}/`,
  logo: `${SITE}/assets/startech-logo-full.png`,
  email: "info@startech-innovation.com",
  telephone: "+65 9069 3236",
  address: { "@type": "PostalAddress", addressCountry: "SG" },
  sameAs: SOCIAL_PROFILES.map((p) => p.href),
};

/** Locale prefixes, and the BCP 47 tag each one is announced as. */
const HTML_LANG: Record<string, string> = {
  ja: "ja",
  ko: "ko",
  "zh-Hans": "zh-Hans",
  "zh-Hant": "zh-Hant",
  es: "es",
  pt: "pt",
};

/** Every published locale, English first. */
export const LOCALE_CODES = ["en", ...Object.keys(HTML_LANG)];

/** The locale a pathname sits under, or "en" when it carries no prefix. */
function localeFromPath(pathname: string): string {
  const first = pathname.split("/")[1] ?? "";
  return first in HTML_LANG ? first : "en";
}

/** The same route with its locale prefix removed. */
function routeWithoutLocale(pathname: string): string {
  const locale = localeFromPath(pathname);
  if (locale === "en") return pathname;
  return pathname.slice(locale.length + 1) || "/";
}

/**
 * scripts/prerender.mjs bakes the rendered English homepage into
 * dist/index.html's #root at build time, so a visitor to "/" gets real
 * content on the very first paint instead of an empty shell waiting on the
 * main bundle. But index.html is also the SPA fallback Cloudflare serves for
 * every route that isn't a real static asset — /solutions, /ja/, an
 * individual solution page — and those would otherwise flash prerendered
 * English homepage markup before React mounts and replaces it with the
 * right page. Only "/" itself (bare, no locale prefix — a locale-prefixed
 * homepage like /ja/ would need its own prerendered snapshot to be safe,
 * which doesn't exist yet, so it falls back to the empty shell too) gets to
 * keep the prerendered content; every other route has #root emptied back
 * out so React starts from the same blank slate it always did there.
 */
function stripPrerenderedContent(response: Response): Response {
  return new HTMLRewriter()
    .on("#root", {
      element(el) {
        el.setInnerContent("");
      },
    })
    .transform(response);
}

/** Escapes a value for a double-quoted HTML attribute. */
function attr(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** The page's URL in a locale; English keeps the bare route. */
export function localeUrl(locale: string, route: string): string {
  return locale === "en" ? `${SITE}${route}` : `${SITE}/${locale}${route}`;
}

export function withLocaleMarkup(response: Response, pathname: string): Response {
  const locale = localeFromPath(pathname);
  const page = resolvePage(routeWithoutLocale(pathname));
  const meta = pageMeta(page);
  // An unknown path shows the homepage, so it names the homepage as its
  // canonical URL rather than becoming a second copy of it.
  const route = meta.route;
  const canonical = localeUrl(locale, route);

  const alternates = LOCALE_CODES.map((code) => {
    const tag = code === "en" ? "en" : HTML_LANG[code];
    return `<link rel="alternate" hreflang="${tag}" href="${localeUrl(code, route)}">`;
  });

  // x-default points at the unprefixed route, which serves English.
  alternates.push(
    `<link rel="alternate" hreflang="x-default" href="${SITE}${route}">`
  );

  const head = [
    ...alternates,
    `<link rel="canonical" href="${attr(canonical)}">`,
    `<meta property="og:url" content="${attr(canonical)}">`,
    `<meta property="og:site_name" content="${attr(SITE_NAME)}">`,
    `<meta property="og:image" content="${attr(SHARE_IMAGE.url)}">`,
    `<meta property="og:image:width" content="${SHARE_IMAGE.width}">`,
    `<meta property="og:image:height" content="${SHARE_IMAGE.height}">`,
    `<meta property="og:image:alt" content="${attr(SHARE_IMAGE.alt)}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
  ];
  if (!meta.indexable) head.push(`<meta name="robots" content="noindex">`);
  if (page.type === "home") {
    // "<" escaped so no value can close the script element early.
    const json = JSON.stringify(ORGANIZATION).replace(/</g, "\\u003c");
    head.push(`<script type="application/ld+json">${json}</script>`);
  }

  const rewriter = new HTMLRewriter()
    .on("html", {
      element(el) {
        el.setAttribute("lang", locale === "en" ? "en" : HTML_LANG[locale]);
      },
    })
    .on("title", {
      element(el) {
        el.setInnerContent(meta.title);
      },
    })
    .on('meta[name="description"]', {
      element(el) {
        el.setAttribute("content", meta.description);
      },
    })
    .on('meta[property="og:title"]', {
      element(el) {
        el.setAttribute("content", meta.title);
      },
    })
    // The homepage keeps the shorter share text index.html already has.
    .on('meta[property="og:description"]', {
      element(el) {
        if (page.type !== "home") el.setAttribute("content", meta.description);
      },
    })
    .on("head", {
      element(el) {
        el.append(head.join(""), { html: true });
      },
    });

  const transformed = rewriter.transform(response);
  return pathname === "/" ? transformed : stripPrerenderedContent(transformed);
}
