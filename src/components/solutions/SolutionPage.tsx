import { useInView } from "../../hooks/useInView";
import { SectionHeader } from "../Products";
import DemoSection from "../demos/DemoSection";
import Link from "./Link";
import { TIER_META } from "./solutionsData";
import type { Solution } from "./solutionsData";

/* ─── Icon map for solution pages ──────────────────────────────────────── */
const ICONS: Record<string, React.ReactNode> = {
  scan: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),
  chat: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
    </svg>
  ),
  calendar: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  ),
  document: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),
  pen: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
  ),
  box: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    </svg>
  ),
  share: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
    </svg>
  ),
  globe: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  ),
  users: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),
  handshake: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3.15M10.05 4.575a1.575 1.575 0 013.15 0v3.15M10.05 4.575v3.15M3.75 7.725h16.5M3.75 7.725a3.375 3.375 0 00-3 3.345v1.68a3.375 3.375 0 003 3.345m16.5-8.37a3.375 3.375 0 013 3.345v1.68a3.375 3.375 0 01-3 3.345M3.75 16.095h16.5m-16.5 0a2.25 2.25 0 00-2.25 2.25v.75a2.25 2.25 0 002.25 2.25h16.5a2.25 2.25 0 002.25-2.25v-.75a2.25 2.25 0 00-2.25-2.25" />
    </svg>
  ),
  shield: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  graduation: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15v-3.75m0 0h10.5" />
    </svg>
  ),
  barchart: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  ),
};

/* ─── Step number indicators ───────────────────────────────────────────── */
const STEP_NUMBERS = ["01", "02", "03", "04"];

/* ─── Grant callout section ────────────────────────────────────────────── */
function GrantsCallout() {
  const [ref, isInView] = useInView({ threshold: 0.15 });

  return (
    <div
      ref={ref}
      className={`space-y-4 ${isInView ? "reveal visible" : "reveal"}`}
    >
      {/* Main grant banner */}
      <div className="overflow-hidden rounded-xl border border-st-gold/25 bg-gradient-to-br from-st-gold/[0.08] to-st-gold/[0.02] p-6 sm:p-8">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-st-gold/15">
            <svg className="h-6 w-6 text-st-gold-light" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-medium tracking-wide text-st-gold-light sm:text-lg">
              Pay up to 50% less with government grants
            </h3>
            <p className="text-[13px] font-light text-st-gold-light/60">
              Singapore SMEs are eligible for multiple grants that stack together
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* PSG */}
          <div className="rounded-lg border border-st-gold/15 bg-st-bg-card/60 p-4">
            <div className="mb-1.5 flex items-center gap-2">
              <span className="rounded-md bg-st-gold/20 px-2 py-0.5 text-[10px] font-medium tracking-wider uppercase text-st-gold-light">
                Up to 50% off
              </span>
            </div>
            <h4 className="mb-1.5 text-sm font-medium text-white">
              Productivity Solutions Grant (PSG)
            </h4>
            <p className="text-[12px] font-light leading-relaxed text-st-text-muted">
              Pre-approved IT solutions and equipment for SMEs.
              Covers software, deployment, and training costs.
              Most Singapore-registered businesses with at least
              30% local shareholding qualify.
            </p>
          </div>

          {/* SFEC */}
          <div className="rounded-lg border border-st-gold/15 bg-st-bg-card/60 p-4">
            <div className="mb-1.5 flex items-center gap-2">
              <span className="rounded-md bg-st-gold/20 px-2 py-0.5 text-[10px] font-medium tracking-wider uppercase text-st-gold-light">
                S$10,000 credit
              </span>
            </div>
            <h4 className="mb-1.5 text-sm font-medium text-white">
              SkillsFuture Enterprise Credit (SFEC)
            </h4>
            <p className="text-[12px] font-light leading-relaxed text-st-text-muted">
              One-time S$10,000 credit for employers to upskill
              employees and adopt digital solutions. Can be used
              on top of PSG for additional savings.
            </p>
          </div>
        </div>

        {/* Additional grants */}
        <div className="mt-4 rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
          <h4 className="mb-2 text-[13px] font-medium text-white">
            Other grants you may qualify for
          </h4>
          <div className="grid grid-cols-1 gap-2 text-[12px] font-light text-st-text-muted sm:grid-cols-2">
            <div className="flex items-start gap-2">
              <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-st-gold-light/40" />
              <span><span className="text-white/80">Enterprise Development Grant (EDG)</span> — up to 70% for business transformation projects</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-st-gold-light/40" />
              <span><span className="text-white/80">Digital Leaders Programme</span> — for advanced AI and automation adoption</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-st-gold-light/40" />
              <span><span className="text-white/80">CIT Rebate (Budget 2026)</span> — S$2,000 corporate tax rebate for all companies</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-st-gold-light/40" />
              <span><span className="text-white/80">400% Tax Deduction</span> — on qualifying AI and automation investments (EIS)</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-lg bg-st-gold/[0.06] px-4 py-3">
          <svg className="h-4 w-4 shrink-0 text-st-gold-light/70" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-[13px] font-light text-st-gold-light/80">
            We handle the full grant application process for you at no extra charge — eligibility check, paperwork, and submission.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Solution Page ───────────────────────────────────────────────── */
export default function SolutionPage({
  solution,
  onAskAi,
}: {
  solution: Solution;
  onAskAi: () => void;
}) {
  const tier = TIER_META[solution.tier];
  const icon = ICONS[solution.icon];

  return (
    <>
      {/* ── Hero ── */}
      <SolutionHero
        solution={solution}
        tierMeta={tier}
        icon={icon}
        onAskAi={onAskAi}
      />

      {/* ── Problem ── */}
      <ProblemSection problem={solution.problem} />

      {/* ── How It Works ── */}
      <HowItWorksSection steps={solution.steps} />

      {/* ── Try It Demo ── */}
      <DemoSection slug={solution.slug} title={solution.title} />

      {/* ── Key Features ── */}
      <FeaturesSection features={solution.features} />

      {/* ── Grants ── */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <GrantsCallout />
        </div>
      </section>

      {/* ── Pricing ── */}
      <PricingSection solution={solution} tierMeta={tier} />

      {/* ── CTA ── */}
      <CtaSection solution={solution} onAskAi={onAskAi} />
    </>
  );
}

/* ─── Hero Section ─────────────────────────────────────────────────────── */
function SolutionHero({
  solution,
  tierMeta,
  icon,
  onAskAi,
}: {
  solution: Solution;
  tierMeta: (typeof TIER_META)[keyof typeof TIER_META];
  icon: React.ReactNode;
  onAskAi: () => void;
}) {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Subtle background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-st-bg via-st-bg-elevated/50 to-st-bg" />

      <div
        ref={ref}
        className={`relative mx-auto max-w-4xl px-6 text-center sm:px-8 ${isInView ? "reveal visible" : "reveal"}`}
      >
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center justify-center gap-2 text-[11px] font-light tracking-wide text-st-text-muted">
          <Link href="/" className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center transition-colors duration-300 hover:text-white">
            Home
          </Link>
          <span className="text-st-text-muted/40">/</span>
          <Link href="/solutions" className="inline-flex min-h-[44px] items-center transition-colors duration-300 hover:text-white">
            Solutions
          </Link>
          <span className="text-st-text-muted/40">/</span>
          <span className="text-st-text-muted/60">{solution.title}</span>
        </nav>

        {/* Tier badge */}
        <span
          className={`mb-5 inline-block rounded-full px-3 py-1 text-[10px] font-medium tracking-[0.15em] uppercase ${tierMeta.badgeClass}`}
        >
          {tierMeta.label}
        </span>

        {/* Icon */}
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.04] text-st-text-muted">
          {icon}
        </div>

        {/* Title */}
        <h1 className="mb-4 font-display text-3xl tracking-[-0.02em] text-white sm:text-4xl md:text-5xl lg:text-6xl">
          {solution.title}
        </h1>

        {/* Tagline */}
        <p className="mx-auto mb-8 max-w-2xl text-base font-light leading-relaxed text-st-text-muted sm:text-lg">
          {solution.tagline}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <button
            onClick={onAskAi}
            className="hero-btn-primary relative overflow-hidden rounded-xl px-7 py-3 text-sm font-light tracking-wide text-white transition-all duration-500"
          >
            <span className="relative z-10">Get a Free Demo</span>
          </button>
          <Link
            href="/solutions"
            className="hero-btn-secondary relative overflow-hidden rounded-xl px-7 py-3 text-sm font-light tracking-wide text-st-text-muted transition-all duration-500 hover:text-white"
          >
            <span className="relative z-10">View All Solutions</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Problem Section ──────────────────────────────────────────────────── */
function ProblemSection({ problem }: { problem: string }) {
  const [ref, isInView] = useInView({ threshold: 0.15 });

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <div
          ref={ref}
          className={`${isInView ? "reveal visible" : "reveal"}`}
        >
          <SectionHeader
            label="The Problem"
            title="Why this matters"
            subtitle={problem}
          />
        </div>
      </div>
    </section>
  );
}

/* ─── How It Works Section ─────────────────────────────────────────────── */
function HowItWorksSection({
  steps,
}: {
  steps: Solution["steps"];
}) {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <SectionHeader
          label="Process"
          title="How it works"
          subtitle="A simple, clear path from problem to solution."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <StepCard key={i} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({
  step,
  index,
}: {
  step: Solution["steps"][number];
  index: number;
}) {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`card group rounded-xl p-5 sm:p-6 ${isInView ? "reveal visible" : "reveal"}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <span className="mb-3 block font-display text-2xl text-st-gold-light/30">
        {STEP_NUMBERS[index]}
      </span>
      <h3 className="mb-2 text-sm font-medium tracking-wide text-white">
        {step.title}
      </h3>
      <p className="text-[13px] font-light leading-relaxed text-st-text-muted">
        {step.description}
      </p>
    </div>
  );
}

/* ─── Features Section ─────────────────────────────────────────────────── */
function FeaturesSection({ features }: { features: string[] }) {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-6 sm:px-8">
        <SectionHeader
          label="Features"
          title="What you get"
          subtitle="Built for Singapore SMEs, with the details that matter."
        />

        <div
          ref={ref}
          className={`grid grid-cols-1 gap-3 sm:grid-cols-2 ${isInView ? "reveal visible" : "reveal"}`}
        >
          {features.map((feature, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-lg border border-st-border bg-st-bg-card/50 p-4"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <svg
                className="mt-0.5 h-4 w-4 shrink-0 text-st-gold-light/60"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <span className="text-[13px] font-light leading-relaxed text-st-text-muted">
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Pricing Section ──────────────────────────────────────────────────── */
function PricingSection({
  solution,
  tierMeta,
}: {
  solution: Solution;
  tierMeta: (typeof TIER_META)[keyof typeof TIER_META];
}) {
  const [ref, isInView] = useInView({ threshold: 0.15 });
  const savings = solution.priceFrom - solution.pricePsg;

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-2xl px-6 sm:px-8">
        <SectionHeader
          label="Pricing"
          title="Estimated investment"
          subtitle="Pricing varies based on your requirements, company size, and customisation needs. Below is a typical range — contact us for a detailed quote."
        />

        <div
          ref={ref}
          className={`space-y-4 ${isInView ? "reveal visible" : "reveal"}`}
        >
          {/* Price comparison */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Standard price */}
            <div className="card overflow-hidden rounded-xl p-5 text-center sm:p-6">
              <span
                className={`mb-3 inline-block rounded-full px-3 py-1 text-[10px] font-medium tracking-[0.15em] uppercase ${tierMeta.badgeClass}`}
              >
                {tierMeta.label}
              </span>
              <div className="mb-0.5 text-[11px] font-light tracking-wide text-st-text-muted">
                Estimated from
              </div>
              <div className="mb-2 font-display text-3xl text-white sm:text-4xl">
                S${solution.priceFrom}
                <span className="text-base text-st-text-muted">/mo</span>
              </div>
              <p className="text-[11px] font-light text-st-text-muted/60">
                Standard pricing before grants
              </p>
            </div>

            {/* Grant price — highlighted */}
            <div className="overflow-hidden rounded-xl border-2 border-st-gold/30 bg-gradient-to-br from-st-gold/[0.08] to-st-gold/[0.02] p-5 text-center sm:p-6">
              <span className="mb-3 inline-block rounded-full bg-st-gold/20 px-3 py-1 text-[10px] font-medium tracking-[0.15em] uppercase text-st-gold-light">
                With PSG Grant
              </span>
              <div className="mb-0.5 text-[11px] font-light tracking-wide text-st-gold-light/60">
                You could pay as low as
              </div>
              <div className="mb-2 font-display text-3xl text-st-gold-light sm:text-4xl">
                S${solution.pricePsg}
                <span className="text-base text-st-gold-light/60">/mo</span>
              </div>
              <p className="text-[12px] font-light text-st-gold-light/70">
                Save S${savings}/mo with 50% PSG subsidy
              </p>
            </div>
          </div>

          {/* Disclaimer and details */}
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 text-[12px] font-light leading-relaxed text-st-text-muted">
            <p className="mb-2">
              <span className="text-white/80">These are estimated prices.</span>{" "}
              Actual pricing depends on your specific requirements, number of
              users, data volume, integration complexity, and customisation.
              We provide a detailed quote after understanding your needs.
            </p>
            <p className="mb-2">
              <span className="text-white/80">Government grants can significantly
              reduce your cost.</span>{" "}
              PSG covers up to 50% of qualifying costs. SFEC provides an
              additional S$10,000 credit. Multiple grants can be stacked.
            </p>
            <p className="text-st-text-muted/60">
              All estimates exclude 9% GST. Annual billing available with
              additional discount. No lock-in contracts — cancel anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CTA Section ──────────────────────────────────────────────────────── */
function CtaSection({
  solution,
  onAskAi,
}: {
  solution: Solution;
  onAskAi: () => void;
}) {
  const [ref, isInView] = useInView({ threshold: 0.15 });

  return (
    <section className="py-20 sm:py-28">
      <div
        ref={ref}
        className={`mx-auto max-w-2xl px-6 text-center sm:px-8 ${isInView ? "reveal visible" : "reveal"}`}
      >
        <h2 className="mb-4 font-display text-2xl text-white sm:text-3xl md:text-4xl">
          Ready to get started?
        </h2>
        <p className="mb-8 text-sm font-light leading-relaxed text-st-text-muted sm:text-base">
          Book a free demo of {solution.title} and see how it works with your
          actual data. No commitment, no credit card required.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <button
            onClick={onAskAi}
            className="hero-btn-primary relative overflow-hidden rounded-xl px-8 py-3.5 text-sm font-light tracking-wide text-white transition-all duration-500"
          >
            <span className="relative z-10">Get a Free Demo</span>
          </button>
          <a
            href="/#contact"
            className="hero-btn-secondary relative overflow-hidden rounded-xl px-8 py-3.5 text-sm font-light tracking-wide text-st-text-muted transition-all duration-500 hover:text-white"
          >
            <span className="relative z-10">Contact Us</span>
          </a>
        </div>
      </div>
    </section>
  );
}
