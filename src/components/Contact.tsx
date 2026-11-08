import { useState, useCallback, useRef } from "react";
import { useI18n } from "../i18n";
import { useInView } from "../hooks/useInView";
import { SectionHeader } from "./Products";
import { getUtm } from "../lib/utm";
import type { ContactFormData } from "../types";

const EMPTY_FORM: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  message: "",
  country: "",
  staff: "",
};

/** Must match SPREADSHEET_MAX_BYTES in worker/contact-form.ts. */
const SPREADSHEET_MAX_BYTES = 10 * 1024 * 1024;
const SPREADSHEET_ACCEPT = ".xlsx,.xls,.xlsm,.csv,.ods,.numbers,.tsv";

interface ContactProps {
  /**
   * "flyer" adds country, staff count and a spreadsheet upload, and takes
   * its heading from the flyer copy: that page's offer is "send us one
   * spreadsheet", so the form has to be able to take one.
   */
  variant?: "default" | "flyer" | "singpass";
}

export default function Contact({ variant = "default" }: ContactProps) {
  const { t, locale } = useI18n();
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [form, setForm] = useState<ContactFormData>(EMPTY_FORM);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const isFlyer = variant === "flyer";
  // On /singpass the enquiry is a Singpass check: its own copy, and a topic
  // the Worker turns into the "Singpass check" subject in hq and the email.
  const isSingpass = variant === "singpass";

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    []
  );

  const handleFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const picked = e.target.files?.[0] ?? null;
      if (picked && picked.size > SPREADSHEET_MAX_BYTES) {
        setErrorMsg(t.contact.fileTooLarge);
        setStatus("error");
        e.target.value = "";
        setFile(null);
        return;
      }
      if (status === "error") setStatus("idle");
      setErrorMsg("");
      setFile(picked);
    },
    [status, t.contact.fileTooLarge]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setStatus("sending");
      setErrorMsg("");

      // locale: the page's language, so the automatic acknowledgement
      // (worker/ack.ts) answers in it.
      const payload = { ...form, locale, ...getUtm(), ...(isSingpass ? { topic: "singpass" } : {}) };

      try {
        // JSON unless a spreadsheet is attached; the Worker reads both.
        const init: RequestInit = {
          method: "POST",
          headers: { "X-Requested-With": "XMLHttpRequest" },
        };
        if (file) {
          const data = new FormData();
          for (const [key, value] of Object.entries(payload)) data.set(key, value);
          data.set("spreadsheet", file, file.name);
          init.body = data;
        } else {
          init.headers = { ...init.headers, "Content-Type": "application/json" };
          init.body = JSON.stringify(payload);
        }

        const res = await fetch("/api/contact", init);
        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.error || t.contact.error);
        }

        setStatus("success");
        setForm(EMPTY_FORM);
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } catch (err) {
        setStatus("error");
        setErrorMsg(
          err instanceof Error ? err.message : t.contact.error
        );
      }
    },
    [form, file, isSingpass, locale, t.contact.error]
  );

  const header = isFlyer
    ? { label: t.flyer.formEyebrow, title: t.flyer.formTitle, subtitle: t.flyer.formSub }
    : isSingpass
      ? { label: t.singpass.formEyebrow, title: t.singpass.formTitle, subtitle: t.singpass.formSub }
      : { label: t.contact.eyebrow, title: t.contact.title, subtitle: t.contact.sub };

  return (
    <section id="contact" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeader
          label={header.label}
          title={header.title}
          subtitle={header.subtitle}
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
                {isFlyer ? t.flyer.formReassurance : t.contact.reassurance}
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
              name="company"
              label={t.contact.company}
              type="text"
              required={isFlyer}
              value={form.company}
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

            {isFlyer && (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <FormField
                  name="country"
                  label={t.contact.country}
                  type="text"
                  required
                  value={form.country}
                  onChange={handleChange}
                />
                <div>
                  <label htmlFor="staff" className={LABEL_CLASS}>
                    {t.contact.staff}
                    <span className="text-st-text-muted/70"> *</span>
                  </label>
                  <select
                    id="staff"
                    name="staff"
                    required
                    value={form.staff}
                    onChange={handleChange}
                    className={FIELD_CLASS}
                  >
                    <option value="" disabled>
                      {t.contact.staffPick}
                    </option>
                    {t.contact.staffOptions.map((band) => (
                      <option key={band} value={band}>
                        {band}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {isFlyer && (
              <div>
                <label htmlFor="spreadsheet" className={LABEL_CLASS}>
                  {t.contact.spreadsheet}
                </label>
                <input
                  ref={fileInputRef}
                  id="spreadsheet"
                  name="spreadsheet"
                  type="file"
                  accept={SPREADSHEET_ACCEPT}
                  onChange={handleFile}
                  className={`${FIELD_CLASS} file:mr-3 file:rounded-md file:border-0 file:bg-st-bg-elevated file:px-3 file:py-1.5 file:text-[12px] file:text-st-text`}
                />
                <p className="mt-1.5 text-[12px] text-st-text-muted">
                  {t.contact.spreadsheetHint}
                </p>
              </div>
            )}

            <div>
              <label htmlFor="message" className={LABEL_CLASS}>
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
                className={FIELD_CLASS}
                placeholder={
                  isFlyer
                    ? t.flyer.messagePlaceholder
                    : isSingpass
                      ? t.singpass.formPlaceholder
                      : t.contact.messagePlaceholder
                }
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
                {status === "sending"
                  ? t.contact.sending
                  : isFlyer
                    ? t.flyer.formSend
                    : isSingpass
                      ? t.singpass.formSend
                      : t.contact.send}
              </button>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

const LABEL_CLASS =
  "mb-1.5 block text-[11px] font-medium tracking-wide text-st-text-muted";
const FIELD_CLASS =
  "w-full min-h-[46px] rounded-lg border border-st-field bg-st-field-bg px-3.5 py-3 text-[14px] font-normal text-st-text placeholder-st-text-muted/50 outline-none transition-all duration-300 hover:border-st-border-hover focus:border-st-blue-light focus:bg-st-bg-elevated focus:ring-2 focus:ring-st-blue/25";

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
      <label htmlFor={name} className={LABEL_CLASS}>
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
        maxLength={name === "email" ? 320 : name === "phone" ? 30 : name === "country" ? 100 : 200}
        className={FIELD_CLASS}
      />
    </div>
  );
}
