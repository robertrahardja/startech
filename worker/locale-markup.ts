// Locale in the served HTML.
// The app is a single-page application: one index.html is served for every
// route, and React sets <html lang> and the hreflang links after it boots.
// Crawlers and screen readers read the markup as delivered, so without this
// every translated page is announced as English. HTMLRewriter patches the
// response as it streams, so the cost is negligible and the client-side code
// stays unchanged (it simply sets the same values again).

const SITE = "https://startech-innovation.com";

/** Locale prefixes, and the BCP 47 tag each one is announced as. */
const HTML_LANG: Record<string, string> = {
  ja: "ja",
  ko: "ko",
  "zh-Hans": "zh-Hans",
  "zh-Hant": "zh-Hant",
  es: "es",
  pt: "pt",
};

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

export function withLocaleMarkup(response: Response, pathname: string): Response {
  const locale = localeFromPath(pathname);
  const route = routeWithoutLocale(pathname);

  const alternates = ["en", ...Object.keys(HTML_LANG)].map((code) => {
    const href = code === "en" ? `${SITE}${route}` : `${SITE}/${code}${route}`;
    const tag = code === "en" ? "en" : HTML_LANG[code];
    return `<link rel="alternate" hreflang="${tag}" href="${href}">`;
  });

  // x-default points at the unprefixed route, which serves English.
  alternates.push(
    `<link rel="alternate" hreflang="x-default" href="${SITE}${route}">`
  );

  let rewriter = new HTMLRewriter()
    .on("html", {
      element(el) {
        el.setAttribute("lang", locale === "en" ? "en" : HTML_LANG[locale]);
      },
    })
    .on("head", {
      element(el) {
        el.append(alternates.join(""), { html: true });
      },
    });

  const transformed = rewriter.transform(response);
  return pathname === "/" ? transformed : stripPrerenderedContent(transformed);
}
