import { useEffect, useState } from "react";

/**
 * What the bar says over each section. The line and the button both change,
 * so a reader scrolling the page is not shown one identical ask six times.
 */
const BY_SECTION: Record<string, { line: string; action: string }> = {
  fit: {
    line: "Not sure which one is you? That is worth working out together.",
    action: "Talk it through",
  },
  work: {
    line: "Every number here can be walked through in detail, bugs included.",
    action: "Ask about any of it",
  },
  products: {
    line: "Most engagements start in one practice and grow into a second.",
    action: "Start with one",
  },
  industries: {
    line: "Your sector not listed? The shape of the problem usually rhymes.",
    action: "Tell us about yours",
  },
  approach: {
    line: "Week one is discovery, and the output is yours either way.",
    action: "Start a conversation",
  },
  objections: {
    line: "If your question is not on the list, ask it directly.",
    action: "Ask us directly",
  },
};

const DEFAULT_COPY = {
  line: "Thirty minutes on your process, and a clear view of what to build first.",
  action: "Let's talk",
};

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
  const [section, setSection] = useState<string | null>(null);

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

    // Whichever tracked section covers the middle of the viewport is the one
    // the reader is on; the bar speaks to that.
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setSection(entry.target.id);
        }
      },
      { threshold: 0, rootMargin: "-45% 0px -45% 0px" }
    );

    for (const id of Object.keys(BY_SECTION)) {
      const el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    }

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
      sectionObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    onVisibilityChange?.(visible);
  }, [visible, onVisibilityChange]);

  const copy = (section && BY_SECTION[section]) || DEFAULT_COPY;

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
        <div className="sticky-cta flex items-center justify-center gap-4 rounded-2xl p-3 sm:justify-between sm:px-6 sm:py-4">
          {/* Copy only where there is room for it. On a phone the button
              already carries the offer, and a squeezed line beside it just
              crowds the bar. */}
          <p
            key={copy.line}
            className="hidden animate-fade-in text-[13.5px] leading-snug text-st-text-muted sm:block"
          >
            {copy.line}
          </p>

          <a
            href="#contact"
            tabIndex={visible ? 0 : -1}
            className="hero-btn-primary group relative flex min-h-[46px] w-full items-center justify-center overflow-hidden rounded-xl px-5 text-[14px] font-medium tracking-wide text-white transition-all duration-500 active:scale-[0.97] sm:w-auto sm:flex-none sm:px-6 sm:text-[13px]"
          >
            <span key={copy.action} className="relative z-10 flex items-center gap-2">
              {copy.action}
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
