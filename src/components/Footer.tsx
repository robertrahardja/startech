import Link from "./solutions/Link";
import { useI18n } from "../i18n";

export default function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-st-border">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
          <div className="flex flex-col items-center gap-3 sm:items-start">
            <img
              src="/assets/startech-logo-full.svg"
              alt="StarTech Innovation"
              className="h-6 w-auto opacity-70"
            />
            <p className="text-center text-[11px] font-medium leading-relaxed text-st-text-muted sm:text-left">
              {t.footer.location}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-1 text-[11px] font-medium tracking-wide text-st-text-muted">
            <Link href="/#products" className="inline-flex min-h-[44px] items-center px-3 transition-colors duration-300 hover:text-st-text">
              {t.nav.practices}
            </Link>
            <Link href="/solutions" className="inline-flex min-h-[44px] items-center px-3 transition-colors duration-300 hover:text-st-text">
              {t.nav.solutions}
            </Link>
            <Link href="/#work" className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center px-3 transition-colors duration-300 hover:text-st-text">
              {t.nav.work}
            </Link>
            <Link href="/#industries" className="inline-flex min-h-[44px] items-center px-3 transition-colors duration-300 hover:text-st-text">
              {t.nav.industries}
            </Link>
            <Link href="/#contact" className="inline-flex min-h-[44px] items-center px-3 transition-colors duration-300 hover:text-st-text">
              {t.nav.contact}
            </Link>
          </div>

          <div className="text-center text-[11px] font-medium text-st-text-muted sm:text-right">
            <a
              href="mailto:info@startech-innovation.com"
              className="inline-flex min-h-[44px] items-center transition-colors duration-300 hover:text-st-text"
            >
              info@startech-innovation.com
            </a>
          </div>
        </div>

        <div className="mt-10 text-center text-[10px] font-medium tracking-wide text-st-text-muted/60">
          &copy; {year} {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}
