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
      className="relative flex min-h-[92vh] items-center overflow-hidden px-6 pt-24 pb-16 sm:pt-28 sm:pb-20"
    >
      {/* Ambient light, echoing the indigo wave on the back of the card:
          one cool source top-left, a soft pink counterpoint bottom-right. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="glow-breathe absolute -top-40 -left-20 h-[620px] w-[900px] rounded-full bg-st-blue/[0.13] blur-[150px]" />
        <div
          className="glow-breathe absolute bottom-0 right-0 h-[420px] w-[560px] rounded-full bg-st-pink/[0.05] blur-[130px]"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        {/* Eyebrow */}
        <div
          className="mb-8 flex items-center gap-3 animate-fade-in"
          style={{ animationDelay: "0.05s" }}
        >
          <span className="brand-rule h-px w-10" />
          <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-st-text-muted sm:text-[10px] sm:tracking-[0.22em]">
            <span className="sm:hidden">Singapore &middot; SG + Indonesia</span>
            <span className="hidden sm:inline">
              Singapore &middot; Since 2021 &middot; SG + Indonesia
            </span>
          </span>
        </div>

        {/* Headline */}
        <h1
          className="max-w-3xl font-display text-[2.75rem] leading-[1.05] tracking-[-0.03em] text-st-text sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ textWrap: "balance" }}
        >
          <span className="rise inline-block" style={{ animationDelay: "0.05s" }}>
            We
          </span>{" "}
          <span className="rise inline-block" style={{ animationDelay: "0.12s" }}>
            speak
          </span>{" "}
          <span
            className="rise gradient-text inline-block italic"
            style={{ animationDelay: "0.2s" }}
          >
            business
          </span>{" "}
          <span className="rise inline-block" style={{ animationDelay: "0.3s" }}>
            and
          </span>{" "}
          <span
            className="rise gradient-text inline-block italic"
            style={{ animationDelay: "0.38s" }}
          >
            tech
          </span>
          <span className="rise inline-block" style={{ animationDelay: "0.46s" }}>
            .
          </span>
        </h1>

        {/* Sub */}
        <p
          className="mt-6 max-w-xl text-[1.0625rem] font-normal leading-[1.55] text-st-text-muted animate-fade-in-up sm:mt-8 sm:text-base sm:leading-[1.7] md:text-lg"
          style={{ animationDelay: "0.15s" }}
        >
          Most developers need your ledger explained. We already know what a
          trial balance is, what CPF is owed, and why the numbers have to
          reconcile &mdash; so you brief us once, in your own language, and get
          software that behaves the way your business actually works.
        </p>

        {/* CTAs */}
        <div
          className="mt-9 flex flex-col items-stretch gap-3 animate-fade-in-up sm:mt-12 sm:flex-row sm:items-center"
          style={{ animationDelay: "0.25s" }}
        >
          <a
            href="#contact"
            className="hero-btn-primary group relative overflow-hidden rounded-xl px-8 py-[1.15rem] text-center text-[15px] font-medium tracking-wide text-st-text transition-all duration-500 active:scale-[0.97] sm:py-4 sm:text-[13px]"
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
            className="hero-btn-secondary group relative overflow-hidden rounded-xl px-8 py-[1.15rem] text-[15px] font-medium tracking-wide text-st-text-muted transition-all duration-500 hover:text-st-text sm:py-4 sm:text-[13px]"
          >
            <span className="relative z-10 flex items-center justify-center gap-2.5">
              <AiIcon className="h-3.5 w-3.5" />
              Ask about our work
            </span>
          </button>
        </div>

        <p
          className="mt-5 text-[12.5px] font-normal leading-relaxed tracking-wide text-st-text-muted/70 animate-fade-in sm:text-[11px]"
          style={{ animationDelay: "0.3s" }}
        >
          A free 30-minute conversation &mdash; no brief document required.
          If software isn&apos;t the answer, we&apos;ll say so.
        </p>

        {/* Proof strip */}
        <div
          className="mt-11 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-7 border-t border-st-border pb-16 pt-7 animate-fade-in sm:mt-16 sm:grid-cols-4 sm:gap-x-8 sm:pb-0 sm:pt-8"
          style={{ animationDelay: "0.4s" }}
        >
          {PROOF.map((p, i) => (
            <div
              key={p.label}
              className="figure-in"
              style={{ animationDelay: `${0.55 + i * 0.09}s` }}
            >
              <div className="font-display text-[2rem] leading-none tracking-[-0.02em] text-st-text sm:text-2xl md:text-3xl">
                {p.figure}
              </div>
              <div className="mt-2 text-[11px] font-medium tracking-[0.12em] uppercase leading-snug text-st-text-muted sm:text-[10px] sm:tracking-[0.14em]">
                {p.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
