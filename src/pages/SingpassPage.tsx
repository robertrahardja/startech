import { useEffect } from "react";
import Contact from "../components/Contact";
import Link from "../components/solutions/Link";
import FapiDemo from "../components/singpass/FapiDemo";
import StagingLogin from "../components/singpass/StagingLogin";
import { useInView } from "../hooks/useInView";
import { useI18n } from "../i18n";

/**
 * /singpass: the Singpass FAPI 2.0 deadline in plain words, a working
 * reference demo of the new flow, and the offer to check and upgrade an
 * existing integration.
 *
 * Honesty rules for this page (marketing copy): StarTech has not yet done a
 * Singpass migration for a client and is not a Singpass or GovTech partner.
 * The demo runs against a mock server (worker/singpass-demo.ts) and says so.
 * Deadlines link to Singpass's and Corppass's own documentation.
 */

const SINGPASS_DOCS = "https://docs.developer.singpass.gov.sg/docs";
const SINGPASS_MIGRATION =
  "https://docs.developer.singpass.gov.sg/docs/technical-specifications/migration-guides/login-myinfo-v5-apps";
const CORPPASS_FAPI = "https://docs.corppass.gov.sg/technical-specifications/corppass-authorization-api-fapi-2.0";

const EXTERNAL = "underline underline-offset-4 decoration-st-border hover:text-st-text hover:decoration-st-text";

export default function SingpassPage() {
  const { t } = useI18n();
  const s = t.singpass;

  useEffect(() => {
    const previous = document.title;
    document.title = `${s.eyebrow} · StarTech Innovation`;
    return () => {
      document.title = previous;
    };
  }, [s.eyebrow]);

  return (
    <>
      {/* The deadline */}
      <section className="relative pt-32 pb-14 sm:pt-40 sm:pb-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <Reveal className="max-w-3xl">
            <SectionLabel>{s.eyebrow}</SectionLabel>
            <h1 className="font-display text-4xl leading-[1.1] tracking-[-0.03em] text-st-text sm:text-5xl md:text-6xl">
              {s.title}
            </h1>
            <p className="mt-6 max-w-2xl text-[16px] leading-[1.7] text-st-text-muted sm:text-[17px]">
              {s.intro}
            </p>
            <p className="mt-4 text-[13px] text-st-text-muted">
              <a href={SINGPASS_DOCS} target="_blank" rel="noopener noreferrer" className={`inline-flex min-h-[44px] items-center ${EXTERNAL}`}>
                {s.source} ↗
              </a>
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="hero-btn-primary inline-flex min-h-[46px] items-center justify-center rounded-xl px-6 py-3 text-[13px] font-normal tracking-wide text-st-text"
              >
                {s.ctaCheck}
              </a>
              <a
                href="#demo"
                className="inline-flex min-h-[46px] items-center justify-center rounded-xl border border-st-border px-6 py-3 text-[13px] font-normal tracking-wide text-st-text-muted transition-colors duration-300 hover:border-st-border-hover hover:text-st-text"
              >
                {s.ctaDemo}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What changes */}
      <section className="relative py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <Reveal>
            <SectionLabel>{s.changesEyebrow}</SectionLabel>
            <h2 className="font-display text-3xl leading-[1.2] tracking-[-0.03em] text-st-text sm:text-4xl">
              {s.changesTitle}
            </h2>
            <ol className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {s.changes.map((change, i) => (
                <li key={change.lead} className="card rounded-xl p-5 sm:p-6">
                  <div className="mb-3 text-[10px] font-medium tracking-[0.2em] text-st-text-muted/60">0{i + 1}</div>
                  <h3 className="text-[15px] font-medium leading-[1.35] text-st-text">{change.lead}</h3>
                  <p className="mt-2 text-[13.5px] leading-[1.65] text-st-text-muted">{change.detail}</p>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-[13px] text-st-text-muted">
              <a href={SINGPASS_MIGRATION} target="_blank" rel="noopener noreferrer" className={`inline-flex min-h-[44px] items-center ${EXTERNAL}`}>
                {s.migrationLink} ↗
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Who, and what if not */}
      <section className="relative py-14 sm:py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 px-6 sm:px-8 lg:grid-cols-2">
          <Reveal className="card rounded-2xl p-6 sm:p-8">
            <SectionLabel>{s.whoEyebrow}</SectionLabel>
            <h2 className="font-display text-2xl leading-[1.25] tracking-[-0.02em] text-st-text sm:text-3xl">
              {s.whoTitle}
            </h2>
            <ul className="mt-6 space-y-3 text-[14px] leading-[1.6] text-st-text-muted">
              {s.who.map((line) => (
                <li key={line} className="flex items-start gap-3">
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-st-gold-light/70" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[13.5px] leading-[1.6] text-st-text-muted">
              {s.corppass}{" "}
              <a href={CORPPASS_FAPI} target="_blank" rel="noopener noreferrer" className={`inline-flex min-h-[44px] items-center ${EXTERNAL}`}>
                {s.corppassLink} ↗
              </a>
            </p>
          </Reveal>
          <Reveal className="card rounded-2xl p-6 sm:p-8">
            <SectionLabel>{s.riskEyebrow}</SectionLabel>
            <h2 className="font-display text-2xl leading-[1.25] tracking-[-0.02em] text-st-text sm:text-3xl">
              {s.riskTitle}
            </h2>
            <p className="mt-6 text-[14px] leading-[1.7] text-st-text-muted">{s.riskBody}</p>
          </Reveal>
        </div>
      </section>

      {/* The demo. Not wrapped in Reveal: it must be visible and usable at once. */}
      <section id="demo" className="relative scroll-mt-24 py-14 sm:py-16">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <SectionLabel>{s.demoEyebrow}</SectionLabel>
          <h2 className="font-display text-3xl leading-[1.2] tracking-[-0.03em] text-st-text sm:text-4xl">
            {s.demoTitle}
          </h2>
          <p className="mt-4 max-w-3xl text-[14.5px] leading-[1.7] text-st-text-muted">{s.demoIntro}</p>
          <p className="mt-4 max-w-3xl rounded-xl border border-st-border px-4 py-3 text-[13px] leading-[1.6] text-st-text-muted">
            {s.demoNotice}
          </p>
          <div className="mt-8">
            <FapiDemo />
          </div>
          <StagingLogin />
        </div>
      </section>

      {/* The offer */}
      <section className="relative py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <Reveal className="card rounded-2xl p-7 sm:p-10">
            <SectionLabel>{s.offerEyebrow}</SectionLabel>
            <h2 className="font-display max-w-3xl text-3xl leading-[1.2] tracking-[-0.03em] text-st-text sm:text-4xl">
              {s.offerTitle}
            </h2>
            <ol className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {s.offerSteps.map((step, i) => (
                <li key={step.lead}>
                  <div className="mb-2 text-[10px] font-medium tracking-[0.2em] text-st-text-muted/60">0{i + 1}</div>
                  <h3 className="text-[15px] font-medium text-st-text">{step.lead}</h3>
                  <p className="mt-2 text-[13.5px] leading-[1.65] text-st-text-muted">{step.detail}</p>
                </li>
              ))}
            </ol>
            <p className="mt-8 max-w-3xl border-t border-st-border pt-5 text-[13px] leading-[1.7] text-st-text-muted">
              {s.honesty}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="hero-btn-primary inline-flex min-h-[46px] items-center justify-center rounded-xl px-6 py-3 text-[13px] font-normal tracking-wide text-st-text"
              >
                {s.ctaCheck}
              </a>
              <Link
                href="/flyer"
                className="inline-flex min-h-[46px] items-center justify-center rounded-xl border border-st-border px-6 py-3 text-[13px] font-normal tracking-wide text-st-text-muted transition-colors duration-300 hover:border-st-border-hover hover:text-st-text"
              >
                {s.otherWork}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Contact variant="singpass" />
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
