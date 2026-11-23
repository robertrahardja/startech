import { useEffect } from "react";
import Contact from "../components/Contact";
import Link from "../components/solutions/Link";
import { useInView } from "../hooks/useInView";
import { useI18n } from "../i18n";
import { SOLUTIONS } from "../components/solutions/solutionsData";

/**
 * The digital flyer: one page, in the order a reader decides.
 *
 *   1. Who it is for, in a sentence.
 *   2. Three proof lines, no more.
 *   3. Try before you commit: the working demos, three named, the rest linked.
 *   4. The offer: send one spreadsheet, see it as a system. Free, 3-5 a month.
 *   5. The form, with the spreadsheet upload, and the deck below it, ungated.
 *   6. One grants line for Singapore. No percentage.
 *
 * Every bio link and campaign points here with ?utm_source=<platform>; the
 * tag is read in lib/utm and sent with the form. Claims are the capability
 * deck's and nothing more — see docs/COMPANY.md, "Claims to keep honest".
 *
 * Not prerendered (only "/" is) and not in the nav: it is reached by link.
 */

/** The three most universal demos, shown first; the rest are one link away. */
const FEATURED_DEMOS = ["invoice-scanner", "customer-chatbot", "quotation-generator"];

export default function FlyerPage() {
  const { t, locale } = useI18n();
  const f = t.flyer;

  useEffect(() => {
    const previous = document.title;
    document.title = `${f.headline} · StarTech Innovation`;
    return () => {
      document.title = previous;
    };
  }, [f.headline]);

  const featured = FEATURED_DEMOS.map((slug) => SOLUTIONS.find((s) => s.slug === slug)).filter(
    (s): s is (typeof SOLUTIONS)[number] => Boolean(s)
  );
  const deckHref = `/assets/startech-capability-deck-${locale}.pdf`;

  return (
    <>
      {/* 1. Who it is for */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <Reveal className="max-w-3xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="brand-rule h-px w-10" />
              <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-st-text-muted sm:text-[10px] sm:tracking-[0.22em]">
                {f.eyebrow}
              </span>
            </div>
            <h1 className="font-display text-4xl leading-[1.1] tracking-[-0.03em] text-st-text sm:text-5xl md:text-6xl">
              {f.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-[16px] leading-[1.7] text-st-text-muted sm:text-[17px]">
              {f.who}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="hero-btn-primary inline-flex min-h-[46px] items-center justify-center rounded-xl px-6 py-3 text-[13px] font-normal tracking-wide text-st-text"
              >
                {f.ctaOffer}
              </a>
              <a
                href={deckHref}
                download
                className="inline-flex min-h-[46px] items-center justify-center rounded-xl border border-st-border px-6 py-3 text-[13px] font-normal tracking-wide text-st-text-muted transition-colors duration-300 hover:border-st-border-hover hover:text-st-text"
              >
                {f.ctaDeck}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. Proof */}
      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <Reveal>
            <SectionLabel>{f.proofEyebrow}</SectionLabel>
            <ol className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {f.proof.map((line, i) => (
                <li key={line.lead} className="card rounded-xl p-5 sm:p-6">
                  <div className="mb-3 text-[10px] font-medium tracking-[0.2em] text-st-text-muted/60">
                    0{i + 1}
                  </div>
                  <div className="font-display text-xl leading-[1.25] tracking-[-0.02em] text-st-text sm:text-2xl">
                    {line.lead}
                  </div>
                  <p className="mt-2 text-[13.5px] leading-[1.65] text-st-text-muted">
                    {line.detail}
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* 3. Try before you commit */}
      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <Reveal>
            <SectionLabel>{f.demosEyebrow}</SectionLabel>
            <h2 className="font-display text-3xl leading-[1.2] tracking-[-0.03em] text-st-text sm:text-4xl">
              {f.demosTitle}
            </h2>
            <p className="mt-4 max-w-2xl text-[14px] leading-[1.7] text-st-text-muted/70">
              {f.demosSub.replace("{count}", String(SOLUTIONS.length))}
            </p>
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {featured.map((demo) => (
                <Link key={demo.slug} href={`/solutions/${demo.slug}`}>
                  <div className="card group flex h-full flex-col rounded-xl p-5 sm:p-6">
                    <h3 className="mb-2 text-sm font-medium tracking-wide text-st-text md:text-base">
                      {demo.title}
                    </h3>
                    <p className="flex-1 text-[13px] leading-relaxed text-st-text-muted">
                      {demo.tagline}
                    </p>
                    <div className="mt-4 border-t border-st-border pt-4 text-[10px] font-medium tracking-[0.15em] uppercase text-st-text-muted/40 transition-colors duration-300 group-hover:text-st-gold-light/60">
                      {f.demoOpen} →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <Link
              href="/solutions"
              className="mt-6 inline-flex min-h-[44px] items-center text-[13px] text-st-text-muted underline-offset-4 hover:text-st-text hover:underline"
            >
              {f.demosAll.replace("{count}", String(SOLUTIONS.length))}
            </Link>
            <Link
              href="/invoicenow"
              className="mt-1 flex min-h-[44px] items-center text-[13px] text-st-text-muted underline-offset-4 hover:text-st-text hover:underline"
            >
              {f.invoiceNowLink} →
            </Link>
            <Link
              href="/singpass"
              className="mt-1 flex min-h-[44px] items-center text-[13px] text-st-text-muted underline-offset-4 hover:text-st-text hover:underline"
            >
              {t.singpass.flyerLine} →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 4. The offer */}
      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <Reveal className="card rounded-2xl p-7 sm:p-10">
            <SectionLabel>{f.offerEyebrow}</SectionLabel>
            <h2 className="font-display max-w-3xl text-3xl leading-[1.2] tracking-[-0.03em] text-st-text sm:text-4xl">
              {f.offerTitle}
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-[1.7] text-st-text-muted">
              {f.offerBody}
            </p>
            <ul className="mt-6 grid grid-cols-1 gap-2 text-[13.5px] text-st-text-muted sm:grid-cols-3">
              {f.offerPoints.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-st-gold-light/70" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* 5. The form */}
      <Contact variant="flyer" />

      {/* Deck below the form, ungated; 6. the grants line */}
      <section className="relative pb-24 sm:pb-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="mx-auto max-w-5xl space-y-4">
            <a
              href={deckHref}
              download
              className="card flex min-h-[56px] items-center justify-between gap-4 rounded-xl px-5 py-4 text-[13.5px] text-st-text transition-colors duration-300 hover:border-st-border-hover"
            >
              <span>{f.deckLine}</span>
              <span className="shrink-0 text-[10px] font-medium tracking-[0.15em] uppercase text-st-text-muted">
                PDF
              </span>
            </a>
            <p className="text-[13px] leading-[1.7] text-st-text-muted/80">
              <span className="font-medium text-st-text-muted">{f.grantsLabel}</span>{" "}
              {f.grantsLine}
            </p>
            <p className="text-[12px] text-st-text-muted/60">
              <Link href="/" className="inline-flex min-h-[44px] items-center underline-offset-4 hover:underline">
                {f.backHome}
              </Link>
            </p>
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
