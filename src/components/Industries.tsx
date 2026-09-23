import { useState } from "react";
import { useI18n } from "../i18n";
import { useInView } from "../hooks/useInView";
import { useSnapRail } from "../hooks/useSnapRail";
import { haptic } from "../lib/haptics";
import { SectionHeader } from "./Products";

import type { Messages } from "../i18n/en";

type Industry = Messages["industries"]["items"][number];

export default function Industries() {
  const { t } = useI18n();
  const { railRef, active, goTo } = useSnapRail(t.industries.items.length);

  return (
    <section id="industries" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeader
          label={t.industries.eyebrow}
          title={t.industries.title}
          subtitle={t.industries.sub}
        />

        {/* One swipeable rail on phones, a grid from sm: up — same pattern
            as Products.tsx, so six near-identical cards don't turn into a
            long stack on mobile. */}
        <div
          ref={railRef}
          className="snap-rail grid-cols-1 gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-3"
        >
          {t.industries.items.map((industry, i) => (
            <div key={industry.name} className="snap-item" data-snap-index={i}>
              <IndustryCard industry={industry} index={i} />
            </div>
          ))}
        </div>

        {/* Position indicator — phones only, where the rail exists. */}
        <div className="mt-4 flex items-center justify-center sm:hidden">
          {t.industries.items.map((industry, i) => (
            <button
              key={industry.name}
              onClick={() => goTo(i)}
              aria-label={industry.name}
              aria-current={i === active}
              className="flex h-11 w-11 items-center justify-center"
            >
              <span className="rail-dot" data-active={i === active} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function IndustryCard({
  industry,
  index,
}: {
  industry: Industry;
  index: number;
}) {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [open, setOpen] = useState(false);

  const hasDetails = industry.details && industry.details.length > 0;

  const toggleOpen = () => {
    haptic("select");
    setOpen((o) => !o);
  };

  return (
    <div
      ref={ref}
      className={`product-card h-full ${isInView ? "reveal visible" : "reveal"}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="card group relative h-full overflow-hidden rounded-xl p-6 sm:p-7">
        <div className="relative z-10 flex h-full flex-col">
          <h3 className="mb-2 text-sm font-medium tracking-wide text-st-text md:text-base">
            {industry.name}
          </h3>
          <p className="flex-1 text-sm font-normal leading-[1.7] text-st-text-muted">
            {industry.description}
          </p>

          {/* Details toggle inline, on the card itself — same pattern as
              Products.tsx: a short bullet list expands in place instead of
              opening a separate modal card. */}
          {hasDetails && (
            <div
              id={`industry-details-${index}`}
              className="grid overflow-hidden transition-[grid-template-rows] duration-[400ms] ease-out"
              style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
            >
              <ul className="min-h-0 space-y-2.5 overflow-hidden">
                <li aria-hidden="true" className="h-3" />
                {industry.details.map((d) => (
                  <li key={d} className="flex gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-[7px] h-1 w-1 flex-none rounded-full bg-st-gold-light/60"
                    />
                    <span className="text-[12.5px] font-normal leading-[1.65] text-st-text-muted/90">
                      {d}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {hasDetails && (
            <div className="mt-4 flex items-center justify-end">
              <button
                type="button"
                aria-expanded={open}
                aria-controls={`industry-details-${index}`}
                onClick={toggleOpen}
                className="pressable flex items-center gap-1 text-[11px] font-medium tracking-[0.15em] uppercase text-st-text-muted/80 transition-colors duration-300 hover:text-st-gold-light"
              >
                {open ? "Hide" : "Details"}
                <span
                  aria-hidden="true"
                  className={`transition-transform duration-300 ${open ? "-rotate-90" : "rotate-90"}`}
                >
                  →
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
