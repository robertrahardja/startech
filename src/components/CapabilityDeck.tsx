import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useI18n } from "../i18n";
import { useInView } from "../hooks/useInView";
import ConicBorderCard from "./showcase/ConicBorderCard";

/**
 * The one download this page most wants a visitor to leave with: everything
 * above, in a document built for forwarding to whoever else needs to sign
 * off. Reuses the showcase's conic-border treatment — per that component's
 * own guidance, rotating motion is reserved for a single hero moment, and
 * this section is exactly that: one card, not a grid.
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
            <div className="flex flex-col items-center gap-6 px-8 py-10 sm:px-12">
              <DeckIcon />
              <DeckDownloadButton
                href={`/assets/startech-capability-deck-${locale}.pdf`}
                label={t.capabilityDeck.cta}
              />
              <p className="text-[11px] font-normal tracking-wide text-st-text-muted/70">
                {t.capabilityDeck.meta}
              </p>
            </div>
          </ConicBorderCard>
        </div>
      </div>
    </section>
  );
}

function DeckIcon() {
  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-st-gold/30 bg-st-gold/10">
      <svg
        className="h-7 w-7 text-st-gold-light"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
        />
      </svg>
    </div>
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
      className="relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl border border-st-gold/30 bg-st-gold/15 px-7 py-4 text-[14px] font-normal tracking-wide text-st-gold-light transition-colors duration-500 hover:bg-st-gold/25 hover:border-st-gold/50"
    >
      <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
        />
      </svg>
      {label}
    </motion.a>
  );
}
