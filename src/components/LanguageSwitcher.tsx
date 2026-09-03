import { useEffect, useRef, useState } from "react";
import { useI18n } from "../i18n";
import {
  LOCALES,
  LOCALE_META,
  localePath,
  parseLocalePath,
} from "../i18n/locales";

/**
 * Language list for the mobile menu.
 *
 * A dropdown is the wrong shape inside a full-screen menu: it opens over the
 * items beneath it, and the menu's own scroll container clips it. The sheet
 * has room, so the languages are simply laid out as a row of choices.
 */
export function LanguageRow() {
  const { locale } = useI18n();
  const { path } = parseLocalePath(window.location.pathname);

  return (
    <nav aria-label="Language" className="flex flex-wrap justify-center gap-x-1 gap-y-1 px-6">
      {LOCALES.map((code) => (
        <a
          key={code}
          href={localePath(code, path)}
          hrefLang={LOCALE_META[code].htmlLang}
          aria-current={code === locale ? "true" : undefined}
          className={`flex min-h-[44px] items-center rounded-lg px-3 text-[13px] transition-colors duration-200 ${
            code === locale
              ? "text-st-blue-light"
              : "text-st-text-muted active:text-st-text"
          }`}
        >
          {LOCALE_META[code].label}
        </a>
      ))}
    </nav>
  );
}

/**
 * Language menu.
 *
 * Switching keeps the visitor where they are: the current route is preserved
 * and only the locale prefix changes, so someone reading /solutions in English
 * lands on /ja/solutions rather than being dropped at the homepage.
 *
 * Each option is a real anchor, so it can be opened in a new tab, and search
 * crawlers can follow it — a button with an onClick would be invisible to both.
 */
export default function LanguageSwitcher({
  className = "",
}: {
  className?: string;
}) {
  const { locale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // The route beneath the current locale, so the switch preserves the page.
  const { path } = parseLocalePath(window.location.pathname);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={t.nav.language}
        className="flex min-h-[44px] items-center gap-1.5 px-2 text-[12px] font-medium tracking-wide text-st-text-muted transition-colors duration-300 hover:text-st-text"
      >
        <svg
          className="h-3.5 w-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.95 8.95 0 0 0 3.6-7.5A8.95 8.95 0 0 0 12 3m0 18a8.95 8.95 0 0 1-3.6-7.5A8.95 8.95 0 0 1 12 3M3.6 9h16.8M3.6 15h16.8"
          />
        </svg>
        {LOCALE_META[locale].short}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 min-w-[10rem] overflow-hidden rounded-xl border border-st-border bg-st-bg-card py-1 shadow-lg"
        >
          {LOCALES.map((code) => (
            <a
              key={code}
              href={localePath(code, path)}
              hrefLang={LOCALE_META[code].htmlLang}
              role="menuitem"
              aria-current={code === locale}
              className={`flex min-h-[44px] items-center px-4 text-[13px] transition-colors duration-200 ${
                code === locale
                  ? "text-st-blue-light"
                  : "text-st-text-muted hover:bg-st-surface hover:text-st-text"
              }`}
            >
              {LOCALE_META[code].label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
