import { useInView } from "../../hooks/useInView";
import { SectionHeader } from "../Products";
import Link from "./Link";
import {
  TIER_META,
  getSolutionsByTier,
} from "./solutionsData";
import type { Solution, SolutionTier } from "./solutionsData";

/* ─── Small icon map for cards ─────────────────────────────────────────── */
const ICONS: Record<string, React.ReactNode> = {
  scan: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),
  chat: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
    </svg>
  ),
  calendar: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  ),
  document: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),
  pen: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
  ),
  box: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    </svg>
  ),
  share: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
    </svg>
  ),
  globe: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  ),
  users: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),
  handshake: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3.15M10.05 4.575a1.575 1.575 0 013.15 0v3.15M10.05 4.575v3.15M3.75 7.725h16.5M3.75 7.725a3.375 3.375 0 00-3 3.345v1.68a3.375 3.375 0 003 3.345m16.5-8.37a3.375 3.375 0 013 3.345v1.68a3.375 3.375 0 01-3 3.345M3.75 16.095h16.5m-16.5 0a2.25 2.25 0 00-2.25 2.25v.75a2.25 2.25 0 002.25 2.25h16.5a2.25 2.25 0 002.25-2.25v-.75a2.25 2.25 0 00-2.25-2.25" />
    </svg>
  ),
  shield: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  graduation: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15v-3.75m0 0h10.5" />
    </svg>
  ),
  barchart: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  ),
};

const TIER_ORDER: SolutionTier[] = ["quick-win", "medium", "premium"];

const TIER_DESCRIPTIONS: Record<SolutionTier, string> = {
  "quick-win":
    "Deploy in days. Immediate ROI. Perfect first step into AI for your business.",
  medium:
    "More powerful automation that transforms how your team works day-to-day.",
  premium:
    "Enterprise-grade AI solutions for complex, high-value business processes.",
};

/* ─── Solutions Index Page ─────────────────────────────────────────────── */
export default function SolutionsIndex({ onAskAi }: { onAskAi: () => void }) {
  return (
    <>
      {/* Hero */}
      <IndexHero onAskAi={onAskAi} />

      {/* Tiers */}
      {TIER_ORDER.map((tier) => (
        <TierSection key={tier} tier={tier} />
      ))}

      {/* Bottom CTA */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-2xl px-6 text-center sm:px-8">
          <h2 className="mb-4 font-display text-2xl text-white sm:text-3xl md:text-4xl">
            Not sure which solution fits?
          </h2>
          <p className="mb-8 text-sm font-light leading-relaxed text-st-text-muted sm:text-base">
            Tell us about your business challenge and we will recommend the right
            AI solution, complete with a grant application plan.
          </p>
          <button
            onClick={onAskAi}
            className="hero-btn-primary relative overflow-hidden rounded-xl px-8 py-3.5 text-sm font-light tracking-wide text-white transition-all duration-500"
          >
            <span className="relative z-10">Talk to Our AI Advisor</span>
          </button>
        </div>
      </section>
    </>
  );
}

/* ─── Index Hero ───────────────────────────────────────────────────────── */
function IndexHero({ onAskAi }: { onAskAi: () => void }) {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
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
          <span className="text-st-text-muted/60">Solutions</span>
        </nav>

        <span className="mb-4 inline-block text-[10px] font-light tracking-[0.2em] uppercase text-st-text-muted">
          13 AI Solutions for SMEs
        </span>

        <h1 className="mb-4 font-display text-3xl tracking-[-0.02em] text-white sm:text-4xl md:text-5xl lg:text-6xl">
          AI Solutions
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-base font-light leading-relaxed text-st-text-muted sm:text-lg">
          Production-ready AI tools designed for Singapore SMEs. Government grant
          eligible. Deploy in days, not months.
        </p>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <button
            onClick={onAskAi}
            className="hero-btn-primary relative overflow-hidden rounded-xl px-7 py-3 text-sm font-light tracking-wide text-white transition-all duration-500"
          >
            <span className="relative z-10">Get a Free Consultation</span>
          </button>
          <a
            href="/#contact"
            className="hero-btn-secondary relative overflow-hidden rounded-xl px-7 py-3 text-sm font-light tracking-wide text-st-text-muted transition-all duration-500 hover:text-white"
          >
            <span className="relative z-10">Contact Us</span>
          </a>
        </div>

        {/* Grant callout */}
        <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-st-gold/15 bg-st-gold/5 px-4 py-2 text-[11px] font-light text-st-gold-light">
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          PSG Grant Eligible: up to 50% subsidy on all solutions
        </div>
      </div>
    </section>
  );
}

/* ─── Tier Section ─────────────────────────────────────────────────────── */
function TierSection({ tier }: { tier: SolutionTier }) {
  const solutions = getSolutionsByTier(tier);
  const meta = TIER_META[tier];

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeader
          label={meta.label}
          title={
            tier === "quick-win"
              ? "Quick wins"
              : tier === "medium"
                ? "Medium builds"
                : "Premium solutions"
          }
          subtitle={TIER_DESCRIPTIONS[tier]}
        />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution, i) => (
            <SolutionCard key={solution.slug} solution={solution} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Solution Card ────────────────────────────────────────────────────── */
function SolutionCard({
  solution,
  index,
}: {
  solution: Solution;
  index: number;
}) {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const tier = TIER_META[solution.tier];

  return (
    <Link href={`/solutions/${solution.slug}`}>
      <div
        ref={ref}
        className={`card group h-full rounded-xl p-5 sm:p-6 ${isInView ? "reveal visible" : "reveal"}`}
        style={{ transitionDelay: `${index * 60}ms` }}
      >
        <div className="flex h-full flex-col">
          {/* Top row: icon + badge */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.04] text-st-text-muted transition-colors duration-300 group-hover:text-st-text">
              {ICONS[solution.icon]}
            </div>
            <span
              className={`rounded-full px-2.5 py-0.5 text-[9px] font-medium tracking-[0.1em] uppercase ${tier.badgeClass}`}
            >
              {tier.label}
            </span>
          </div>

          {/* Title */}
          <h3 className="mb-2 text-sm font-medium tracking-wide text-white md:text-base">
            {solution.title}
          </h3>

          {/* Tagline */}
          <p className="mb-4 flex-1 text-[13px] font-light leading-relaxed text-st-text-muted">
            {solution.tagline}
          </p>

          {/* Pricing row */}
          <div className="flex items-end justify-between border-t border-st-border pt-4">
            <div>
              <div className="text-[10px] font-light text-st-text-muted/60">
                From
              </div>
              <div className="text-sm font-medium text-white">
                S${solution.priceFrom}
                <span className="text-[11px] font-light text-st-text-muted">/mo</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-light text-st-gold-light/60">
                With PSG
              </div>
              <div className="text-sm font-medium text-st-gold-light">
                S${solution.pricePsg}
                <span className="text-[11px] font-light text-st-gold-light/60">/mo</span>
              </div>
            </div>
          </div>

          {/* View arrow */}
          <div className="mt-3 flex items-center justify-end">
            <span className="text-[10px] font-light tracking-[0.15em] uppercase text-st-text-muted/40 transition-colors duration-300 group-hover:text-st-gold-light/60">
              Learn more
              <svg
                className="ml-1 inline h-3 w-3"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
