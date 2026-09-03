import { useInView } from "../hooks/useInView";
import { useI18n } from "../i18n";
import type { CaseStudy } from "./caseStudiesData";

function CaseCard({ study, index }: { study: CaseStudy; index: number }) {
  const { t } = useI18n();
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`group reveal-scroll relative border-t border-st-border pt-8 transition-all duration-700 ${
        isInView ? "reveal visible" : "reveal"
      }`}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      {/* Sector / market line */}
      <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-medium tracking-[0.18em] uppercase text-st-text-muted">
        <span className="text-st-blue-light">{study.sector}</span>
        <span className="h-2.5 w-px bg-st-text-muted/30" />
        <span>{study.market}</span>
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
        <div>
          <h3 className="font-display text-2xl leading-[1.25] tracking-[-0.02em] text-st-text md:text-3xl">
            {study.title}
          </h3>

          <div className="mt-6 space-y-5">
            <div>
              <div className="label-in mb-1.5 text-[10px] font-medium tracking-[0.16em] uppercase text-st-pink">
                {t.work.before}
              </div>
              <p className="read-in text-sm font-normal leading-[1.75] text-st-text-muted">
                {study.before}
              </p>
            </div>
            <div>
              <div className="label-in mb-1.5 text-[10px] font-medium tracking-[0.16em] uppercase text-st-blue-light">
                {t.work.built}
              </div>
              <p className="read-in text-sm font-normal leading-[1.75] text-st-text-muted">
                {study.built}
              </p>
            </div>
          </div>
        </div>

        {/* Right rail: the number, then the checkable details */}
        <div className="lg:pt-1">
          {/* The result panel: two columns.

              A figure column sized to its content, and a text column beside
              it carrying the label and the caption. A vertical divider marks
              the split, so the two read as related halves of one panel rather
              than a heading stacked over a number.

              The figure column has a minimum width, so a one-character "2"
              and a five-character "7,060" both anchor the same left edge and
              the text column starts at the same place in every card. */}
          <div className="metric-tile relative flex items-stretch gap-5 overflow-hidden rounded-xl border border-st-border bg-st-bg-card p-5 transition-all duration-500">
            <div className="brand-rule absolute inset-x-0 top-0 h-px" />

            <div className="flex min-w-[4.5rem] shrink-0 items-center justify-center">
              <span className="gradient-text font-display text-5xl leading-none tracking-[-0.03em]">
                {study.metric.figure}
              </span>
            </div>

            <div className="w-px shrink-0 bg-st-border" aria-hidden="true" />

            <div className="flex min-w-0 flex-1 flex-col justify-center py-1">
              <div className="text-[10px] font-medium tracking-[0.18em] uppercase text-st-text-muted/70">
                {t.work.result}
              </div>
              <div className="mt-2 text-[12.5px] font-medium leading-[1.55] text-st-text-muted">
                {study.metric.caption}
              </div>
            </div>
          </div>

          <ul className="mt-5 space-y-3">
            {study.detail.map((d, i) => (
              <li key={i} className="flex gap-2.5">
                <span
                  aria-hidden="true"
                  className="mt-[7px] h-1 w-1 flex-none rounded-full bg-st-text-muted/50"
                />
                <span className="text-[12.5px] font-normal leading-[1.65] text-st-text-muted/90">
                  {d}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function CaseStudies() {
  const { t } = useI18n();
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section id="work" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div
          ref={ref}
          className={`mb-16 max-w-2xl transition-all duration-700 ${
            isInView ? "reveal visible" : "reveal"
          }`}
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="brand-rule h-px w-10" />
            <span className="text-[10px] font-medium tracking-[0.22em] uppercase text-st-text-muted">
              {t.work.eyebrow}
            </span>
          </div>
          <h2 className="font-display text-3xl leading-[1.2] tracking-[-0.03em] text-st-text sm:text-4xl md:text-5xl">
            {t.work.title}
          </h2>
          <p className="mt-5 text-base font-normal leading-[1.7] text-st-text-muted">
            {t.work.sub}
          </p>
        </div>

        <div className="space-y-14">
          {t.work.cases.map((study, i) => (
            <CaseCard key={study.title} study={study} index={i} />
          ))}
        </div>

        <p className="mt-16 max-w-2xl border-t border-st-border pt-8 text-[12.5px] font-normal leading-[1.7] text-st-text-muted/80">
          {t.work.disclaimer}
        </p>
      </div>
    </section>
  );
}
