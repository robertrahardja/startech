import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useI18n } from "../i18n";
import { useInView } from "../hooks/useInView";
import ConicBorderCard from "./showcase/ConicBorderCard";

/**
 * The one download this page most wants a visitor to leave with. Reuses the
 * showcase's conic-border treatment — per that component's own guidance,
 * rotating motion is reserved for a single hero moment, and this section is
 * exactly that: one card, not a grid. The card itself stays plain — no icon,
 * a small button — the border carries the emphasis so the ask stays modest.
 */
export default function CapabilityDeck() {
  const { t, locale } = useI18n();
  const [ref, isInView] = useInView({ threshold: 0.2 });

  return (
    <section id="capability-deck" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div
          ref={ref}
          className={`mx-auto max-w-3xl text-center ${isInView ? "reveal visible" : "reveal"}`}
        >
          <span className="mb-3 inline-block text-[10px] font-medium tracking-[0.2em] uppercase text-st-gold-light/80">
            {t.capabilityDeck.eyebrow}
          </span>
          <h2 className="mb-4 font-display text-2xl tracking-[-0.02em] text-st-text sm:text-3xl md:text-5xl">
            {t.capabilityDeck.title}
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-balance text-[15px] font-normal leading-[1.7] text-st-text-muted md:text-base">
            {t.capabilityDeck.sub}
          </p>

          <ConicBorderCard className="mx-auto max-w-xl">
            <div className="relative flex flex-col items-center overflow-hidden rounded-[inherit] px-8 py-8 sm:px-12">
              {/* One-shot light sweep, not a loop — plays once when the card
                  first comes into view, like glass catching light. */}
              <div
                aria-hidden="true"
                className={`deck-shine pointer-events-none absolute inset-0 ${isInView ? "deck-shine-play" : ""}`}
              />
              <DeckDownloadButton
                href={`/assets/startech-capability-deck-${locale}.pdf`}
                label={t.capabilityDeck.cta}
              />
            </div>
          </ConicBorderCard>
        </div>
      </div>
    </section>
  );
}

/**
 * The download CTA — a real <a href> (not a route, it leaves the SPA), with
 * the same magnetic-hover feel as the showcase's CTA but built for a link
 * rather than a click handler, since MagneticCta's onClick-only shape is
 * scoped to that section by design.
 */
function DeckDownloadButton({ href, label }: { href: string; label: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x, y }}
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * 0.2);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.2);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="relative inline-flex items-center overflow-hidden rounded-lg border border-st-gold/30 bg-st-gold/15 px-5 py-2.5 text-[13px] font-normal tracking-wide text-st-gold-light transition-colors duration-500 hover:bg-st-gold/25 hover:border-st-gold/50"
    >
      {label}
    </motion.a>
  );
}
