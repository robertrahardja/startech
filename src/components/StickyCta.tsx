import { useEffect, useState } from "react";

interface StickyCtaProps {
  /** Reported to the shell so the floating Ask button can step aside. */
  onVisibilityChange?: (visible: boolean) => void;
}

/**
 * A slim bar that follows the reader once the hero has scrolled away.
 *
 * Sections run 900–2300px tall, so their closing call to action sits below
 * the fold on almost every laptop — and a visitor arriving on a deep link
 * like /#products may never scroll far enough to reach one. This keeps the
 * ask in reach without moving it above the content it is meant to follow.
 *
 * Hidden while the hero is on screen, where the real buttons already are,
 * and hidden again at the contact form, where it would cover the thing it
 * points at.
 */
export default function StickyCta({ onVisibilityChange }: StickyCtaProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const contact = document.getElementById("contact");
    if (!hero || !contact) return;

    let heroGone = false;
    let atContact = false;
    const apply = () => setVisible(heroGone && !atContact);

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        heroGone = !entry.isIntersecting;
        apply();
      },
      { threshold: 0, rootMargin: "-120px 0px 0px 0px" }
    );

    const contactObserver = new IntersectionObserver(
      ([entry]) => {
        atContact = entry.isIntersecting;
        apply();
      },
      { threshold: 0, rootMargin: "0px 0px -25% 0px" }
    );

    heroObserver.observe(hero);
    contactObserver.observe(contact);

    // On a deep link the browser scrolls to the anchor after this effect has
    // run, so the observers' first callbacks describe the top of the page
    // rather than where the reader actually landed. Re-check once it settles.
    const settle = window.setTimeout(() => {
      heroGone = hero.getBoundingClientRect().bottom <= 120;
      const rect = contact.getBoundingClientRect();
      atContact = rect.top < window.innerHeight * 0.75 && rect.bottom > 0;
      apply();
    }, 350);

    return () => {
      window.clearTimeout(settle);
      heroObserver.disconnect();
      contactObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    onVisibilityChange?.(visible);
  }, [visible, onVisibilityChange]);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 transition-all duration-500 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-full opacity-0"
      }`}
      aria-hidden={!visible}
    >
      <div className="mx-auto max-w-[1800px] px-4 pb-4 sm:px-8 sm:pb-6">
        <div className="sticky-cta flex items-center justify-between gap-4 rounded-2xl px-5 py-3.5 sm:px-6 sm:py-4">
          <p className="hidden text-[13.5px] leading-snug text-st-text-muted sm:block">
            Thirty minutes, and an honest answer about what is worth building.
          </p>
          <p className="text-[13.5px] leading-snug text-st-text-muted sm:hidden">
            Thirty minutes, no brief needed.
          </p>

          <a
            href="#contact"
            tabIndex={visible ? 0 : -1}
            className="hero-btn-primary group relative flex min-h-[44px] flex-none items-center overflow-hidden rounded-xl px-5 text-[13px] font-medium tracking-wide text-white transition-all duration-500 active:scale-[0.97] sm:px-6"
          >
            <span className="relative z-10 flex items-center gap-2">
              Book the 30 minutes
              <svg
                className="h-3.5 w-3.5 text-white/80 transition-transform duration-500 group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
