import { useState, useEffect } from "react";
import AiIcon from "./AiIcon";
import Link from "./solutions/Link";

interface NavProps {
  onAskAi: () => void;
}

const NAV_LINKS = [
  { label: "Products", href: "/#products" },
  { label: "Solutions", href: "/solutions" },
  { label: "AI", href: "/#ai-capabilities" },
  { label: "Industries", href: "/#industries" },
  { label: "Approach", href: "/#approach" },
  { label: "Contact", href: "/#contact" },
];

export default function Nav({ onAskAi }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Mobile fullscreen menu — z-60 to sit above everything including floating button */}
      {mobileOpen && (
        <div
          className="fixed inset-0 flex flex-col bg-st-bg md:hidden"
          style={{ zIndex: 60 }}
        >
          {/* Top bar with close */}
          <div className="flex items-center justify-end px-6 py-5">
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="flex h-11 w-11 items-center justify-center rounded-md"
            >
              <svg className="h-4 w-4 text-st-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Logo + Links — centered */}
          <div className="flex flex-1 flex-col items-center justify-center gap-8">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="mb-4 flex items-center justify-center"
            >
              <img
                src="/assets/startech-logo-full.png"
                alt="StarTech Innovation"
                className="h-32 w-auto"
              />
            </Link>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-display text-2xl text-white transition-colors duration-300 hover:text-st-text-muted"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 h-px w-12 bg-white/10" />
            <button
              onClick={() => {
                setMobileOpen(false);
                onAskAi();
              }}
              className="hero-btn-primary group relative overflow-hidden rounded-xl px-6 py-3 text-[13px] font-light tracking-wide text-white transition-all duration-500"
            >
              <span className="relative z-10 flex items-center gap-2.5">
                <AiIcon className="h-3.5 w-3.5 text-st-gold-light" />
                Ask us
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Header bar */}
      <header
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? "nav-blur border-b border-st-border bg-st-bg/80"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-8">
          <Link
            href="/"
            className="hidden min-h-[44px] min-w-[44px] items-center md:flex"
          >
            <img
              src="/assets/startech-logo-full.png"
              alt="StarTech Innovation"
              className="h-7 w-auto opacity-70 transition-opacity duration-300 hover:opacity-90 lg:h-9"
            />
          </Link>

          {/* Desktop */}
          <div className="hidden items-center gap-1 md:flex">
            <div className="nav-shimmer-wrap flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-shimmer-link rounded-md px-4 py-2 text-sm font-light tracking-wide transition-colors duration-300 lg:text-base"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="ask-us-glow relative ml-4 rounded-xl">
              <button
                onClick={onAskAi}
                className="hero-btn-primary group relative overflow-hidden rounded-xl px-5 py-2.5 text-sm font-light tracking-wide text-st-text-muted transition-all duration-500 hover:text-white lg:text-base"
              >
                <span className="ask-us-text-shimmer relative z-10 flex items-center gap-2">
                  <AiIcon className="h-3 w-3 text-st-gold-light transition-all duration-500 group-hover:text-st-gold" />
                  Ask us
                </span>
              </button>
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="ml-auto flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-md md:hidden"
          >
            <span className="block h-px w-4 bg-st-text-muted/60" />
            <span className="block h-px w-4 bg-st-text-muted/60" />
            <span className="block h-px w-4 bg-st-text-muted/60" />
          </button>
        </nav>
      </header>
    </>
  );
}
