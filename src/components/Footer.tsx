import Link from "./solutions/Link";
import { useI18n } from "../i18n";

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
            <Link href="/#products" className="transition-colors duration-300 hover:text-st-text">
              {t.nav.practices}
            </Link>
            <Link href="/solutions" className="transition-colors duration-300 hover:text-st-text">
              {t.nav.solutions}
            </Link>
            <Link href="/#work" className="transition-colors duration-300 hover:text-st-text">
              {t.nav.work}
            </Link>
            <Link href="/#industries" className="transition-colors duration-300 hover:text-st-text">
              {t.nav.industries}
            </Link>
            <Link href="/#contact" className="transition-colors duration-300 hover:text-st-text">
              {t.nav.contact}
            </Link>
          </div>

          <div className="text-center text-[11px] font-medium text-st-text-muted sm:text-right">
            <a
              href="mailto:info@startech-innovation.com"
              className="transition-colors duration-300 hover:text-st-text"
            >
              info@startech-innovation.com
            </a>
          </div>
        </div>

        <div className="mt-8 text-center text-[11px] font-medium tracking-wide text-st-text-muted/80 sm:mt-10">
          &copy; {year} {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}
