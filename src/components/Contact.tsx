import { useState, useCallback } from "react";
import { useI18n } from "../i18n";
import { useInView } from "../hooks/useInView";
import { SectionHeader } from "./Products";
import type { ContactFormData } from "../types";

export default function Contact() {
  const { t } = useI18n();
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [form, setForm] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setStatus("sending");
      setErrorMsg("");

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
          },
          body: JSON.stringify(form),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.error || t.contact.error);
        }

        setStatus("success");
        setForm({ name: "", email: "", phone: "", message: "" });
      } catch (err) {
        setStatus("error");
        setErrorMsg(
          err instanceof Error ? err.message : t.contact.error
        );
      }
    },
    [form]
  );

  return (
    <section id="contact" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeader
          label={t.contact.eyebrow}
          title={t.contact.title}
          subtitle={t.contact.sub}
        />

        <div
          ref={ref}
          className={`mx-auto grid max-w-5xl grid-cols-1 items-start gap-8 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12 ${
            isInView ? "reveal visible" : "reveal"
          }`}
        >
          {/* Info, as a card — it was floating text in a lot of empty space. */}
          <div className="card rounded-2xl p-7 sm:p-8">
            <div className="space-y-5">
              <ContactDetail
                label={t.contact.email}
                value="info@startech-innovation.com"
                href="mailto:info@startech-innovation.com"
              />
              <ContactDetail
                label={t.contact.phone}
                value="+65 9069 3236"
                href="tel:+6590693236"
              />
            </div>

            <div className="border-t border-st-border pt-6">
              <p className="text-[13.5px] leading-[1.7] text-st-text-muted">
                {t.contact.reassurance}
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <FormField
              name="name"
              label={t.contact.name}
              type="text"
              required
              value={form.name}
              onChange={handleChange}
            />
            <FormField
              name="email"
              label={t.contact.email}
              type="email"
              required
              value={form.email}
              onChange={handleChange}
            />
            <FormField
              name="phone"
              label={t.contact.phone}
              type="tel"
              value={form.phone}
              onChange={handleChange}
            />
            <div>
              <label
                htmlFor="message"
                className="mb-1.5 block text-[11px] font-medium tracking-wide text-st-text-muted"
              >
                {t.contact.message}{" "}
                <span className="text-st-text-muted/70">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={form.message}
                onChange={handleChange}
                maxLength={5000}
                className="w-full min-h-[46px] rounded-lg border border-st-field bg-st-field-bg px-3.5 py-3 text-[14px] font-normal text-st-text placeholder-st-text-muted/50 outline-none transition-all duration-300 hover:border-st-border-hover focus:border-st-blue-light focus:bg-st-bg-elevated focus:ring-2 focus:ring-st-blue/25"
                placeholder={t.contact.messagePlaceholder}
              />
            </div>

            {status === "error" && (
              <p className="text-[13px] font-normal text-red-400/80">{errorMsg}</p>
            )}

            {status === "success" ? (
              <div className="rounded-lg border border-emerald-500/10 px-4 py-3 text-[13px] font-normal text-emerald-400/80">
                {t.contact.success}
              </div>
            ) : (
              <button
                type="submit"
                disabled={status === "sending"}
                className="hero-btn-primary relative w-full overflow-hidden rounded-xl px-4 py-3.5 text-[13px] font-normal tracking-wide text-st-text transition-all duration-500 disabled:opacity-40"
              >
                {status === "sending" ? t.contact.sending : t.contact.send}
              </button>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function ContactDetail({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div>
      <div className="mb-1 text-[10px] font-medium tracking-[0.15em] uppercase text-st-text-muted">
        {label}
      </div>
      {href ? (
        <a
          href={href}
          className="inline-flex min-h-[44px] items-center text-[13px] font-normal text-st-text transition-colors duration-300 hover:text-st-text"
        >
          {value}
        </a>
      ) : (
        <p className="text-[13px] font-normal text-st-text">{value}</p>
      )}
    </div>
  );
}

function FormField({
  name,
  label,
  type,
  required,
  value,
  onChange,
}: {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-[11px] font-medium tracking-wide text-st-text-muted"
      >
        {label}
        {required && <span className="text-st-text-muted/70"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        maxLength={name === "email" ? 320 : name === "phone" ? 30 : 200}
        className="w-full min-h-[46px] rounded-lg border border-st-field bg-st-field-bg px-3.5 py-3 text-[14px] font-normal text-st-text placeholder-st-text-muted/50 outline-none transition-all duration-300 hover:border-st-border-hover focus:border-st-blue-light focus:bg-st-bg-elevated focus:ring-2 focus:ring-st-blue/25"
      />
    </div>
  );
}
