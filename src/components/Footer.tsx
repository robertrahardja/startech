import Link from "./solutions/Link";
import { useI18n } from "../i18n";

// StarTech's own accounts (opened 13 Nov 2026, see
// startech_marketing/gtm/channels/social/profiles.md). The profiles link
// back here with ?utm_source=<platform>, so visits from them are measured.
const SOCIAL = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61596311469671",
    path: "M14 7h3V3h-3c-2.8 0-5 2.2-5 5v2H7v4h2v8h4v-8h3l1-4h-4V8c0-.6.4-1 1-1z",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/startechinnovation/",
    path: "M12 7.4a4.6 4.6 0 1 0 0 9.2 4.6 4.6 0 0 0 0-9.2zm0 7.6a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm4.8-8.9a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2zM12 3c-2.4 0-2.7 0-3.7.1-3.2.1-5 1.9-5.2 5.2C3 9.3 3 9.6 3 12s0 2.7.1 3.7c.1 3.2 1.9 5 5.2 5.2 1 .1 1.3.1 3.7.1s2.7 0 3.7-.1c3.2-.1 5-1.9 5.2-5.2.1-1 .1-1.3.1-3.7s0-2.7-.1-3.7c-.1-3.2-1.9-5-5.2-5.2C14.7 3 14.4 3 12 3zm0 1.6c2.4 0 2.6 0 3.6.1 2.4.1 3.5 1.2 3.6 3.6.1 1 .1 1.2.1 3.6s0 2.6-.1 3.6c-.1 2.4-1.2 3.5-3.6 3.6-1 .1-1.2.1-3.6.1s-2.6 0-3.6-.1c-2.4-.1-3.5-1.2-3.6-3.6-.1-1-.1-1.2-.1-3.6s0-2.6.1-3.6c.1-2.4 1.2-3.5 3.6-3.6 1-.1 1.2-.1 3.6-.1z",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@startechinnovation",
    path: "M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4a2.5 2.5 0 0 0-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3L10 15z",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/startech-innovation/",
    path: "M6.9 8.8H3.6V20h3.3V8.8zM5.3 3.5a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8zM20.4 13.6c0-3-.6-5.1-4.1-5.1-1.7 0-2.8.9-3.3 1.8h-.1V8.8H9.8V20h3.3v-5.5c0-1.5.3-2.9 2.1-2.9 1.8 0 1.8 1.7 1.8 3V20h3.3l.1-6.4z",
  },
] as const;

export default function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-st-border">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
          <div className="flex flex-col items-center gap-2.5 sm:items-start">
            <img
              src="/assets/startech-logo-full.svg"
              alt="StarTech Innovation"
              className="h-6 w-auto opacity-70"
            />
            <p className="text-center text-[11px] font-medium leading-relaxed text-st-text-muted sm:text-left">
              {t.footer.location}
            </p>
          </div>

          {/* One wrapped block, not five separately-tall touch targets — a
              footer link doesn't need the same 44px minimum as a primary
              nav item, and giving each one that much height is what forced
              "Contact" onto its own wrapped line with a huge gap around
              it. Tight row/column gaps keep wrapped lines reading as one
              group instead of stray rows. */}
          <div className="flex max-w-[15.5rem] flex-wrap justify-center gap-x-5 gap-y-2 text-[11px] font-medium tracking-wide text-st-text-muted sm:max-w-none sm:justify-start">
            <Link href="/#products" className="inline-flex min-h-[44px] min-w-[44px] items-center transition-colors duration-300 hover:text-st-text">
              {t.nav.practices}
            </Link>
            <Link href="/solutions" className="inline-flex min-h-[44px] min-w-[44px] items-center transition-colors duration-300 hover:text-st-text">
              {t.nav.solutions}
            </Link>
            <Link href="/#work" className="inline-flex min-h-[44px] min-w-[44px] items-center transition-colors duration-300 hover:text-st-text">
              {t.nav.work}
            </Link>
            <Link href="/#industries" className="inline-flex min-h-[44px] min-w-[44px] items-center transition-colors duration-300 hover:text-st-text">
              {t.nav.industries}
            </Link>
            <Link href="/#contact" className="inline-flex min-h-[44px] min-w-[44px] items-center transition-colors duration-300 hover:text-st-text">
              {t.nav.contact}
            </Link>
          </div>

          <div className="text-center text-[11px] font-medium text-st-text-muted sm:text-right">
            <a
              href="mailto:info@startech-innovation.com"
              className="inline-flex min-h-[44px] min-w-[44px] items-center transition-colors duration-300 hover:text-st-text"
            >
              info@startech-innovation.com
            </a>
            <ul className="mt-1 flex justify-center gap-1 sm:justify-end">
              {SOCIAL.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`StarTech Innovation on ${s.name}`}
                    title={s.name}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300 hover:text-st-text"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px] fill-current">
                      <path d={s.path} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center text-[11px] font-medium tracking-wide text-st-text-muted/80 sm:mt-10">
          &copy; {year} {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}
