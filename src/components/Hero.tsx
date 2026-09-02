import AiIcon from "./AiIcon";

interface HeroProps {
  onAskAi: () => void;
}

/** Proof points shown under the fold-line. Every figure is verifiable. */
const PROOF = [
  { figure: "20+", label: "years, both sides" },
  { figure: "7,060", label: "tests that must pass" },
  { figure: "2", label: "jurisdictions" },
  { figure: "4", label: "languages" },
];

export default function Hero({ onAskAi }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative flex min-h-[92vh] items-center overflow-hidden px-6 pt-28 pb-20"
    >
      {/* Soft tint behind the headline — barely there, keeps the paper warm */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-st-blue/[0.05] blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        {/* Eyebrow */}
        <div
          className="mb-8 flex items-center gap-3 animate-fade-in"
          style={{ animationDelay: "0.05s" }}
        >
          <span className="h-px w-8 bg-st-gold/60" />
          <span className="text-[10px] font-medium tracking-[0.22em] uppercase text-st-text-muted">
            Singapore &middot; Since 2021 &middot; SG + Indonesia
          </span>
        </div>

        {/* Headline */}
        <h1
          className="max-w-3xl font-display text-4xl leading-[1.08] tracking-[-0.03em] text-st-text animate-fade-in-up sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ textWrap: "balance" }}
        >
          We speak <span className="italic gradient-text">business</span> and{" "}
          <span className="italic gradient-text">tech</span>.
        </h1>

        {/* Sub */}
        <p
          className="mt-8 max-w-xl text-base font-normal leading-[1.7] text-st-text-muted animate-fade-in-up md:text-lg"
          style={{ animationDelay: "0.15s" }}
        >
          Most developers need your ledger explained. We already know what a
          trial balance is, what CPF is owed, and why the numbers have to
          reconcile &mdash; so you brief us once, in your own language, and get
          software that behaves the way your business actually works.
        </p>

        {/* CTAs */}
        <div
          className="mt-12 flex flex-col items-stretch gap-3 animate-fade-in-up sm:flex-row sm:items-center"
          style={{ animationDelay: "0.25s" }}
        >
          <a
            href="#contact"
            className="hero-btn-primary group relative overflow-hidden rounded-xl px-8 py-4 text-center text-[13px] font-medium tracking-wide text-st-text transition-all duration-500 active:scale-[0.97]"
          >
            <span className="relative z-10 flex items-center justify-center gap-2.5">
              Tell me about your business
              <svg
                className="h-3.5 w-3.5 text-white/80 transition-all duration-500 group-hover:translate-x-0.5 group-hover:text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </span>
          </a>

          <button
            onClick={onAskAi}
            className="hero-btn-secondary group relative overflow-hidden rounded-xl px-8 py-4 text-[13px] font-medium tracking-wide text-st-text-muted transition-all duration-500 hover:text-st-text"
          >
            <span className="relative z-10 flex items-center justify-center gap-2.5">
              <AiIcon className="h-3.5 w-3.5" />
              Ask about our work
            </span>
          </button>
        </div>

        <p
          className="mt-5 text-[11px] font-normal tracking-wide text-st-text-muted/70 animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          A free 30-minute conversation &mdash; no brief document required.
          If software isn&apos;t the answer, we&apos;ll say so.
        </p>

        {/* Proof strip */}
        <div
          className="mt-16 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-6 border-t border-st-border pt-8 animate-fade-in sm:grid-cols-4"
          style={{ animationDelay: "0.4s" }}
        >
          {PROOF.map((p) => (
            <div key={p.label}>
              <div className="font-display text-2xl leading-none tracking-[-0.02em] text-st-text md:text-3xl">
                {p.figure}
              </div>
              <div className="mt-2 text-[10px] font-medium tracking-[0.14em] uppercase leading-snug text-st-text-muted">
                {p.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
