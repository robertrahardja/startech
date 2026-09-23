import { useEffect, useRef } from "react";
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
    <section className="relative py-20 sm:py-24">
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

/** Matches the feel of the springs this used to import from `motion`. */
const SPRING_STIFFNESS = 200;
const SPRING_DAMPING = 15;
/** How far the button leans toward the pointer, as a fraction of the offset. */
const MAGNET_STRENGTH = 0.2;
/** Below this, the spring has visually settled and the loop can stop. */
const REST_EPSILON = 0.01;

/**
 * The download CTA — a real <a href> (not a route, it leaves the SPA), with
 * the same magnetic-hover feel as the showcase's CTA but built for a link
 * rather than a click handler, since MagneticCta's onClick-only shape is
 * scoped to that section by design.
 *
 * The spring is integrated by hand rather than with `motion`'s useSpring.
 * This component was the only place in the shipped app importing `motion`,
 * and that one import produced a 129KB chunk (42KB gzip) — roughly half the
 * size of the entire main bundle — to animate two translations on a single
 * button. The loop below runs only while the button is actually settling,
 * writes straight to the transform, and keeps the dependency out of the
 * build entirely.
 */
function DeckDownloadButton({ href, label }: { href: string; label: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  /** Live spring state, kept in a ref so animating never triggers a render. */
  const state = useRef({ x: 0, y: 0, vx: 0, vy: 0, tx: 0, ty: 0 });
  const frame = useRef(0);

  // Respect a reduced-motion preference: read once per interaction rather
  // than per frame, and simply don't animate when it's set.
  const prefersReducedMotion = useRef(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotion.current = query.matches;

    const onChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches;
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // Stop any in-flight loop when the button goes away.
  useEffect(() => {
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  const tick = () => {
    const s = state.current;
    const element = ref.current;
    if (!element) {
      frame.current = 0;
      return;
    }

    // Semi-implicit Euler at a fixed step. A fixed step (rather than the
    // real frame delta) keeps the spring stable if a frame is ever long,
    // which matters more here than exact time-accuracy for a 200ms nudge.
    const dt = 1 / 60;
    s.vx += (-SPRING_STIFFNESS * (s.x - s.tx) - SPRING_DAMPING * s.vx) * dt;
    s.vy += (-SPRING_STIFFNESS * (s.y - s.ty) - SPRING_DAMPING * s.vy) * dt;
    s.x += s.vx * dt;
    s.y += s.vy * dt;

    const settled =
      Math.abs(s.x - s.tx) < REST_EPSILON &&
      Math.abs(s.y - s.ty) < REST_EPSILON &&
      Math.abs(s.vx) < REST_EPSILON &&
      Math.abs(s.vy) < REST_EPSILON;

    if (settled) {
      s.x = s.tx;
      s.y = s.ty;
      s.vx = 0;
      s.vy = 0;
    }

    // Clearing the transform outright at rest (rather than leaving a
    // translate3d of ~0) drops the compositor layer the button would
    // otherwise keep for the life of the page.
    element.style.transform =
      s.x === 0 && s.y === 0 ? "" : `translate3d(${s.x}px, ${s.y}px, 0)`;

    frame.current = settled ? 0 : requestAnimationFrame(tick);
  };

  const start = () => {
    if (!frame.current) frame.current = requestAnimationFrame(tick);
  };

  return (
    <a
      ref={ref}
      href={href}
      onPointerMove={(e) => {
        // Coarse pointers don't hover, so there's no magnet to apply —
        // and on touch this would fire mid-tap and shift the target.
        if (e.pointerType !== "mouse" || prefersReducedMotion.current) return;
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        state.current.tx = (e.clientX - (r.left + r.width / 2)) * MAGNET_STRENGTH;
        state.current.ty = (e.clientY - (r.top + r.height / 2)) * MAGNET_STRENGTH;
        start();
      }}
      onPointerLeave={() => {
        state.current.tx = 0;
        state.current.ty = 0;
        start();
      }}
      className="relative inline-flex items-center overflow-hidden rounded-lg border border-st-gold/30 bg-st-gold/15 px-5 py-2.5 text-[13px] font-normal tracking-wide text-st-gold-light transition-colors duration-500 hover:bg-st-gold/25 hover:border-st-gold/50"
    >
      {label}
    </a>
  );
}
