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
          {/* The result panel.

              This is the headline outcome of the case study, so it is set as
              a stat block rather than a line of text: the figure centred and
              large, an eyebrow above naming what it is, and the caption
              beneath as a short label.

              Earlier versions ran the figure and caption side by side, which
              left a wide, half-empty box sitting between two blocks of dense
              copy — the layout is a single column on a phone, so a horizontal
              pair could never fill it. Centred and stacked, the panel fills
              its container at every width and reads as the summary it is.

              The gradient rule ties it to the brand marks used elsewhere. */}
          <div className="metric-tile relative overflow-hidden rounded-xl border border-st-border bg-st-bg-card px-5 py-7 text-center transition-all duration-500">
            <div className="brand-rule absolute inset-x-0 top-0 h-px" />

            <div className="text-[10px] font-medium tracking-[0.18em] uppercase text-st-text-muted/70">
              {t.work.result}
            </div>

            <div className="gradient-text mt-3 font-display text-5xl leading-none tracking-[-0.03em] sm:text-6xl">
              {study.metric.figure}
            </div>

            <div className="mx-auto mt-3 max-w-[24ch] text-[12px] font-medium leading-[1.6] text-balance text-st-text-muted">
              {study.metric.caption}
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
