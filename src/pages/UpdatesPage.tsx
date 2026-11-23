import { useEffect } from "react";
import { useI18n } from "../i18n";
import UpdatesSignup from "../components/UpdatesSignup";

/**
 * /updates: what StarTech's quarterly update contains, and the sign-up.
 * The footer carries the same form, so the footer leaves it out here.
 */
export default function UpdatesPage() {
  const { t } = useI18n();
  const m = t.updates;

  useEffect(() => {
    const previous = document.title;
    document.title = `${m.title} · StarTech Innovation`;
    return () => {
      document.title = previous;
    };
  }, [m.title]);

  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-24">
      <div className="mx-auto max-w-2xl px-6 sm:px-8">
        <div className="mb-5 flex items-center gap-3">
          <span className="brand-rule h-px w-10" />
          <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-st-text-muted sm:text-[10px] sm:tracking-[0.22em]">
            {m.eyebrow}
          </span>
        </div>
        <h1 className="font-display text-3xl leading-[1.15] tracking-[-0.02em] text-st-text sm:text-4xl">
          {m.title}
        </h1>
        <p className="mt-5 text-[15px] leading-[1.7] text-st-text-muted">{m.intro}</p>

        <h2 className="mt-10 text-[13px] font-medium tracking-wide text-st-text">{m.containsTitle}</h2>
        <ul className="mt-3 space-y-2.5">
          {m.contains.map((line) => (
            <li key={line} className="flex gap-3 text-[15px] leading-[1.7] text-st-text-muted">
              <span aria-hidden="true" className="mt-[0.8em] h-1 w-1 shrink-0 rounded-full bg-st-blue-light" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-[13px] leading-[1.7] text-st-text-muted">{m.confirmNote}</p>

        <div className="mt-10">
          <UpdatesSignup />
        </div>
      </div>
    </section>
  );
}
