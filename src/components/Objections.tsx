import { useState } from "react";
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

interface Objection {
  id: string;
  /** Phrased as the client would ask it, not as an objection to overcome. */
  said: string;
  answer: string;
  /** The verifiable part, where one exists. */
  proof?: string;
}

const OBJECTIONS: Objection[] = [
  {
    id: "burned",
    said: "We have paid for this once before and could not use it. What is different?",
    answer:
      "Usually the build was fine and the requirements were wrong — nobody sat with the people doing the work before the code started. So we do discovery first and you own the output whether or not you continue with us. If the previous system is salvageable we will say so; rewriting something that mostly works is a bad use of your money.",
    proof:
      "The vehicle-export rebuild started as a rescue of exactly this kind.",
  },
  {
    id: "solo",
    said: "What happens to the system if you are unavailable?",
    answer:
      "The principal writes the core and specialists are brought in as the work demands. What protects you is not headcount, it is that the system is documented, tested and deployed on infrastructure you own — your Cloudflare account, your database, your repository. Another engineer can pick it up because the tests describe what it is supposed to do.",
    proof: "7,060 automated tests across 484 calculator classes.",
  },
  {
    id: "price",
    said: "What does something like this usually cost?",
    answer:
      "You get a range on the first call and a firm number after discovery. We will say the real figure early rather than late, then cut scope together until it fits — a smaller system that ships beats a large one that stalls. Singapore SMEs can offset up to half through PSG, and we prepare that paperwork at no charge.",
    proof: "Eligibility confirmed against current IMDA criteria, not assumed.",
  },
  {
    id: "timing",
    said: "Is there a cost to waiting a quarter or two?",
    answer:
      "Sometimes none, and we will say so. We would rather you called when the problem is urgent than commit while it is not. Worth knowing: the cost of waiting is usually not the software, it is the manual reconciliation and the mistakes in between. If you want, we will quantify that on the call and you can decide with a number in front of you.",
  },
  {
    id: "understand",
    said: "How much will we have to explain about how our business works?",
    answer:
      "That is the entire reason this firm exists. You will not be explaining what a trial balance is, what CPF is owed, or why a claim reconciles the way it does. Brief us the way you would brief your accountant.",
    proof:
      "The payroll engine is verified scenario by scenario against CPF Board tables.",
  },
];

export default function Objections() {
  const [open, setOpen] = useState<string | null>(OBJECTIONS[0].id);
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
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-st-text-muted sm:text-[10px] sm:tracking-[0.22em]">
              Straight answers
            </span>
          </div>
          <h2 className="font-display text-3xl leading-[1.2] tracking-[-0.03em] text-st-text sm:text-4xl md:text-5xl">
            Questions worth asking first.
          </h2>
          <p className="mt-5 text-base font-normal leading-[1.7] text-st-text-muted">
            The ones we get asked most, answered plainly &mdash; including
            where the honest answer is that you should wait.
          </p>
        </div>

        <div className="max-w-3xl divide-y divide-st-border border-y border-st-border">
          {OBJECTIONS.map((objection) => {
            const isOpen = open === objection.id;
            return (
              <div key={objection.id}>
                <button
                  onClick={() => {
                    haptic("select");
                    setOpen(isOpen ? null : objection.id);
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
