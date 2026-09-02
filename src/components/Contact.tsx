import { useState, useCallback } from "react";
import { useInView } from "../hooks/useInView";
import { SectionHeader } from "./Products";
import type { ContactFormData } from "../types";

export default function Contact() {
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
          throw new Error(data.error || "Failed to send message.");
        }

        setStatus("success");
        setForm({ name: "", email: "", phone: "", message: "" });
      } catch (err) {
        setStatus("error");
        setErrorMsg(
          err instanceof Error ? err.message : "Something went wrong."
        );
      }
    },
    [form]
  );

  return (
    <section id="contact" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeader
          label="Contact"
          title="Thirty minutes, and an honest answer"
          subtitle="Tell us what the process costs you today. We will come back with what software can and cannot fix — including when the answer is that you do not need us yet."
        />

        <div
          ref={ref}
          className={`mx-auto grid max-w-[800px] grid-cols-1 gap-12 lg:grid-cols-2 ${
            isInView ? "reveal visible" : "reveal"
          }`}
        >
          {/* Info */}
          <div className="space-y-8">
            <div className="space-y-5">
              <ContactDetail
                label="Email"
                value="info@startech-innovation.com"
                href="mailto:info@startech-innovation.com"
              />
              <ContactDetail
                label="Phone"
                value="+65 9069 3236"
                href="tel:+6590693236"
              />
            </div>

            {/* The close restates each of the three 10s once — the work, the
                person, the company — then asks. Kept to plain fact: anything
                that reads as a technique here would undo the rest. */}
            <div className="space-y-4 border-t border-st-border pt-6">
              <CloseLine label="The work">
                Production systems in Singapore, Indonesia and Japan. Every
                figure on this page can be walked through line by line.
              </CloseLine>
              <CloseLine label="The person">
                You deal with the principal directly, on every call and every
                line of the core. Twenty years across business and engineering.
              </CloseLine>
              <CloseLine label="The company">
                StarTech Innovation Pte Ltd, UEN 202110461R, Singapore
                registered since 2021. PSG paperwork prepared at no charge.
              </CloseLine>

              <p className="pt-3 text-[13.5px] leading-[1.7] text-st-text-muted">
                No commitment, no obligation to proceed, and the discovery
                output is yours whether or not you continue with us. That
                seems fair enough either way.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <FormField
              name="name"
              label="Name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
            />
            <FormField
              name="email"
              label="Email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
            />
            <FormField
              name="phone"
              label="Phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
            />
            <div>
              <label
                htmlFor="message"
                className="mb-1.5 block text-[11px] font-medium tracking-wide text-st-text-muted"
              >
                Message <span className="text-st-text-muted/70">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={form.message}
                onChange={handleChange}
                maxLength={5000}
                className="w-full min-h-[44px] rounded-lg border border-st-border bg-transparent px-3.5 py-3 text-[13px] font-normal text-st-text placeholder-st-text-muted/30 outline-none transition-colors duration-300 focus:border-st-border-hover"
                placeholder="Tell us about your project..."
              />
            </div>

            {status === "error" && (
              <p className="text-[13px] font-normal text-red-400/80">{errorMsg}</p>
            )}

            {status === "success" ? (
              <div className="rounded-lg border border-emerald-500/10 px-4 py-3 text-[13px] font-normal text-emerald-400/80">
                Thank you. We'll be in touch shortly.
              </div>
            ) : (
              <button
                type="submit"
                disabled={status === "sending"}
                className="hero-btn-primary relative w-full overflow-hidden rounded-xl px-4 py-3.5 text-[13px] font-normal tracking-wide text-st-text transition-all duration-500 disabled:opacity-40"
              >
                {status === "sending" ? "Sending..." : "Send message"}
              </button>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function CloseLine({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-[10px] font-medium tracking-[0.16em] uppercase text-st-blue-light">
        {label}
      </div>
      <p className="mt-1.5 text-[13.5px] font-normal leading-[1.65] text-st-text-muted">
        {children}
      </p>
    </div>
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
        className="w-full min-h-[44px] rounded-lg border border-st-border bg-transparent px-3.5 py-3 text-[13px] font-normal text-st-text placeholder-st-text-muted/30 outline-none transition-colors duration-300 focus:border-st-border-hover"
      />
    </div>
  );
}
