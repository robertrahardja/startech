import { useState, useEffect } from "react";
import AiIcon from "./AiIcon";

interface HeroProps {
  onAskAi: () => void;
}

const ROTATING_WORDS = [
  "AI Implementation",
  "Enterprise Software",
  "Financial Systems",
  "Healthcare IT",
  "Education Platforms",
];

export default function Hero({ onAskAi }: HeroProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
        setIsAnimating(false);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      {/* Breathing glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="glow-breathe absolute top-0 left-1/2 h-[700px] w-[900px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-st-blue/[0.06] blur-[160px]" />
        <div className="glow-breathe absolute bottom-1/4 right-0 h-[400px] w-[500px] rounded-full bg-st-gold/[0.02] blur-[120px]" style={{ animationDelay: "3s" }} />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        {/* Logo */}
        <div className="mb-14 flex justify-center animate-fade-in">
          <img
            src="/assets/startech-logo-full.png"
            alt="StarTech Innovation"
            className="h-20 w-auto sm:h-24 md:h-28"
          />
        </div>

        {/* Main headline with rotating word */}
        <div className="mb-6 animate-fade-in-up">
          <h1 className="font-display text-[1.75rem] leading-[1.2] tracking-[-0.03em] text-white sm:text-3xl md:text-4xl lg:text-5xl">
            We build what your
            <br />
            business needs in
          </h1>
          <div className="mt-1 h-[1.4em] overflow-hidden text-[1.75rem] sm:text-3xl md:text-4xl lg:text-5xl">
            <span
              key={wordIndex}
              className={`inline-block font-display italic leading-[1.4] tracking-[-0.03em] ${
                isAnimating ? "word-rotate-exit" : "word-rotate-enter"
              }`}
            >
              {ROTATING_WORDS[wordIndex]}
            </span>
          </div>
        </div>

        {/* Tagline */}
        <p
          className="mx-auto mb-3 font-display text-lg italic tracking-[-0.01em] text-st-text-muted/70 sm:text-xl animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          Business. Finance. Tech.
        </p>

        {/* Gold glimmer line */}
        <div
          className="mx-auto mb-10 h-px w-24 gold-glimmer animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        />

        {/* Description */}
        <div
          className="mx-auto mb-12 max-w-md animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          <p className="text-[15px] font-light leading-[1.7] text-st-text-muted">
            Enterprise AI implementation and software engineering
            for organisations across Singapore and Southeast Asia.
            Strategy to production in 90 days.
          </p>
        </div>

        {/* CTAs */}
        <div
          className="mb-16 flex flex-col items-center justify-center gap-3 sm:flex-row animate-fade-in-up"
          style={{ animationDelay: "0.45s" }}
        >
          <button
            onClick={onAskAi}
            className="hero-btn-primary group relative overflow-hidden rounded-xl px-8 py-4 text-[13px] font-light tracking-wide text-white transition-all duration-500 active:scale-[0.97]"
          >
            <span className="relative z-10 flex items-center gap-2.5">
              <AiIcon className="h-3.5 w-3.5 text-st-gold-light transition-all duration-500 group-hover:text-st-gold" />
              Ask about us
            </span>
          </button>
          <a
            href="#contact"
            className="hero-btn-secondary group relative overflow-hidden rounded-xl px-8 py-4 text-[13px] font-light tracking-wide text-st-text-muted transition-all duration-500 hover:text-white"
          >
            <span className="relative z-10">Get in touch</span>
          </a>
        </div>

        {/* Trust signals */}
        <div
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 animate-fade-in-up"
          style={{ animationDelay: "0.6s" }}
        >
          <span className="text-[10px] font-light tracking-[0.2em] uppercase text-st-text-muted">
            Singapore
          </span>
          <span className="h-3 w-px bg-st-text-muted/30" />
          <span className="text-[10px] font-light tracking-[0.2em] uppercase text-st-text-muted">
            20+ years
          </span>
          <span className="h-3 w-px bg-st-text-muted/30" />
          <span className="text-[10px] font-light tracking-[0.2em] uppercase text-st-text-muted">
            Indonesia
          </span>
        </div>
      </div>

      {/* Scroll line */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="line-grow h-12 w-px bg-gradient-to-b from-transparent via-st-text-muted/10 to-st-text-muted/20" />
      </div>
    </section>
  );
}
