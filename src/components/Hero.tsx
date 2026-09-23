import { useRef, useState, type CSSProperties } from "react";
import AiIcon from "./AiIcon";
import { usePointerGlow } from "../hooks/usePointerGlow";
import { AI_CHAT_ENABLED } from "../lib/features";
import { getCatalogue, loadCatalogue, useI18n } from "../i18n";
import {
  LOCALES,
  LOCALE_META,
  fullStop,
  localePath,
  parseLocalePath,
  setsSolid,
  type Locale,
} from "../i18n/locales";

interface HeroProps {
  onAskAi: () => void;
}

export default function Hero({ onAskAi }: HeroProps) {
  const { t, locale } = useI18n();
  // Japanese and Chinese set solid; Korean and Latin scripts keep spaces.
  const gap = setsSolid(locale) ? null : " ";
  const onPointerMove = usePointerGlow();

  // Hovering (or, on touch, tapping) a language in the strip below previews
  // that language's note line in place, without switching the page's actual
  // locale. null means "not previewing" — show the real page language.
  //
  // loadCatalogue() is async and getCatalogue() only reads whatever is
  // already cached, so a preview requested this render is never ready this
  // render — it has to land in state once the import actually resolves, or
  // the very first hover of each language would silently show nothing.
  //
  // Touch has no real "leave" — a tap fires focus with no matching blur if
  // the page scrolls instead, which would otherwise leave the preview stuck
  // showing another language indefinitely. A self-clearing timeout closes
  // that (and any other stuck-preview edge case) without needing to special
  // case touch vs. mouse at all.
  const [previewNote, setPreviewNote] = useState<string | null>(null);
  const previewRequestRef = useRef(0);
  const previewClearTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const previewLanguage = (target: Locale | null) => {
    const requestId = ++previewRequestRef.current;
    if (previewClearTimerRef.current) clearTimeout(previewClearTimerRef.current);

    if (target === null) {
      setPreviewNote(null);
      return;
    }

    previewClearTimerRef.current = setTimeout(() => {
      if (previewRequestRef.current === requestId) setPreviewNote(null);
    }, 4000);

    const cached = getCatalogue(target);
    if (cached) {
      setPreviewNote(cached.hero.note);
      return;
    }
    setPreviewNote(null);
    void loadCatalogue(target).then(() => {
      // A later hover may have started and finished while this one was
      // still loading — only the most recent request should ever win.
      if (previewRequestRef.current !== requestId) return;
      const loaded = getCatalogue(target);
      if (loaded) setPreviewNote(loaded.hero.note);
    });
  };

  const noteText = previewNote ?? t.hero.note;

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
          className="mb-6 flex items-center gap-2.5 animate-fade-in sm:mb-8 sm:gap-3"
          style={{ animationDelay: "0.05s" }}
        >
          <span className="brand-rule h-px w-8 sm:w-10" />
          <span className="whitespace-nowrap text-[10px] font-medium tracking-[0.08em] uppercase text-st-text-muted sm:text-[10px] sm:tracking-[0.22em]">
            <span className="sm:hidden">{t.hero.eyebrowShort}</span>
            <span className="hidden sm:inline">{t.hero.eyebrowFull}</span>
          </span>
        </div>

        {/* Headline — 2.4rem rather than the 2.75rem this scales up to at
            sm:: on a 390px phone, lines at 2.75rem ran close enough to both
            24px margins that the margin stopped reading as a margin. A
            slightly smaller mobile size leaves visible slack at the line
            ends, so the gutter is felt rather than just technically present.

            A plain opacity fade-in on load — no translateY, no per-word
            stagger. Tried a scratches-clearing-to-clean effect here first;
            it read as broken rather than deliberate, so it's gone. This is
            just the headline appearing. */}
        <h1
          className="animate-fade-in max-w-4xl font-display text-[3.4rem] leading-[1.02] tracking-[-0.03em] text-st-text sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ textWrap: "balance" }}
        >
          {/* Four parts rather than five words: CJK locales do not put spaces
              between words and order the clause differently, so the catalogue
              supplies each fragment and the spacing comes from the locale. */}
          <span className="inline-block">{t.hero.headlineLead}</span>
          {gap}
          <span className="gradient-text inline-block italic">
            {t.hero.headlineBusiness}
          </span>
          {gap}
          <span className="inline-block">{t.hero.headlineAnd}</span>
          {gap}
          <span className="gradient-text inline-block italic">
            {t.hero.headlineTech}
          </span>
          <span className="inline-block">{fullStop(locale)}</span>
        </h1>

        {/* Sub */}
        <p
          className="mt-6 max-w-2xl text-[1.0625rem] font-normal leading-[1.55] text-st-text-muted animate-fade-in-up sm:mt-8 sm:text-base sm:leading-[1.7] md:text-lg"
          style={{ animationDelay: "0.15s" }}
        >
          {t.hero.sub}
        </p>

        {/* CTAs — one primary action, full weight; the rest step down in
            size so the row reads as a hierarchy on a phone, not three
            equally-loud blocks stacked on top of each other. */}
        <div
          className="mt-8 flex flex-col items-stretch gap-2.5 animate-fade-in-up sm:mt-12 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3"
          style={{ animationDelay: "0.25s" }}
        >
          <a
            href="#contact"
            className="hero-btn-primary group relative overflow-hidden rounded-xl px-8 py-4 text-center text-[15px] font-medium tracking-wide text-st-text transition-all duration-500 active:scale-[0.97] sm:py-4 sm:text-[13px]"
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

          <div className="flex flex-row flex-wrap items-stretch gap-2 sm:contents">
            <a
              href="#work"
              onPointerMove={onPointerMove}
              className="hero-btn-secondary group relative flex-1 overflow-hidden rounded-lg px-4 py-2.5 text-center text-[12.5px] font-medium tracking-wide text-st-text-muted transition-all duration-500 hover:text-st-text sm:flex-none sm:rounded-xl sm:px-8 sm:py-4 sm:text-[13px]"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {t.hero.ctaWork}
              </span>
            </a>

            {AI_CHAT_ENABLED && (
              <button
                onClick={onAskAi}
                onPointerMove={onPointerMove}
                className="hero-btn-secondary group relative flex-1 overflow-hidden rounded-lg px-4 py-2.5 text-[12.5px] font-medium tracking-wide text-st-text-muted transition-all duration-500 hover:text-st-text sm:flex-none sm:rounded-xl sm:px-8 sm:py-4 sm:text-[13px]"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <AiIcon className="btn-spark h-3.5 w-3.5" />
                  {t.hero.ctaAsk}
                </span>
              </button>
            )}

            <a
              href="#capability-deck"
              onPointerMove={onPointerMove}
              className="hero-btn-secondary group relative flex-1 overflow-hidden rounded-lg px-4 py-2.5 text-center text-[12.5px] font-medium tracking-wide transition-all duration-500 sm:flex-none sm:rounded-xl sm:px-8 sm:py-4 sm:text-[13px]"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <span className="deck-text-shine deck-shine-play">{t.hero.ctaDeck}</span>
              </span>
            </a>
          </div>
        </div>

        <HeroLanguageStrip
          locale={locale}
          label={t.hero.languagesAvailable}
          readInLanguage={t.hero.readInLanguage}
          onPreview={previewLanguage}
        />

        <p
          className="mt-5 min-h-[2.6em] text-[12.5px] font-normal leading-relaxed tracking-wide text-st-text-muted/85 transition-opacity duration-200 animate-fade-in sm:min-h-[2.2em] sm:text-[11px]"
          style={{ animationDelay: "0.3s" }}
        >
          {noteText}
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

/**
 * A quiet proof that the site itself is multilingual, not just a claim — the
 * seven languages this page is actually published in, each a real link to
 * the same page in that language. Sits below the CTAs at the same low key
 * as the note beneath it: present as a fact, not pitched as a fourth choice.
 *
 * On a mouse, hovering previews the note below in that language — no click
 * needed, nothing navigates until you actually choose to. Touch has no
 * hover, and a tap that both previewed AND navigated would mean the preview
 * is never actually seen, just flashed through on the way to a page reload.
 * So on touch a tap only previews and holds the page (armed, ready to go);
 * an earlier version switched on a second tap of the same link, but the
 * languages sit close enough together that a reflexive double-tap — common
 * on touch, not malicious, just how people confirm a tap landed — would
 * silently switch the page's language by accident. Switching now needs a
 * separate "Read in ..." button that only appears once armed: a real,
 * deliberately different target, not a repeat of the gesture that could
 * misfire.
 */
function HeroLanguageStrip({
  locale,
  label,
  readInLanguage,
  onPreview,
}: {
  locale: string;
  label: string;
  readInLanguage: string;
  onPreview: (locale: Locale | null) => void;
}) {
  const { path } = parseLocalePath(window.location.pathname);
  const [armed, setArmed] = useState<Locale | null>(null);

  return (
    <div
      className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1.5 animate-fade-in sm:mt-7"
      style={{ animationDelay: "0.32s" }}
    >
      <span className="text-[11px] font-normal tracking-wide text-st-text-muted/60 sm:text-[10.5px]">
        {label}
      </span>
      {/* text-wrap: balance (via .text-balance) needs an ordinary inline
          flow to work with — flexbox's own line-wrapping ignores it — so
          this is a plain inline block of <a> tags, not flex/flex-wrap.
          That's what stops a lone language stranding itself alone on the
          last line at odd widths: the browser balances line lengths
          instead of packing every line as full as it'll go. */}
      <nav aria-label="Language" className="text-balance">
        {LOCALES.map((code, i) => (
          <span key={code} className="inline-block whitespace-nowrap">
            <a
              href={localePath(code, path)}
              hrefLang={LOCALE_META[code].htmlLang}
              aria-current={code === locale ? "true" : undefined}
              onMouseEnter={() => onPreview(code)}
              onMouseLeave={() => onPreview(null)}
              onFocus={() => onPreview(code)}
              onBlur={() => onPreview(null)}
              // Touch never navigates directly from this link — the links
              // sit close together, and a reflexive double-tap (checking a
              // tap registered, a stray second touch) would otherwise switch
              // the page's language by accident. A tap here only previews;
              // actually switching needs the separate "Read in ..." button
              // that appears right after it, a real second target rather
              // than a second tap on the same small link.
              onTouchEnd={(e) => {
                e.preventDefault();
                setArmed(code);
                onPreview(code);
              }}
              // The separator lives on the link itself, and each link is
              // now wrapped in its own <span> (so the "Read in..." button
              // can travel with its language instead of wrapping onto a
              // line by itself) — first:before:content-none no longer
              // means "first language overall" once every <a> is its
              // parent span's only/first child, so the true first item is
              // singled out by index instead.
              className={`text-[11px] font-normal tracking-wide transition-colors duration-300 before:mx-2 before:text-st-text-muted/30 before:content-['·'] sm:text-[10.5px] ${
                i === 0 ? "before:content-none before:mx-0" : ""
              } ${
                code === locale
                  ? "text-st-text-muted"
                  : armed === code
                    ? "text-st-text-muted"
                    : "text-st-text-muted/50 hover:text-st-text-muted"
              }`}
            >
              {LOCALE_META[code].label}
            </a>

            {/* Touch only in practice — a mouse never sets `armed`, since a
                click on the link above already navigates immediately
                there. Sits right after the armed language, on the same
                line, so it reads as "this one, confirmed" rather than a
                detached instruction elsewhere on the page. */}
            {armed === code && (
              <a
                href={localePath(code, path)}
                className="ml-2 text-[11px] font-medium text-st-blue-light underline underline-offset-2 sm:text-[10.5px]"
              >
                {readInLanguage.replace("{language}", LOCALE_META[code].label)}
              </a>
            )}
          </span>
        ))}
      </nav>
    </div>
  );
}
