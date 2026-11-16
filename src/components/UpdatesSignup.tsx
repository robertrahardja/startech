import { useId, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useI18n } from "../i18n";

/**
 * "Get our updates": email and a consent tick box, posted to
 * /api/subscribe (worker/subscribe.ts). The Worker saves the address
 * unconfirmed and emails a confirm link, so the answer is the same whether
 * or not the address was already on the list. Used in the footer and on
 * /updates.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FIELD_CLASS =
  "w-full min-h-[46px] rounded-lg border border-st-field bg-st-field-bg px-3.5 py-3 text-[14px] font-normal text-st-text placeholder-st-text-muted/50 outline-none transition-all duration-300 hover:border-st-border-hover focus:border-st-blue-light focus:bg-st-bg-elevated focus:ring-2 focus:ring-st-blue/25";

export default function UpdatesSignup() {
  const { t, locale } = useI18n();
  const m = t.updates;
  const id = useId();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const form = useForm({
    defaultValues: { email: "", consent: false, website: "" },
    onSubmit: async ({ value }) => {
      setErrorMsg("");
      try {
        const res = await fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json", "X-Requested-With": "XMLHttpRequest" },
          body: JSON.stringify({
            email: value.email.trim(),
            consent: value.consent,
            website: value.website,
            language: locale,
            page: window.location.pathname,
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data.success) throw new Error(m.error);
        setStatus("success");
      } catch {
        setStatus("error");
        setErrorMsg(m.error);
      }
    },
  });

  const submit = (
    <form.Subscribe selector={(s) => s.isSubmitting}>
      {(isSubmitting) => (
        <button
          type="submit"
          disabled={isSubmitting}
          className="hero-btn-primary min-h-[46px] w-full shrink-0 rounded-xl px-6 py-3 text-[14px] font-normal tracking-wide text-st-text transition-all duration-500 disabled:opacity-40 sm:w-auto"
        >
          {isSubmitting ? m.sending : m.send}
        </button>
      )}
    </form.Subscribe>
  );

  if (status === "success") {
    return (
      <div className="card rounded-2xl p-6" role="status">
        <p className="font-display text-lg text-st-text">{m.thanksTitle}</p>
        <p className="mt-2 text-[14px] leading-[1.7] text-st-text-muted">{m.thanksBody}</p>
      </div>
    );
  }

  return (
    <form
      noValidate
      aria-label={m.title}
      onSubmit={(e) => {
        e.preventDefault();
        void form.handleSubmit();
      }}
    >
      <form.Field
        name="email"
        validators={{
          onSubmit: ({ value }) => (EMAIL_RE.test(value.trim()) ? undefined : m.errorEmail),
        }}
      >
        {(field) => (
          <div>
            <label htmlFor={`${id}-email`} className="mb-1.5 block text-[12px] font-medium tracking-wide text-st-text-muted">
              {m.email}
            </label>
            <input
              id={`${id}-email`}
              type="email"
              inputMode="email"
              autoComplete="email"
              maxLength={320}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              aria-invalid={field.state.meta.errors.length > 0}
              aria-describedby={field.state.meta.errors.length > 0 ? `${id}-email-error` : undefined}
              className={FIELD_CLASS}
            />
            <FieldError id={`${id}-email-error`} errors={field.state.meta.errors} />
          </div>
        )}
      </form.Field>

      <form.Field
        name="consent"
        validators={{ onSubmit: ({ value }) => (value ? undefined : m.errorConsent) }}
      >
        {(field) => (
          <div className="mt-3">
            <label className="flex min-h-[44px] cursor-pointer items-start gap-3 py-2 text-[13px] leading-[1.6] text-st-text-muted">
              <input
                type="checkbox"
                checked={field.state.value}
                onChange={(e) => field.handleChange(e.target.checked)}
                aria-invalid={field.state.meta.errors.length > 0}
                aria-describedby={field.state.meta.errors.length > 0 ? `${id}-consent-error` : undefined}
                className="tap-check"
              />
              <span>{m.consent}</span>
            </label>
            <FieldError id={`${id}-consent-error`} errors={field.state.meta.errors} />
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
              aria-hidden="true"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </div>
        )}
      </form.Field>

      {status === "error" && (
        <p className="mt-2 text-[13px] font-normal text-red-400" role="alert">
          {errorMsg}
        </p>
      )}

      <div className="mt-4">{submit}</div>
    </form>
  );
}

function FieldError({ id, errors }: { id: string; errors: unknown[] }) {
  const first = errors.find((e) => typeof e === "string");
  return first ? (
    <p id={id} className="mt-1.5 text-[12px] text-red-400" role="alert">
      {first as string}
    </p>
  ) : null;
}
