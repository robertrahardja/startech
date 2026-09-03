import { createContext, useContext, useEffect, useMemo } from "react";
import type { ReactNode } from "react";
import { en } from "./en";
import type { Messages } from "./en";
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_META,
  localePath,
  parseLocalePath,
  type Locale,
} from "./locales";

const SITE = "https://startech-innovation.com";

/**
 * Catalogue loaders.
 *
 * All seven used to be imported statically, so every visitor downloaded
 * roughly 160KB of translations to read one language. Each non-English
 * catalogue is now its own chunk, fetched before the first render by
 * loadCatalogue() below — the locale is known from the URL at startup, so
 * there is no loading state and no flash of English.
 *
 * English stays static: it is the default, and the app must be able to render
 * without waiting on a network request.
 */
const LOADERS: Record<Exclude<Locale, "en">, () => Promise<Messages>> = {
  ja: () => import("./ja").then((m) => m.ja),
  ko: () => import("./ko").then((m) => m.ko),
  "zh-Hans": () => import("./zh-Hans").then((m) => m.zhHans),
  "zh-Hant": () => import("./zh-Hant").then((m) => m.zhHant),
  es: () => import("./es").then((m) => m.es),
  pt: () => import("./pt").then((m) => m.pt),
};

/** Catalogues resolved so far. English is always available. */
const CATALOGUES: Partial<Record<Locale, Messages>> = { en };

/**
 * Resolves one locale's strings, caching the result. Call before rendering:
 * the provider reads synchronously and falls back to English if a catalogue
 * is somehow missing, which would otherwise show English under a translated
 * URL.
 */
export async function loadCatalogue(locale: Locale): Promise<void> {
  if (CATALOGUES[locale]) return;
  const load = LOADERS[locale as Exclude<Locale, "en">];
  if (!load) return;
  try {
    CATALOGUES[locale] = await load();
  } catch {
    // A failed chunk should degrade to English, not a blank page.
  }
}

interface I18nValue {
  locale: Locale;
  /** The strings for the active locale. */
  t: Messages;
  /** Rewrites a path into the active locale. */
  path: (to: string) => string;
}

const I18nContext = createContext<I18nValue>({
  locale: DEFAULT_LOCALE,
  t: en,
  path: (to) => to,
});

export function I18nProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  // Screen readers and search engines both need the document to declare which
  // language it is actually in, not the language it was built in.
  useEffect(() => {
    document.documentElement.lang = LOCALE_META[locale].htmlLang;
  }, [locale]);

  // hreflang tells search engines that these URLs are the same page in
  // different languages, so they rank the right one per audience instead of
  // treating the set as duplicate content. Rebuilt on navigation because the
  // route beneath the locale changes too.
  useEffect(() => {
    const managed = document.querySelectorAll("link[data-i18n-alt]");
    managed.forEach((el) => el.remove());

    const { path } = parseLocalePath(window.location.pathname);

    const add = (hrefLang: string, href: string) => {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = hrefLang;
      link.href = href;
      link.setAttribute("data-i18n-alt", "");
      document.head.appendChild(link);
    };

    for (const code of LOCALES) {
      add(LOCALE_META[code].htmlLang, SITE + localePath(code, path));
    }
    // The fallback for any language we do not publish.
    add("x-default", SITE + localePath(DEFAULT_LOCALE, path));
  }, [locale]);

  const value = useMemo<I18nValue>(
    () => ({
      locale,
      t: CATALOGUES[locale] ?? en,
      path: (to: string) => localePath(locale, to),
    }),
    [locale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

/** Strings and locale-aware paths for the current language. */
export function useI18n(): I18nValue {
  return useContext(I18nContext);
}
