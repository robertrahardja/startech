/**
 * The languages the site is published in.
 *
 * English is the default and lives at the root; every other locale sits under
 * its own path prefix so each one is separately indexable and shareable.
 * BCP 47 tags throughout — `zh-Hans` and `zh-Hant` rather than `zh-CN`/`zh-TW`,
 * because the split is script, not country: Simplified serves the mainland and
 * Singapore, Traditional serves Taiwan and Hong Kong.
 */

export const LOCALES = [
  "en",
  "ja",
  "ko",
  "zh-Hans",
  "zh-Hant",
  "es",
  "pt",
] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

interface LocaleMeta {
  /** Shown in the language switcher, in that language. */
  label: string;
  /** `lang` attribute and hreflang value. */
  htmlLang: string;
  /** Short code for the switcher trigger. */
  short: string;
}

export const LOCALE_META: Record<Locale, LocaleMeta> = {
  en: { label: "English", htmlLang: "en", short: "EN" },
  ja: { label: "日本語", htmlLang: "ja", short: "JA" },
  ko: { label: "한국어", htmlLang: "ko", short: "KO" },
  "zh-Hans": { label: "简体中文", htmlLang: "zh-Hans", short: "简" },
  "zh-Hant": { label: "繁體中文", htmlLang: "zh-Hant", short: "繁" },
  es: { label: "Español", htmlLang: "es", short: "ES" },
  pt: { label: "Português", htmlLang: "pt", short: "PT" },
};

/** True when the string is one of the published locales. */
function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/**
 * Splits a pathname into its locale and the route beneath it.
 * `/ja/solutions` → `{ locale: "ja", path: "/solutions" }`
 * `/solutions`    → `{ locale: "en", path: "/solutions" }`
 */
export function parseLocalePath(pathname: string): {
  locale: Locale;
  path: string;
} {
  const [, first = "", ...rest] = pathname.split("/");

  if (isLocale(first) && first !== DEFAULT_LOCALE) {
    return { locale: first, path: "/" + rest.join("/") };
  }

  return { locale: DEFAULT_LOCALE, path: pathname };
}

/** Builds a URL for a route in a given locale. English keeps the bare path. */
export function localePath(locale: Locale, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return locale === DEFAULT_LOCALE ? clean : `/${locale}${clean}`;
}

/**
 * The visitor's best-guess locale from their browser, used only to offer a
 * switch — never to redirect. An automatic redirect strands anyone whose
 * browser language differs from what they want to read, and hides the English
 * page from search crawlers.
 */
export function detectLocale(): Locale | null {
  if (typeof navigator === "undefined") return null;

  for (const tag of navigator.languages ?? []) {
    const lower = tag.toLowerCase();

    if (lower.startsWith("ja")) return "ja";
    if (lower.startsWith("ko")) return "ko";
    if (lower.startsWith("es")) return "es";
    if (lower.startsWith("pt")) return "pt";

    if (lower.startsWith("zh")) {
      // Hant is signalled by script subtag or by the TW/HK/MO regions.
      return /hant|tw|hk|mo/.test(lower) ? "zh-Hant" : "zh-Hans";
    }
  }

  return null;
}

/**
 * Japanese and Chinese set text solid — no spaces between words. Korean is
 * NOT in this group: 띄어쓰기 means Korean does space its words, and removing
 * them makes the text hard to parse, so `ko` keeps normal spacing.
 */
export function setsSolid(locale: Locale): boolean {
  return locale === "ja" || locale.startsWith("zh");
}

/** The sentence-ending mark for a locale. */
export function fullStop(locale: Locale): string {
  if (locale === "ja" || locale.startsWith("zh")) return "。";
  return ".";
}
