import { useState } from "react";
import { useI18n } from "../i18n";
import { useInView } from "../hooks/useInView";
import { haptic } from "../lib/haptics";

/**
 * The questions clients actually ask before committing, answered plainly.
 *
 * These are the doubts we know are in the room — a previous build that
 * failed, what happens if the principal is unavailable, cost, timing, how
 * much of their business they will have to explain. Answering them here
 * saves a call, and answering them badly would be worse than staying quiet,
 * so each answer carries something checkable.
 *
 * Written as questions a client would ask, not as objections to overcome.
 * The reader should never be able to tell that a sales framework shaped
 * this page.
 */

export default function Objections() {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(0);
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section id="objections" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div
          ref={ref}
          className={`mb-12 max-w-2xl transition-all duration-700 ${
            isInView ? "reveal visible" : "reveal"
          }`}
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="brand-rule h-px w-10" />
            <span className="label-in text-[11px] font-medium tracking-[0.2em] uppercase text-st-text-muted sm:text-[10px] sm:tracking-[0.22em]">
              {t.objections.eyebrow}
            </span>
          </div>
          <h2 className="font-display text-3xl leading-[1.2] tracking-[-0.03em] text-st-text sm:text-4xl md:text-5xl">
            {t.objections.title}
          </h2>
          <p className="mt-5 text-base font-normal leading-[1.7] text-st-text-muted">
            {t.objections.sub}
          </p>
        </div>

        <div className="max-w-3xl space-y-3">
          {t.objections.items.map((objection, i) => {
            const isOpen = open === i;
            return (
              <div
                key={objection.said}
                className={`overflow-hidden rounded-xl border transition-colors duration-[400ms] ${
                  isOpen
                    ? "border-st-border-hover bg-st-bg-card"
                    : "border-st-border"
                }`}
              >
                <button
                  onClick={() => {
                    haptic("select");
                    setOpen(isOpen ? null : i);
                  }}
                  aria-expanded={isOpen}
                  className="flex w-full items-start gap-4 px-5 py-5 text-left transition-colors duration-300 sm:gap-5 sm:px-6"
                >
                  <span
                    aria-hidden="true"
                    className={`gradient-text font-display text-lg leading-[1.35] tracking-[-0.02em] transition-opacity duration-300 sm:text-xl ${
                      isOpen ? "opacity-100" : "opacity-40"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span
                    className={`flex-1 font-display text-lg leading-[1.35] tracking-[-0.01em] transition-colors duration-300 sm:text-xl ${
                      isOpen ? "text-st-text" : "text-st-text-muted"
                    }`}
                  >
                    &ldquo;{objection.said}&rdquo;
                  </span>

                  <span
                    aria-hidden="true"
                    className={`mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-lg transition-colors duration-300 ${
                      isOpen ? "bg-st-surface" : ""
                    }`}
                  >
                    <svg
                      className={`h-3.5 w-3.5 text-st-text-muted transition-transform duration-400 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-500 ease-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="flex gap-4 px-5 pb-6 sm:gap-5 sm:px-6">
                      <span className="w-6 flex-none sm:w-7" aria-hidden="true" />
                      <div className="min-w-0 flex-1 border-t border-st-border/60 pr-10 pt-5">
                        <p className="text-[15px] font-normal leading-[1.75] text-st-text-muted">
                          {objection.answer}
                        </p>
                        {objection.proof && (
                          <p className="mt-4 border-l-2 border-st-blue/50 pl-4 text-[13px] leading-[1.6] text-st-blue-light">
                            {objection.proof}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
