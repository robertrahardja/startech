import { useEffect } from "react";
import Link from "../components/solutions/Link";
import InvoiceNowDemo from "../components/invoicenow/InvoiceNowDemo";
import { useInView } from "../hooks/useInView";
import { useI18n } from "../i18n";

/**
 * /invoicenow: what InvoiceNow is, who must use it and when (from IRAS), the
 * offer, and a working PINT SG demo that runs entirely in the browser.
 *
 * Claims to keep honest (see docs/COMPANY.md, "Claims to keep honest"):
 *   - StarTech is not an access point provider and not IMDA-accredited, and
 *     has not yet delivered an InvoiceNow integration for a client.
 *   - Software integration only: no accounting, GST-filing or tax-accuracy
 *     claims. GST treatment is for the client's accountant.
 *   - The demo output is labelled as sample data, not a tax invoice.
 *
 * The mandate dates are IRAS's (page last updated 8 Oct 2026); re-check the
 * IRAS page before changing them. Not prerendered (only "/" is).
 */

const IRAS_URL = "https://www.iras.gov.sg/taxes/goods-services-tax-(gst)/gst-invoicenow-requirement";
const PINT_SG_URL = "https://docs.peppol.eu/poac/sg/pint-sg/";
const IMDA_URL = "https://www.imda.gov.sg/how-we-can-help/nationwide-e-invoicing-framework/invoicenow";

export default function InvoiceNowPage() {
  const { t } = useI18n();
  const m = t.invoicenow;

  useEffect(() => {
    const previous = document.title;
    document.title = `${m.eyebrow} · StarTech Innovation`;
    return () => {
      document.title = previous;
    };
  }, [m.eyebrow]);

  return (
    <>
      {/* Hero and the offer in one line */}
      <section className="relative pt-32 pb-14 sm:pt-40 sm:pb-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="max-w-3xl">
            <SectionLabel>{m.eyebrow}</SectionLabel>
            <h1 className="font-display text-4xl leading-[1.1] tracking-[-0.03em] text-st-text sm:text-5xl md:text-6xl">
              {m.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-[16px] leading-[1.7] text-st-text-muted sm:text-[17px]">
              {m.lead}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#demo"
                className="hero-btn-primary inline-flex min-h-[46px] items-center justify-center rounded-xl px-6 py-3 text-[13px] font-normal tracking-wide text-st-text"
              >
                {m.ctaDemo}
              </a>
              <Link
                href="/flyer"
                className="inline-flex min-h-[46px] items-center justify-center rounded-xl border border-st-border px-6 py-3 text-[13px] font-normal tracking-wide text-st-text-muted transition-colors duration-300 hover:border-st-border-hover hover:text-st-text"
              >
                {m.ctaFlyer}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What it is */}
      <section className="relative py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <Reveal>
            <SectionLabel>{m.whatEyebrow}</SectionLabel>
            <h2 className="font-display text-3xl leading-[1.2] tracking-[-0.03em] text-st-text sm:text-4xl">
              {m.whatTitle}
            </h2>
            <ol className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {m.what.map((item, i) => (
                <li key={item.title} className="card rounded-xl p-5 sm:p-6">
                  <div className="mb-3 text-[10px] font-medium tracking-[0.2em] text-st-text-muted/60">
                    0{i + 1}
                  </div>
                  <h3 className="text-[15px] font-medium text-st-text">{item.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-[1.65] text-st-text-muted">{item.body}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* Who must use it, and when */}
      <section className="relative py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <Reveal className="max-w-4xl">
            <SectionLabel>{m.whoEyebrow}</SectionLabel>
            <h2 className="font-display text-3xl leading-[1.2] tracking-[-0.03em] text-st-text sm:text-4xl">
              {m.whoTitle}
            </h2>
            <p className="mt-4 text-[15px] leading-[1.7] text-st-text-muted">{m.whoIntro}</p>
            <ol className="mt-6 divide-y divide-st-border border-y border-st-border">
              {m.phases.map((phase) => (
                <li key={phase.date} className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <span className="text-[13px] font-medium tracking-wide text-st-gold-light">{phase.date}</span>
                  <span className="text-[14px] leading-[1.65] text-st-text-muted">{phase.text}</span>
                </li>
              ))}
            </ol>
            <p className="mt-5 text-[13.5px] leading-[1.7] text-st-text-muted">{m.whoNote}</p>
            <a
              href={IRAS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex min-h-[44px] items-center text-[13px] text-st-blue-light underline-offset-4 hover:underline"
            >
              {m.whoSource} ↗
            </a>
            <p className="mt-4 rounded-xl border border-st-border px-5 py-4 text-[13.5px] leading-[1.7] text-st-text-muted">
              {m.accountant}
            </p>
          </Reveal>
        </div>
      </section>

      {/* The offer */}
      <section className="relative py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <Reveal className="card rounded-2xl p-7 sm:p-10">
            <SectionLabel>{m.offerEyebrow}</SectionLabel>
            <h2 className="font-display max-w-3xl text-3xl leading-[1.2] tracking-[-0.03em] text-st-text sm:text-4xl">
              {m.offerTitle}
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-[1.7] text-st-text-muted">{m.offerBody}</p>
            <ul className="mt-6 grid grid-cols-1 gap-2 text-[13.5px] text-st-text-muted sm:grid-cols-3">
              {m.offerPoints.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-st-gold-light/70" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-3xl border-t border-st-border pt-5 text-[13px] leading-[1.7] text-st-text-muted">
              {m.offerHonest}
            </p>
          </Reveal>
        </div>
      </section>

      {/* The demo */}
      <section id="demo" className="relative scroll-mt-24 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <SectionLabel>{m.demoEyebrow}</SectionLabel>
          <h2 className="font-display text-3xl leading-[1.2] tracking-[-0.03em] text-st-text sm:text-4xl">
            {m.demoTitle}
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-[1.7] text-st-text-muted">{m.demoIntro}</p>
          <InvoiceNowDemo />
        </div>
      </section>

      {/* What happens next */}
      <section className="relative py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <Reveal>
            <SectionLabel>{m.nextEyebrow}</SectionLabel>
            <h2 className="font-display text-3xl leading-[1.2] tracking-[-0.03em] text-st-text sm:text-4xl">
              {m.nextTitle}
            </h2>
            <ol className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {m.next.map((step, i) => (
                <li key={step.title} className="card rounded-xl p-5 sm:p-6">
                  <div className="mb-3 text-[10px] font-medium tracking-[0.2em] text-st-text-muted/60">
                    0{i + 1}
                  </div>
                  <h3 className="text-[15px] font-medium text-st-text">{step.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-[1.65] text-st-text-muted">{step.body}</p>
                </li>
              ))}
            </ol>
            <p className="mt-5 max-w-3xl text-[13.5px] leading-[1.7] text-st-text-muted">{m.nextNote}</p>
          </Reveal>
        </div>
      </section>

      {/* CTA, sources */}
      <section className="relative pt-14 pb-24 sm:pt-16 sm:pb-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <Reveal className="card rounded-2xl p-7 sm:p-10">
            <h2 className="font-display max-w-3xl text-3xl leading-[1.2] tracking-[-0.03em] text-st-text sm:text-4xl">
              {m.ctaTitle}
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-[1.7] text-st-text-muted">{m.ctaBody}</p>
            <Link
              href="/flyer#contact"
              className="hero-btn-primary mt-6 inline-flex min-h-[46px] items-center justify-center rounded-xl px-6 py-3 text-[13px] font-normal tracking-wide text-st-text"
            >
              {m.ctaButton}
            </Link>
          </Reveal>

          <div className="mt-10 max-w-3xl">
            <h2 className="text-[11px] font-medium tracking-[0.2em] uppercase text-st-text-muted">
              {m.sourcesTitle}
            </h2>
            <ul className="mt-2">
              {[
                [IRAS_URL, m.sourceIras],
                [PINT_SG_URL, m.sourcePint],
                [IMDA_URL, m.sourceImda],
              ].map(([href, label]) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center text-[13px] text-st-text-muted underline-offset-4 hover:text-st-text hover:underline"
                  >
                    {label} ↗
                  </a>
                </li>
              ))}
            </ul>
            <Link
              href="/"
              className="mt-4 inline-flex min-h-[44px] items-center text-[12px] text-st-text-muted/70 underline-offset-4 hover:underline"
            >
              {m.backHome}
            </Link>
          </div>
        </div>
      </section>
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
