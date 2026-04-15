import Link from "./solutions/Link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-st-border">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
          <div className="flex flex-col items-center gap-3 sm:items-start">
            <img
              src="/assets/startech-logo-full.png"
              alt="StarTech Innovation"
              className="h-6 w-auto opacity-50"
            />
            <p className="text-center text-[11px] font-light leading-relaxed text-st-text-muted sm:text-left">
              Singapore
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-1 text-[11px] font-light tracking-wide text-st-text-muted">
            <Link href="/#products" className="inline-flex min-h-[44px] items-center px-3 transition-colors duration-300 hover:text-st-text-muted">
              Products
            </Link>
            <Link href="/solutions" className="inline-flex min-h-[44px] items-center px-3 transition-colors duration-300 hover:text-st-text-muted">
              Solutions
            </Link>
            <Link href="/#ai-capabilities" className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center px-3 transition-colors duration-300 hover:text-st-text-muted">
              AI
            </Link>
            <Link href="/#industries" className="inline-flex min-h-[44px] items-center px-3 transition-colors duration-300 hover:text-st-text-muted">
              Industries
            </Link>
            <Link href="/#contact" className="inline-flex min-h-[44px] items-center px-3 transition-colors duration-300 hover:text-st-text-muted">
              Contact
            </Link>
          </div>

          <div className="text-center text-[11px] font-light text-st-text-muted sm:text-right">
            <a
              href="mailto:info@startech-innovation.com"
              className="inline-flex min-h-[44px] items-center transition-colors duration-300 hover:text-st-text-muted"
            >
              info@startech-innovation.com
            </a>
          </div>
        </div>

        <div className="mt-10 text-center text-[10px] font-light tracking-wide text-st-text-muted/60">
          &copy; {year} StarTech Innovation Pte. Ltd.
        </div>
      </div>
    </footer>
  );
}
