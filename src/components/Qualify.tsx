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
 * makes the remaining ones considerably better — but it is set quietly, as a
 * single line under the fits rather than a panel of its own. The exclusions
 * should not carry more visual weight than the work.
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
    headline: "You operate across borders",
    body: "A Japanese exporter shipping worldwide. A European or American company with an Asian entity. A Singapore business hiring in Indonesia. Different currencies, tax regimes and filing calendars in one system — and no single supplier who understands both ends without being taught.",
  },
  {
    headline: "The numbers have to be right, not roughly right",
    body: "Payroll, ledgers, claims, reconciliation — where an approximation is a liability rather than a rounding error.",
  },
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
            Where we do our best work.
          </h2>
          <p className="mt-5 text-base font-normal leading-[1.7] text-st-text-muted">
            Most of our work starts in one of these. If yours looks different,
            it is still worth a call &mdash; the shape of the problem matters
            more than the industry it sits in.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {FITS.map((fit, i) => (
            <FitCard key={fit.headline} fit={fit} index={i} />
          ))}
        </div>

        {/* The honest half, kept quiet. This is a disclosure, not a pitch —
            a bordered card with a heading would make the exclusions louder
            than the fit, which is the wrong emphasis. */}
        <div className="mt-10 max-w-3xl border-t border-st-border pt-7">
          <p className="text-[14px] leading-[1.8] text-st-text-muted/75">
            <span className="text-st-text-muted">Less so</span> if an
            off-the-shelf tool already covers it (we will tell you which one),
            if you need a marketing site or a logo on its own, or if you want a
            fixed quote before anyone has looked at how you work. If that is
            you, we will point you at whoever is right &mdash; including a
            competitor.
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
