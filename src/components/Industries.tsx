import { useState } from "react";
import { useI18n } from "../i18n";
import { useInView } from "../hooks/useInView";
import { SectionHeader } from "./Products";
import ExpandedDetailCard from "./ExpandedDetailCard";

import type { Messages } from "../i18n/en";

type Industry = Messages["industries"]["items"][number];

export default function Industries() {
  const { t } = useI18n();
  const [expanded, setExpanded] = useState<Industry | null>(null);

  return (
    <section id="industries" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeader
          label={t.industries.eyebrow}
          title={t.industries.title}
          subtitle="Deep understanding of your industry's regulatory, operational, and technical requirements."
        />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {t.industries.items.map((industry, i) => (
            <IndustryCard key={industry.name} industry={industry} index={i} onExpand={setExpanded} />
          ))}
        </div>
      </div>

      {expanded && (
        <ExpandedDetailCard
          title={expanded.name}
          description={expanded.description}
          details={expanded.details}
          onClose={() => setExpanded(null)}
        />
      )}
    </section>
  );
}

function IndustryCard({
  industry,
  index,
  onExpand,
}: {
  industry: Industry;
  index: number;
  onExpand: (ind: Industry) => void;
}) {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  const hasDetails = industry.details && industry.details.length > 0;

  return (
    <div
      ref={ref}
      className={`product-card ${isInView ? "reveal visible" : "reveal"}`}
      style={{ transitionDelay: `${index * 80}ms` }}
      onClick={hasDetails ? () => onExpand(industry) : undefined}
    >
      <div className="card group relative cursor-pointer overflow-hidden rounded-xl p-6 sm:p-7">
        <div className="relative z-10 flex h-full flex-col">
          <h3 className="mb-2 text-sm font-medium tracking-wide text-st-text md:text-base">
            {industry.name}
          </h3>
          <p className="flex-1 text-sm font-normal leading-[1.7] text-st-text-muted">
            {industry.description}
          </p>
          {hasDetails && (
            <div className="mt-4 flex items-center justify-end">
              <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-st-text-muted/40 transition-colors duration-300 group-hover:text-st-gold-light/60">
                Details →
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
