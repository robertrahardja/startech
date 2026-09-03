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

        <div className="max-w-3xl divide-y divide-st-border border-y border-st-border">
          {t.objections.items.map((objection, i) => {
            const isOpen = open === i;
            return (
              <div key={objection.said}>
                <button
                  onClick={() => {
                    haptic("select");
                    setOpen(isOpen ? null : i);
                  }}
                  aria-expanded={isOpen}
                  className="flex w-full items-start justify-between gap-6 py-6 text-left transition-colors duration-300"
                >
                  <span
                    className={`font-display text-lg leading-[1.35] tracking-[-0.01em] transition-colors duration-300 sm:text-xl ${
                      isOpen ? "text-st-text" : "text-st-text-muted"
                    }`}
                  >
                    &ldquo;{objection.said}&rdquo;
                  </span>
                  <span
                    aria-hidden="true"
                    className={`mt-1.5 flex h-6 w-6 flex-none items-center justify-center transition-transform duration-400 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    <svg
                      className="h-3.5 w-3.5 text-st-text-muted"
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
                    <div className="pb-7 pr-10">
                      <p className="text-[15px] font-normal leading-[1.75] text-st-text-muted">
                        {objection.answer}
                      </p>
                      {objection.proof && (
                        <p className="mt-4 border-l border-st-blue/40 pl-4 text-[13px] leading-[1.6] text-st-blue-light">
                          {objection.proof}
                        </p>
                      )}
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
