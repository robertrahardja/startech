import { useEffect } from "react";
import Contact from "../components/Contact";
import { useInView } from "../hooks/useInView";
import { useI18n } from "../i18n";

/**
 * /charities: the two grants that pay most of a Singapore charity's or social
 * service agency's new system, three worked prices, and the quote offer.
 *
 * Honesty rules for this page (marketing copy): every grant fact is from the
 * official page, checked 24 Nov 2026 (NCSS's TSS and Green Lane pages, the
 * Charities Capability Fund page on charities.gov.sg). StarTech is not an
 * NCSS-appointed vendor; Green Lane has none. CCF needs 3 quotes only for the
 * asterisked items over S$6,000 (remote working, Singpass login, Singpass
 * myInfo); booking, event, volunteer, case management and AI tools go in with
 * one quote, StarTech's (CCF page, read 25 Nov 2026). StarTech never supplies
 * or arranges anyone else's quote.
 * Research: startech_marketing gtm/playbooks/grant-routes/1-charities.md.
 * Prices: startech_marketing gtm/pricing/suite-2026-11/README.md.
 */

const TSS = "https://ncss.gov.sg/grants/organisation-development/transformation-sustainability-scheme/pre-scoped-and-green-lane-solutions/";
const CCF =
  "https://www.charities.gov.sg/Pages/Charities-and-IPCs/Grants-and-Support-for-Charities-IPCs/Charities-Capability-Fund.aspx";
const GRANT_SOURCES = [TSS, CCF];

/**
 * The three worked examples' figures, in the same order as the catalogue's
 * examples. Kept out of the catalogue: they are the same in every language.
 * Green Lane pays 80% of the 3-year total, and its S$30,000 cap is on the
 * grant, not the cost: Bookings S$30,700 gets S$24,560, Assist S$24,000 gets
 * S$19,200. CCF pays 80% of year 1 (S$2,400, so S$1,920) and 50% of years 2-3
 * (S$300 a year, so S$150 each): S$2,220, leaving the charity S$780.
 */
const EXAMPLE_FIGURES = [
  { price: "S$30,700", net: "S$6,140" },
  { price: "S$24,000", net: "S$4,800" },
  { price: "S$3,000", net: "S$780" },
];

const EXTERNAL = "underline underline-offset-4 decoration-st-border hover:text-st-text hover:decoration-st-text";

export default function CharitiesPage() {
  const { t } = useI18n();
  const c = t.charities;

  useEffect(() => {
    const previous = document.title;
    document.title = `${c.eyebrow} · StarTech Innovation`;
    return () => {
      document.title = previous;
    };
  }, [c.eyebrow]);

  return (
    <>
      {/* The promise */}
      <section className="relative pt-32 pb-14 sm:pt-40 sm:pb-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <Reveal className="max-w-3xl">
            <SectionLabel>{c.eyebrow}</SectionLabel>
            <h1 className="font-display text-4xl leading-[1.1] tracking-[-0.03em] text-st-text sm:text-5xl md:text-6xl">
              {c.title}
            </h1>
            <p className="mt-6 max-w-2xl text-[16px] leading-[1.7] text-st-text-muted sm:text-[17px]">{c.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="hero-btn-primary inline-flex min-h-[46px] items-center justify-center rounded-xl px-6 py-3 text-[13px] font-normal tracking-wide text-st-text"
              >
                {c.ctaQuote}
              </a>
              <a
                href="#grants"
                className="inline-flex min-h-[46px] items-center justify-center rounded-xl border border-st-border px-6 py-3 text-[13px] font-normal tracking-wide text-st-text-muted transition-colors duration-300 hover:border-st-border-hover hover:text-st-text"
              >
                {c.ctaWhich}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Which grant fits */}
      <section id="grants" className="relative scroll-mt-24 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <Reveal>
            <SectionLabel>{c.grantsEyebrow}</SectionLabel>
            <h2 className="font-display text-3xl leading-[1.2] tracking-[-0.03em] text-st-text sm:text-4xl">
              {c.grantsTitle}
            </h2>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 gap-3 lg:grid-cols-2">
            {c.grants.map((grant, i) => (
              <Reveal key={grant.name} className="card rounded-2xl p-6 sm:p-8">
                <div className="text-[11px] font-medium tracking-[0.2em] uppercase text-st-gold-light/80 sm:text-[10px]">
                  {grant.who}
                </div>
                <h3 className="mt-3 font-display text-2xl leading-[1.25] tracking-[-0.02em] text-st-text">{grant.name}</h3>
                <ul className="mt-6 space-y-3 text-[14px] leading-[1.6] text-st-text-muted">
                  {grant.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-st-gold-light/70" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-[13px] text-st-text-muted">
                  <a
                    href={GRANT_SOURCES[i]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex min-h-[44px] items-center ${EXTERNAL}`}
                  >
                    {grant.source} ↗
                  </a>
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What it costs */}
      <section className="relative py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <Reveal>
            <SectionLabel>{c.examplesEyebrow}</SectionLabel>
            <h2 className="font-display text-3xl leading-[1.2] tracking-[-0.03em] text-st-text sm:text-4xl">
              {c.examplesTitle}
            </h2>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-3">
            {c.examples.map((example, i) => (
              <Reveal key={example.name} className="card flex flex-col rounded-xl p-5 sm:p-6">
                <article className="flex h-full flex-col">
                  <div className="text-[11px] font-medium tracking-[0.14em] uppercase text-st-text-muted/70 sm:text-[10px]">
                    {example.grant}
                  </div>
                  <h3 className="mt-3 text-[16px] font-medium leading-[1.35] text-st-text">{example.name}</h3>
                  <p className="mt-2 flex-1 text-[13.5px] leading-[1.65] text-st-text-muted">{example.detail}</p>
                  <dl className="mt-6 grid grid-cols-2 gap-3 border-t border-st-border pt-4">
                    <div>
                      <dt className="text-[12px] leading-[1.4] text-st-text-muted">{c.priceLabel}</dt>
                      <dd className="mt-1 text-[15px] text-st-text-muted tabular-nums">{EXAMPLE_FIGURES[i].price}</dd>
                    </div>
                    <div>
                      <dt className="text-[12px] leading-[1.4] text-st-text-muted">{c.netLabel}</dt>
                      <dd className="mt-1 font-display text-2xl text-st-text tabular-nums">{EXAMPLE_FIGURES[i].net}</dd>
                    </div>
                  </dl>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="mt-4 max-w-3xl text-[13px] leading-[1.6] text-st-text-muted">{c.examplesNote}</p>
        </div>
      </section>

      {/* How it works */}
      <section className="relative py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <Reveal className="card rounded-2xl p-7 sm:p-10">
            <SectionLabel>{c.stepsEyebrow}</SectionLabel>
            <h2 className="font-display max-w-3xl text-3xl leading-[1.2] tracking-[-0.03em] text-st-text sm:text-4xl">
              {c.stepsTitle}
            </h2>
            <ol className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {c.steps.map((step, i) => (
                <li key={step.lead}>
                  <div className="mb-2 text-[10px] font-medium tracking-[0.2em] text-st-text-muted/60">0{i + 1}</div>
                  <h3 className="text-[15px] font-medium text-st-text">{step.lead}</h3>
                  <p className="mt-2 text-[13.5px] leading-[1.65] text-st-text-muted">{step.detail}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* Rules */}
      <section className="relative py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <Reveal className="max-w-3xl">
            <SectionLabel>{c.rulesEyebrow}</SectionLabel>
            <h2 className="font-display text-3xl leading-[1.2] tracking-[-0.03em] text-st-text sm:text-4xl">
              {c.rulesTitle}
            </h2>
            <ul className="mt-6 space-y-3 text-[14.5px] leading-[1.65] text-st-text-muted">
              {c.rules.map((rule) => (
                <li key={rule} className="flex items-start gap-3">
                  <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-st-gold-light/70" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 border-t border-st-border pt-5 text-[13px] leading-[1.7] text-st-text-muted">{c.honesty}</p>
          </Reveal>
        </div>
      </section>

      <Contact variant="charities" />
    </>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="brand-rule h-px w-10" />
      <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-st-text-muted sm:text-[10px] sm:tracking-[0.22em]">
        {children}
      </span>
    </div>
  );
}

function Reveal({ className = "", children }: { className?: string; children: React.ReactNode }) {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  return (
    <div ref={ref} className={`${className} ${isInView ? "reveal visible" : "reveal"}`}>
      {children}
    </div>
  );
}
