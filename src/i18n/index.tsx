import { createContext, useContext, useEffect, useMemo } from "react";
import type { ReactNode } from "react";
import { en } from "./en";
import type { Messages } from "./en";
import { ja } from "./ja";
import { ko } from "./ko";
import { zhHans } from "./zh-Hans";
import { zhHant } from "./zh-Hant";
import { es } from "./es";
import { pt } from "./pt";
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_META,
  localePath,
  parseLocalePath,
  type Locale,
} from "./locales";

const SITE = "https://startech-innovation.com";

const CATALOGUES: Record<Locale, Messages> = {
  en,
  ja,
  ko,
  "zh-Hans": zhHans,
  "zh-Hant": zhHant,
  es,
  pt,
};

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
      t: CATALOGUES[locale],
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
