import { useEffect, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useI18n } from "../i18n";

/**
 * Where a client leaves a testimonial: /testimonial, reached by a link we
 * send, never in the nav, and kept out of search results.
 *
 * The link can prefill who it is for, so the client only writes the words:
 *   /testimonial?name=Michael%20Choy&company=TechTree
 *
 * The Worker (POST /api/testimonial) saves it as a "Testimonial" note on the
 * client's contact in hq and emails StarTech. Nothing is published from here:
 * the client agrees to see the final wording first, and picks how they are
 * credited, including "do not publish".
 */

type Credit = "full" | "anonymous" | "private";

const LABEL_CLASS = "mb-1.5 block text-[11px] font-medium tracking-wide text-st-text-muted";
const FIELD_CLASS =
  "w-full min-h-[46px] rounded-lg border border-st-field bg-st-field-bg px-3.5 py-3 text-[14px] font-normal text-st-text placeholder-st-text-muted/50 outline-none transition-all duration-300 hover:border-st-border-hover focus:border-st-blue-light focus:bg-st-bg-elevated focus:ring-2 focus:ring-st-blue/25";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function prefill(key: string): string {
  if (typeof window === "undefined") return "";
  return (new URLSearchParams(window.location.search).get(key) ?? "").slice(0, 200);
}

export default function TestimonialPage() {
  const { t } = useI18n();
  const m = t.testimonial;
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const previous = document.title;
    document.title = `${m.eyebrow} · StarTech Innovation`;
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex";
    document.head.appendChild(robots);
    return () => {
      document.title = previous;
      robots.remove();
    };
  }, [m.eyebrow]);

  const required = ({ value }: { value: string }) =>
    value.trim() ? undefined : m.errorRequired;

  const form = useForm({
    defaultValues: {
      name: prefill("name"),
      role: "",
      company: prefill("company"),
      email: "",
      quote: "",
      credit: "full" as Credit,
      consent: false,
      website: "", // honeypot, hidden from people
    },
    onSubmit: async ({ value }) => {
      setErrorMsg("");
      try {
        const res = await fetch("/api/testimonial", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
          },
          body: JSON.stringify(value),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data.success) throw new Error(data.error || m.error);
        setStatus("success");
      } catch (err) {
        setStatus("error");
        setErrorMsg(err instanceof Error ? err.message : m.error);
      }
    },
  });

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

        {status === "success" ? (
          <div className="card mt-10 rounded-2xl p-7 sm:p-8" role="status">
            <h2 className="font-display text-xl text-st-text">{m.thanksTitle}</h2>
            <p className="mt-3 text-[14px] leading-[1.7] text-st-text-muted">{m.thanksBody}</p>
          </div>
        ) : (
          <form
            className="mt-10 space-y-5"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              void form.handleSubmit();
            }}
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {(["name", "role", "company"] as const).map((key) => (
                <form.Field key={key} name={key} validators={{ onSubmit: required }}>
                  {(field) => (
                    <div className={key === "company" ? "sm:col-span-2" : undefined}>
                      <label htmlFor={key} className={LABEL_CLASS}>
                        {m[key]} <span className="text-st-text-muted/70">*</span>
                      </label>
                      <input
                        id={key}
                        type="text"
                        maxLength={key === "role" ? 120 : 200}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        className={FIELD_CLASS}
                      />
                      <FieldError errors={field.state.meta.errors} />
                    </div>
                  )}
                </form.Field>
              ))}
            </div>

            <form.Field
              name="email"
              validators={{
                onSubmit: ({ value }) =>
                  !value.trim() ? m.errorRequired : EMAIL_RE.test(value.trim()) ? undefined : m.errorEmail,
              }}
            >
              {(field) => (
                <div>
                  <label htmlFor="email" className={LABEL_CLASS}>
                    {m.email} <span className="text-st-text-muted/70">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    maxLength={320}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className={FIELD_CLASS}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </div>
              )}
            </form.Field>

            <form.Field
              name="quote"
              validators={{
                onSubmit: ({ value }) => (value.trim().length >= 20 ? undefined : m.errorQuoteShort),
              }}
            >
              {(field) => (
                <div>
                  <label htmlFor="quote" className={LABEL_CLASS}>
                    {m.quote} <span className="text-st-text-muted/70">*</span>
                  </label>
                  <textarea
                    id="quote"
                    rows={5}
                    maxLength={1500}
                    placeholder={m.quotePlaceholder}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className={FIELD_CLASS}
                  />
                  <p className="mt-1.5 text-[12px] text-st-text-muted">{m.quoteHint}</p>
                  <FieldError errors={field.state.meta.errors} />
                </div>
              )}
            </form.Field>

            <form.Field name="credit">
              {(field) => (
                <fieldset>
                  <legend className={LABEL_CLASS}>{m.credit}</legend>
                  <div className="space-y-1">
                    {(
                      [
                        ["full", m.creditFull],
                        ["anonymous", m.creditAnonymous],
                        ["private", m.creditPrivate],
                      ] as const
                    ).map(([value, label]) => (
                      <label
                        key={value}
                        className="flex min-h-[44px] cursor-pointer items-center gap-3 text-[14px] text-st-text"
                      >
                        <input
                          type="radio"
                          name="credit"
                          value={value}
                          checked={field.state.value === value}
                          onChange={() => field.handleChange(value)}
                          className="tap-radio"
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}
            </form.Field>

            <form.Field
              name="consent"
              validators={{ onSubmit: ({ value }) => (value ? undefined : m.errorConsent) }}
            >
              {(field) => (
                <div>
                  <label className="flex min-h-[44px] cursor-pointer items-start gap-3 py-2 text-[13.5px] leading-[1.6] text-st-text-muted">
                    <input
                      type="checkbox"
                      checked={field.state.value}
                      onChange={(e) => field.handleChange(e.target.checked)}
                      className="tap-check"
                    />
                    {m.consent}
                  </label>
                  <FieldError errors={field.state.meta.errors} />
                </div>
              )}
            </form.Field>

            {/* Honeypot: never shown, so only a bot filling every input sets it. */}
            <form.Field name="website">
              {(field) => (
                <div hidden>
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              )}
            </form.Field>

            {status === "error" && (
              <p className="text-[13px] font-normal text-red-400/80" role="alert">
                {errorMsg}
              </p>
            )}

            <form.Subscribe selector={(s) => s.isSubmitting}>
              {(isSubmitting) => (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="hero-btn-primary relative w-full overflow-hidden rounded-xl px-4 py-3.5 text-[13px] font-normal tracking-wide text-st-text transition-all duration-500 disabled:opacity-40"
                >
                  {isSubmitting ? m.sending : m.send}
                </button>
              )}
            </form.Subscribe>
          </form>
        )}
      </div>
    </section>
  );
}

function FieldError({ errors }: { errors: unknown[] }) {
  const first = errors.find((e) => typeof e === "string");
  return first ? (
    <p className="mt-1.5 text-[12px] text-red-400/80" role="alert">
      {first as string}
    </p>
  ) : null;
}
