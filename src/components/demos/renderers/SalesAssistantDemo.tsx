import { useState } from "react";

interface DemoRendererProps {
  onSubmit: (input: Record<string, string>) => void;
  isLoading: boolean;
  result: Record<string, unknown> | null;
  error: string | null;
  clearResult: () => void;
}

const inputClass =
  "w-full min-h-[44px] rounded-lg border border-white/20 bg-white/[0.05] px-3.5 py-3 text-[13px] font-light text-white placeholder-st-text-muted/50 outline-none transition-colors duration-300 focus:border-white/40";
const labelClass =
  "mb-1.5 block text-[11px] font-light tracking-wide text-white/60";

interface EmailDraft {
  subject: string;
  body: string;
  send_day: string;
  purpose: string;
}

export default function SalesAssistantDemo(props: DemoRendererProps) {
  const { onSubmit, isLoading, result, error, clearResult } = props;
  const [leadName, setLeadName] = useState("");
  const [company, setCompany] = useState("");
  const [productInterest, setProductInterest] = useState("");
  const [context, setContext] = useState("");
  const [expandedEmail, setExpandedEmail] = useState<number | null>(0);
  const [copied, setCopied] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      lead_name: leadName,
      company,
      product_interest: productInterest,
      context,
    });
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  const toggleEmail = (index: number) => {
    setExpandedEmail(expandedEmail === index ? null : index);
  };

  if (result) {
    const leadSummary = result.lead_summary as string;
    const emails = (result.emails as EmailDraft[]) || [];

    return (
      <div className="animate-fade-in-up space-y-4">
        {/* Lead summary */}
        <div className="rounded-xl border border-st-border bg-st-bg-card p-5">
          <h3 className="mb-2 text-[15px] font-light text-white">
            Lead Summary
          </h3>
          <p className="text-[13px] font-light leading-[1.7] text-st-text-muted">
            {leadSummary}
          </p>
        </div>

        {/* Email sequence */}
        <div className="space-y-3">
          {emails.map((email, i) => (
            <div
              key={i}
              className="rounded-xl border border-st-border bg-st-bg-card"
            >
              {/* Header — always visible, clickable */}
              <button
                type="button"
                onClick={() => toggleEmail(i)}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-light text-st-text-muted">
                    {email.send_day}
                  </span>
                  <span className="rounded-full bg-white/[0.05] px-2 py-0.5 text-[11px] font-light text-st-text-muted">
                    {email.purpose}
                  </span>
                </div>
                <svg
                  className={`h-4 w-4 text-st-text-muted transition-transform duration-300 ${
                    expandedEmail === i ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>

              {/* Expanded content */}
              {expandedEmail === i && (
                <div className="border-t border-st-border px-5 pb-5 pt-4">
                  <div className="mb-3">
                    <span className="text-[11px] font-light text-st-text-muted">
                      Subject
                    </span>
                    <p className="mt-0.5 text-[13px] font-light text-white">
                      {email.subject}
                    </p>
                  </div>
                  <div className="rounded-lg border border-st-border/50 bg-white/[0.02] p-4">
                    <p className="whitespace-pre-wrap text-[13px] font-light leading-[1.7] text-white">
                      {email.body}
                    </p>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(
                          `Subject: ${email.subject}\n\n${email.body}`,
                          i
                        )
                      }
                      className="text-[11px] font-light text-st-text-muted transition-colors duration-300 hover:text-white"
                    >
                      {copied === i ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {error && (
          <p className="text-[13px] font-light text-red-400/80">{error}</p>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={clearResult}
            className="hero-btn-secondary relative overflow-hidden rounded-xl px-6 py-3 text-[13px] font-light tracking-wide text-st-text-muted transition-all duration-500 hover:text-white"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-lg border border-st-gold/20 bg-st-gold/[0.04] px-4 py-3.5 text-[13px] font-light leading-relaxed text-st-gold-light/80">
        <p className="mb-2 font-medium text-st-gold-light">How to use this demo</p>
        <p>Enter your sales lead&apos;s name, their company, what product or service they&apos;re interested in, and any context (how you met them, their pain points, timeline). The AI will draft a 3-email follow-up sequence — from introduction to value proposition to soft close.</p>
        <p className="mt-2 text-[12px] text-st-gold-light/60">The emails are tailored for B2B sales in Singapore. Each email includes a subject line, body, recommended send day, and the strategic purpose behind it.</p>
      </div>
      <div>
        <label className={labelClass}>Contact Name</label>
        <input
          type="text"
          value={leadName}
          onChange={(e) => setLeadName(e.target.value)}
          placeholder="Contact name"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Company</label>
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company name"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Product Interest</label>
        <textarea
          value={productInterest}
          onChange={(e) => setProductInterest(e.target.value)}
          placeholder="What they're interested in..."
          rows={2}
          className={`${inputClass} resize-none`}
        />
      </div>

      <div>
        <label className={labelClass}>Context</label>
        <textarea
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="How you met, their pain points..."
          rows={2}
          className={`${inputClass} resize-none`}
        />
      </div>

      {error && (
        <p className="text-[13px] font-light text-red-400/80">{error}</p>
      )}

      <button
        type="submit"
        disabled={isLoading || !leadName.trim() || !company.trim()}
        className="relative w-full overflow-hidden rounded-xl border border-st-gold/30 bg-st-gold/15 px-4 py-3.5 text-[13px] font-light tracking-wide text-st-gold-light transition-all duration-500 hover:bg-st-gold/25 hover:border-st-gold/50 disabled:opacity-40"
      >
        {isLoading ? "Generating..." : "Generate Sales Sequence"}
      </button>
    </form>
  );
}
