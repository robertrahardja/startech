import type { CSSProperties } from "react";
import AiIcon from "./AiIcon";
import { usePointerGlow } from "../hooks/usePointerGlow";
import { AI_CHAT_ENABLED } from "../lib/features";
import { useI18n } from "../i18n";
import { fullStop, setsSolid } from "../i18n/locales";

interface HeroProps {
  onAskAi: () => void;
}

export default function Hero({ onAskAi }: HeroProps) {
  const { t, locale } = useI18n();
  // Japanese and Chinese set solid; Korean and Latin scripts keep spaces.
  const gap = setsSolid(locale) ? null : " ";
  const onPointerMove = usePointerGlow();

  return (
    <section
      id="hero"
      className="relative flex min-h-[92vh] items-center overflow-hidden px-6 pt-24 pb-16 sm:px-8 sm:pt-28 sm:pb-20"
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

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {/* Masthead — the mark and name at size, above the fold. Desktop only:
            on a phone the header logo already covers identity, and this much
            vertical space before the headline would push it off screen. */}
        <div className="mb-14 hidden items-center gap-6 animate-fade-in lg:flex">
          <div
            className="logo-3d h-24 w-28 shrink-0"
            style={{ "--mark-mask": "url(/assets/startech-mark.svg)" } as CSSProperties}
          >
            <img
              src="/assets/startech-mark.svg"
              alt=""
              aria-hidden="true"
              className="h-full w-full object-contain"
            />
          </div>
          <div>
            <div className="font-display text-5xl leading-none tracking-[-0.02em] text-st-text">
              StarTech
            </div>
            <div className="mt-2.5 text-[11px] font-medium tracking-[0.42em] uppercase text-st-text-muted">
              Innovation
            </div>
          </div>
        </div>

      <div className="grid w-full items-center gap-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
      <div>
        {/* Eyebrow */}
        <div
          className="mb-8 flex items-center gap-3 animate-fade-in"
          style={{ animationDelay: "0.05s" }}
        >
          <span className="brand-rule h-px w-10" />
          <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-st-text-muted sm:text-[10px] sm:tracking-[0.22em]">
            <span className="sm:hidden">{t.hero.eyebrowShort}</span>
            <span className="hidden sm:inline">{t.hero.eyebrowFull}</span>
          </span>
        </div>

        {/* Headline */}
        <h1
          className="max-w-4xl font-display text-[2.75rem] leading-[1.05] tracking-[-0.03em] text-st-text sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ textWrap: "balance" }}
        >
          {/* Four parts rather than five words: CJK locales do not put spaces
              between words and order the clause differently, so the catalogue
              supplies each fragment and the spacing comes from the locale. */}
          <span className="rise inline-block" style={{ animationDelay: "0.05s" }}>
            {t.hero.headlineLead}
          </span>
          {gap}
          <span
            className="rise gradient-text inline-block italic"
            style={{ animationDelay: "0.18s" }}
          >
            {t.hero.headlineBusiness}
          </span>
          {gap}
          <span className="rise inline-block" style={{ animationDelay: "0.3s" }}>
            {t.hero.headlineAnd}
          </span>
          {gap}
          <span
            className="rise gradient-text inline-block italic"
            style={{ animationDelay: "0.38s" }}
          >
            {t.hero.headlineTech}
          </span>
          <span className="rise inline-block" style={{ animationDelay: "0.46s" }}>
            {fullStop(locale)}
          </span>
        </h1>

        {/* Sub */}
        <p
          className="mt-6 max-w-2xl text-[1.0625rem] font-normal leading-[1.55] text-st-text-muted animate-fade-in-up sm:mt-8 sm:text-base sm:leading-[1.7] md:text-lg"
          style={{ animationDelay: "0.15s" }}
        >
          {t.hero.sub}
        </p>

        {/* CTAs — one primary action and two ways in for someone not ready
            to book yet. Each label names what the click does. */}
        <div
          className="mt-9 flex flex-col items-stretch gap-3 animate-fade-in-up sm:mt-12 sm:flex-row sm:items-center"
          style={{ animationDelay: "0.25s" }}
        >
          <a
            href="#contact"
            className="hero-btn-primary group relative overflow-hidden rounded-xl px-8 py-[1.15rem] text-center text-[15px] font-medium tracking-wide text-st-text transition-all duration-500 active:scale-[0.97] sm:py-4 sm:text-[13px]"
          >
            <span className="relative z-10 flex items-center justify-center gap-2.5">
              {t.hero.ctaPrimary}
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

          <a
            href="#work"
            onPointerMove={onPointerMove}
            className="hero-btn-secondary group relative overflow-hidden rounded-xl px-8 py-[1.15rem] text-center text-[15px] font-medium tracking-wide text-st-text-muted transition-all duration-500 hover:text-st-text sm:py-4 sm:text-[13px]"
          >
            <span className="relative z-10 flex items-center justify-center gap-2.5">
              {t.hero.ctaWork}
            </span>
          </a>

          {AI_CHAT_ENABLED && (
            <button
              onClick={onAskAi}
              onPointerMove={onPointerMove}
              className="hero-btn-secondary group relative overflow-hidden rounded-xl px-8 py-[1.15rem] text-[15px] font-medium tracking-wide text-st-text-muted transition-all duration-500 hover:text-st-text sm:py-4 sm:text-[13px]"
            >
              <span className="relative z-10 flex items-center justify-center gap-2.5">
                <AiIcon className="btn-spark h-3.5 w-3.5" />
                {t.hero.ctaAsk}
              </span>
            </button>
          )}
        </div>

        <p
          className="mt-5 text-[12.5px] font-normal leading-relaxed tracking-wide text-st-text-muted/70 animate-fade-in sm:text-[11px]"
          style={{ animationDelay: "0.3s" }}
        >
          {t.hero.note}
        </p>

        {/* Proof strip */}
        <div
          className="mt-11 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-7 border-t border-st-border pb-16 pt-7 animate-fade-in sm:mt-16 sm:grid-cols-4 sm:gap-x-8 sm:pb-0 sm:pt-8"
          style={{ animationDelay: "0.4s" }}
        >
          {[
            { figure: t.hero.proof.yearsFigure, label: t.hero.proof.yearsLabel },
            { figure: t.hero.proof.testsFigure, label: t.hero.proof.testsLabel },
            { figure: t.hero.proof.jurisdictionsFigure, label: t.hero.proof.jurisdictionsLabel },
            { figure: t.hero.proof.languagesFigure, label: t.hero.proof.languagesLabel },
          ].map((p, i) => (
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

      {/* The business card, as an object. Large screens only: it fills the
          right column that would otherwise be dead space, and it is the
          clearest possible statement of who this is. */}
      <div className="hidden lg:block">
        <div className="hero-card card-tilt mx-auto w-full max-w-md p-9">
          <div className="flex items-start justify-between gap-6">
            <img
              src="/assets/startech-logo-full.svg"
              alt=""
              className="h-16 w-auto"
            />
            <span className="brand-rule mt-2 h-px w-12" />
          </div>

          <div className="mt-10">
            <div className="font-display text-3xl leading-tight tracking-[-0.02em] text-st-text">
              Robert Rahardja
            </div>
            <div className="mt-1.5 text-[13px] font-normal tracking-wide text-st-text-muted">
              {t.hero.card.role}
            </div>
          </div>

          <div className="mt-8 gradient-text font-display text-xl tracking-[-0.01em]">
            {t.hero.card.tagline}
          </div>

          <dl className="mt-10 space-y-2.5 border-t border-st-border pt-6 text-[12.5px]">
            <div className="flex justify-between gap-4">
              <dt className="text-st-text-muted">{t.hero.card.country}</dt>
              <dd className="text-st-text-muted/80">{t.hero.card.uen}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-st-text-muted">{t.hero.card.workingIn}</dt>
              <dd className="text-st-text-muted/80">EN &middot; 中文 &middot; MS &middot; ID</dd>
            </div>
          </dl>
        </div>
      </div>
      </div>
      </div>
    </section>
  );
}
