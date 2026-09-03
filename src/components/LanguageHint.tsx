import { useEffect, useState } from "react";
import { useI18n } from "../i18n";
import {
  DEFAULT_LOCALE,
  LOCALE_META,
  detectLocale,
  localePath,
  parseLocalePath,
  type Locale,
} from "../i18n/locales";

const DISMISSED_KEY = "startech-lang-hint-dismissed";

/**
 * Offers the visitor their browser's language, once.
 *
 * Deliberately an offer and not a redirect. Automatically sending someone to a
 * translated page strands anyone whose browser language differs from what they
 * want to read — common for expatriates and for anyone on a shared machine —
 * and it hides the English page from crawlers, which request pages without a
 * meaningful Accept-Language.
 *
 * Shown only when the detected language differs from the page being viewed,
 * and never again once dismissed.
 */
export default function LanguageHint() {
  const { locale } = useI18n();
  const [suggested, setSuggested] = useState<Locale | null>(null);

  useEffect(() => {
    // Only offer on the default locale: if someone is already reading a
    // translation, they have chosen, and second-guessing that is noise.
    if (locale !== DEFAULT_LOCALE) return;

    try {
      if (localStorage.getItem(DISMISSED_KEY)) return;
    } catch {
      // Private browsing can throw on access; treat it as not dismissed.
    }

    const detected = detectLocale();
    if (detected && detected !== locale) setSuggested(detected);
  }, [locale]);

  if (!suggested) return null;

  const { path } = parseLocalePath(window.location.pathname);

  const dismiss = () => {
    try {
      localStorage.setItem(DISMISSED_KEY, "1");
    } catch {
      // Nothing to do — the banner simply reappears next visit.
    }
    setSuggested(null);
  };

  return (
    <div className="fixed inset-x-0 top-[72px] z-40 flex justify-center px-4">
      <div className="flex items-center gap-4 rounded-xl border border-st-border bg-st-bg-card px-4 py-2.5 shadow-lg">
        <a
          href={localePath(suggested, path)}
          hrefLang={LOCALE_META[suggested].htmlLang}
          onClick={dismiss}
          className="text-[13px] font-medium text-st-blue-light hover:underline"
        >
          {LOCALE_META[suggested].label}
        </a>
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="flex h-8 w-8 items-center justify-center text-st-text-muted transition-colors hover:text-st-text"
        >
          <svg
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
