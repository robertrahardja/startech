import { useState, useCallback } from "react";
import { useInView } from "../../hooks/useInView";
import { useDemoApi } from "../../hooks/useDemoApi";
import type { DemoLead } from "../../types";

interface DemoShellProps {
  demoType: string;
  title: string;
  children: (props: {
    onSubmit: (input: Record<string, string>) => void;
    isLoading: boolean;
    result: Record<string, unknown> | null;
    error: string | null;
    clearResult: () => void;
  }) => React.ReactNode;
}

export default function DemoShell({ demoType, title, children }: DemoShellProps) {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const { lead, setLead, submitDemo, isLoading, result, error, clearResult } =
    useDemoApi(demoType);

  return (
    <div ref={ref} className={isInView ? "reveal visible" : "reveal"}>
      <div className="relative">
        {/* Lead capture overlay */}
        {!lead && (
          <LeadCaptureOverlay onCapture={setLead} title={title} />
        )}

        {/* Demo content */}
        {lead && (
          <div className="space-y-6">
            {/* Logged-in indicator */}
            <div className="flex items-center justify-between rounded-lg border border-st-border/50 bg-white/[0.02] px-4 py-2.5">
              <span className="text-[12px] font-light text-st-text-muted">
                Signed in as{" "}
                <span className="text-white">{lead.email}</span>
              </span>
              <button
                type="button"
                onClick={() => {
                  try {
                    localStorage.removeItem("startech-demo-lead");
                  } catch {}
                  window.location.reload();
                }}
                className="text-[11px] font-light text-st-text-muted/60 transition-colors duration-300 hover:text-st-text-muted"
              >
                Change
              </button>
            </div>

            {/* Loading overlay */}
            {isLoading && <LoadingSkeleton />}

            {/* Demo form + results */}
            {!isLoading && children({ onSubmit: submitDemo, isLoading, result, error, clearResult })}

            {/* Error display */}
            {error && !isLoading && (
              <div className="rounded-lg border border-red-500/10 bg-red-500/[0.03] px-4 py-3">
                <p className="text-[13px] font-light text-red-400/80">{error}</p>
              </div>
            )}

            {/* CTA after results */}
            {result && !isLoading && <FullVersionCta />}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Lead Capture Form ─── */

function LeadCaptureOverlay({
  onCapture,
  title,
}: {
  onCapture: (lead: DemoLead) => void;
  title: string;
}) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!email.trim()) return;
      onCapture({
        email: email.trim(),
        name: name.trim() || undefined,
        company: company.trim() || undefined,
      });
    },
    [email, name, company, onCapture]
  );

  return (
    <div className="card rounded-xl p-6 sm:p-8">
      {/* Gold accent line */}
      <div className="mb-6 h-px w-16 gold-glimmer" />

      <h3 className="mb-2 text-base font-medium tracking-wide text-white">
        Try {title}
      </h3>
      <p className="mb-6 text-[13px] font-light leading-[1.7] text-st-text-muted">
        Enter your email to access the live demo. No account required.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email — required */}
        <div>
          <label
            htmlFor="demo-email"
            className="mb-1.5 block text-[11px] font-light tracking-wide text-white/60"
          >
            Email <span className="text-st-text-muted/70">*</span>
          </label>
          <input
            id="demo-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            maxLength={320}
            placeholder="you@company.com"
            className="w-full min-h-[44px] rounded-lg border border-white/20 bg-white/[0.05] px-3.5 py-3 text-[13px] font-light text-white placeholder-st-text-muted/50 outline-none transition-colors duration-300 focus:border-white/40"
          />
        </div>

        {/* Name — optional */}
        <div>
          <label
            htmlFor="demo-name"
            className="mb-1.5 block text-[11px] font-light tracking-wide text-white/60"
          >
            Name
          </label>
          <input
            id="demo-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={200}
            placeholder="Jane Doe"
            className="w-full min-h-[44px] rounded-lg border border-white/20 bg-white/[0.05] px-3.5 py-3 text-[13px] font-light text-white placeholder-st-text-muted/50 outline-none transition-colors duration-300 focus:border-white/40"
          />
        </div>

        {/* Company — optional */}
        <div>
          <label
            htmlFor="demo-company"
            className="mb-1.5 block text-[11px] font-light tracking-wide text-white/60"
          >
            Company
          </label>
          <input
            id="demo-company"
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            maxLength={200}
            placeholder="Acme Corp"
            className="w-full min-h-[44px] rounded-lg border border-white/20 bg-white/[0.05] px-3.5 py-3 text-[13px] font-light text-white placeholder-st-text-muted/50 outline-none transition-colors duration-300 focus:border-white/40"
          />
        </div>

        <button
          type="submit"
          className="relative w-full overflow-hidden rounded-xl border border-st-gold/30 bg-st-gold/15 px-4 py-3.5 text-[13px] font-light tracking-wide text-st-gold-light transition-all duration-500 hover:bg-st-gold/25 hover:border-st-gold/50"
        >
          Try Demo
        </button>
      </form>
    </div>
  );
}

/* ─── Loading Skeleton ─── */

function LoadingSkeleton() {
  return (
    <div className="space-y-4" aria-live="polite" aria-busy="true">
      <div className="card rounded-xl p-6">
        <div className="space-y-3">
          <div className="h-4 w-3/4 animate-pulse rounded bg-gradient-to-r from-st-gold-light/10 via-st-gold-light/20 to-st-gold-light/10" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-gradient-to-r from-st-gold-light/10 via-st-gold-light/20 to-st-gold-light/10" style={{ animationDelay: "150ms" }} />
          <div className="h-4 w-5/6 animate-pulse rounded bg-gradient-to-r from-st-gold-light/10 via-st-gold-light/20 to-st-gold-light/10" style={{ animationDelay: "300ms" }} />
          <div className="h-4 w-2/3 animate-pulse rounded bg-gradient-to-r from-st-gold-light/10 via-st-gold-light/20 to-st-gold-light/10" style={{ animationDelay: "450ms" }} />
        </div>
      </div>
      <p className="text-center text-[12px] font-light text-st-text-muted/60">
        Processing your request...
      </p>
    </div>
  );
}

/* ─── Full Version CTA ─── */

function FullVersionCta() {
  return (
    <div className="card rounded-xl p-6 text-center">
      <div className="mx-auto mb-4 h-px w-16 gold-glimmer" />
      <h4 className="mb-2 text-sm font-medium tracking-wide text-white">
        Want the full version?
      </h4>
      <p className="mb-5 text-[13px] font-light leading-[1.7] text-st-text-muted">
        This demo shows a fraction of what the full solution delivers.
        Get a custom implementation tailored to your business.
      </p>
      <a
        href="#contact"
        className="hero-btn-primary inline-block overflow-hidden rounded-xl px-6 py-3 text-[13px] font-light tracking-wide text-white transition-all duration-500"
      >
        Contact us
      </a>
    </div>
  );
}
