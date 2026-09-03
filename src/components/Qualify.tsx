import { useInView } from "../hooks/useInView";
import { useI18n } from "../i18n";

/**
 * The qualifying step, immediately after the hero.
 *
 * Straight Line puts intelligence-gathering right after the open, and gates
 * the presentation behind two conditions: the product genuinely fits, and
 * they can afford it. A landing page cannot ask questions and hear answers,
 * so it describes the shapes of problem it recognises and lets the visitor
 * place themselves.
 *
 * These are problem shapes, not industries or services — the firm takes on
 * the full range, so an exclusion list would only turn away work it would
 * accept. The affordability half of the gate is handled directly instead: a
 * range on the first call, a firm number after discovery.
 */


export default function Qualify() {
  const { t } = useI18n();
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
              {t.qualify.eyebrow}
            </span>
          </div>
          <h2 className="font-display text-3xl leading-[1.2] tracking-[-0.03em] text-st-text sm:text-4xl md:text-5xl">
            {t.qualify.title}
          </h2>
          <p className="mt-5 text-base font-normal leading-[1.7] text-st-text-muted">
            Most of our work starts in one of these. If yours looks different,
            it is still worth a call &mdash; the shape of the problem matters
            more than the industry it sits in.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {t.qualify.fits.map((fit, i) => (
            <FitCard key={fit.headline} fit={fit} index={i} />
          ))}
        </div>

        {/* Pricing, said plainly rather than deferred.
            The one exclusion that survived is the only one that is actually
            true: an off-the-shelf tool that already does the job. Everything
            else on the earlier list — websites, branding, smaller budgets —
            was a limit we do not have, and naming it turned away work we
            would take. */}
        <div className="mt-10 max-w-3xl border-t border-st-border pt-7">
          <p className="text-[14px] leading-[1.8] text-st-text-muted/75">
            <span className="text-st-text-muted">On price:</span> you will get
            a range on the first call and a firm number after discovery, not a
            figure invented from an email. And if an off-the-shelf tool already
            does the job, we will tell you which one &mdash; that is a cheaper
            answer than anything we could build you.
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
