/**
 * /sitemap.xml: every page search engines should list, in every language.
 * Built from the same route table the app uses, so a new demo appears here
 * without anyone remembering to add it. robots.txt points crawlers at it.
 */

import { INDEXED_ROUTES } from "../src/lib/pageMeta";
import { LOCALE_CODES, localeUrl } from "./locale-markup";

export function sitemapResponse(): Response {
  const urls = LOCALE_CODES.flatMap((locale) => INDEXED_ROUTES.map((route) => localeUrl(locale, route)));
  const body =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.map((u) => `  <url><loc>${u}</loc></url>\n`).join("") +
    "</urlset>\n";
  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
