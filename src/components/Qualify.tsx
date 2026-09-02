import { useInView } from "../hooks/useInView";

/**
 * The qualifying step, immediately after the hero.
 *
 * Straight Line puts intelligence-gathering right after the open, and gates
 * the presentation behind two conditions: the product genuinely fits, and
 * they can afford it. A landing page cannot ask questions and hear answers,
 * so it does the next best thing — it states the situations it is for, and
 * plainly names the ones it is not, letting the visitor sift themselves.
 *
 * Naming who this is not for is the honest half. It costs some leads and
 * makes the remaining ones considerably better.
 */

const FITS = [
  {
    headline: "Your operation runs on spreadsheets and messages",
    body: "Inventory in one place, payments in another, decisions in a chat thread. It worked at ten people and it is now the thing holding you back.",
  },
  {
    headline: "A vendor already tried and it did not work",
    body: "You paid for a system your team will not use. You are wary of starting again, and you want to know what will be different this time.",
  },
  {
    headline: "You operate across Singapore and Indonesia",
    body: "CPF and IRAS on one side, BPJS and OJK on the other, and no single supplier who understands both without being taught.",
  },
  {
    headline: "The numbers have to be right, not roughly right",
    body: "Payroll, ledgers, claims, reconciliation — where an approximation is a liability rather than a rounding error.",
  },
];

const DOES_NOT_FIT = [
  "An off-the-shelf tool already does this. We will tell you which one.",
  "You need a marketing site, a logo, or a mobile app on its own.",
  "The budget is under about SGD 10,000 — the work will not fit inside it honestly.",
  "You want a fixed quote before anyone has looked at how you actually work.",
];

export default function Qualify() {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section id="fit" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div
          ref={ref}
          className={`mb-14 max-w-2xl transition-all duration-700 ${
            isInView ? "reveal visible" : "reveal"
          }`}
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="brand-rule h-px w-10" />
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-st-text-muted sm:text-[10px] sm:tracking-[0.22em]">
              Is this you?
            </span>
          </div>
          <h2 className="font-display text-3xl leading-[1.2] tracking-[-0.03em] text-st-text sm:text-4xl md:text-5xl">
            We are a good fit for four situations.
          </h2>
          <p className="mt-5 text-base font-normal leading-[1.7] text-st-text-muted">
            And a poor one for several others. It is cheaper for both of us to
            find that out now than three meetings in.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {FITS.map((fit, i) => (
            <FitCard key={fit.headline} fit={fit} index={i} />
          ))}
        </div>

        {/* The honest half. Deliberately plainer than the cards above — this
            is a disclosure, not a pitch. */}
        <div className="mt-12 max-w-2xl rounded-xl border border-st-border bg-st-surface p-7">
          <h3 className="text-[13px] font-medium tracking-[0.14em] uppercase text-st-text-muted">
            When to call someone else
          </h3>
          <ul className="mt-5 space-y-3">
            {DOES_NOT_FIT.map((item) => (
              <li key={item} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-[9px] h-px w-3 flex-none bg-st-text-muted/50"
                />
                <span className="text-[14.5px] font-normal leading-[1.7] text-st-text-muted">
                  {item}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-6 border-t border-st-border pt-5 text-[13.5px] leading-[1.7] text-st-text-muted/80">
            If one of these is you, say so on the call and we will point you at
            whoever is right — including a competitor. That costs us nothing and
            saves you a quarter.
          </p>
        </div>
      </div>
    </section>
  );
}

function FitCard({
  fit,
  index,
}: {
  fit: { headline: string; body: string };
  index: number;
}) {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`card pressable rounded-xl p-7 ${
        isInView ? "reveal visible" : "reveal"
      }`}
      style={{ transitionDelay: `${index * 70}ms` }}
    >
      <h3 className="font-display text-xl leading-[1.3] tracking-[-0.02em] text-st-text">
        {fit.headline}
      </h3>
      <p className="mt-3 text-[14.5px] font-normal leading-[1.7] text-st-text-muted">
        {fit.body}
      </p>
    </div>
  );
}
