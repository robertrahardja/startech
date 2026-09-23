import { useState, useCallback } from "react";
import { useInView } from "../../hooks/useInView";
import { useDemoApi } from "../../hooks/useDemoApi";
import { useI18n } from "../../i18n";
import { CACHED_DEMO_DATA } from "./cachedDemoData";
import GoogleSignIn from "./GoogleSignIn";
import type { DemoLead } from "../../types";

type DemoPhase = "preview" | "customize" | "custom_result";

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
  const { t } = useI18n();
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const { lead, setLead, submitDemo, isLoading, result, error, clearResult } =
    useDemoApi(demoType);
  const signedInLabel = t.demos.signIn.signedInAs;
  const [phase, setPhase] = useState<DemoPhase>("preview");
  const [pdfLoading, setPdfLoading] = useState(false);

  const cachedData = CACHED_DEMO_DATA[demoType] || null;

  const handleDownloadPdf = useCallback(
    async (data: Record<string, unknown>) => {
      setPdfLoading(true);
      try {
        const { generateDemoPdf } = await import("../../lib/demoPdfGenerator");
        await generateDemoPdf(demoType, data);
      } catch {
        // silent — PDF is a bonus feature
      } finally {
        setPdfLoading(false);
      }
    },
    [demoType]
  );

  const handleCustomize = useCallback(() => {
    clearResult();
    setPhase(lead ? "customize" : "customize");
  }, [clearResult, lead]);

  const handleLeadCapture = useCallback(
    (newLead: DemoLead) => {
      setLead(newLead);
    },
    [setLead]
  );

  const handleBackToSample = useCallback(() => {
    clearResult();
    setPhase("preview");
  }, [clearResult]);

  // When API returns a result, move to custom_result phase
  const wrappedSubmit = useCallback(
    (input: Record<string, string>) => {
      submitDemo(input).then(() => {
        // submitDemo sets result internally — phase transition
        // happens via the effect below
      });
    },
    [submitDemo]
  );

  // Detect when result arrives during customize phase → move to custom_result
  if (phase === "customize" && result && !isLoading) {
    // Use a microtask to avoid setState during render
    queueMicrotask(() => setPhase("custom_result"));
  }

  return (
    <div ref={ref} className={isInView ? "reveal visible" : "reveal"}>
      <div className="relative">
        {/* ─── Phase: PREVIEW (anonymous, cached data) ─── */}
        {phase === "preview" && cachedData && (
          <div className="space-y-6">
            {/* Sample badge */}
            <div className="flex items-center gap-2 rounded-lg border border-st-gold/20 bg-st-gold/[0.04] px-4 py-2.5">
              <svg className="h-4 w-4 text-st-gold-light/70 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
              </svg>
              <span className="text-[12px] font-normal text-st-gold-light/80">
                Sample result — see what AI can produce for your business
              </span>
            </div>

            {/* Render cached result via the demo renderer */}
            {children({
              onSubmit: () => {},
              isLoading: false,
              result: cachedData,
              error: null,
              clearResult: handleCustomize,
            })}

            {/* Action bar */}
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => handleDownloadPdf(cachedData)}
                disabled={pdfLoading}
                className="relative overflow-hidden rounded-xl border border-st-gold/30 bg-st-gold/15 px-6 py-3 text-[13px] font-normal tracking-wide text-st-gold-light transition-all duration-500 hover:bg-st-gold/25 hover:border-st-gold/50 disabled:opacity-40"
              >
                {pdfLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                    Generating PDF...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                    Download PDF
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={handleCustomize}
                className="relative overflow-hidden rounded-xl border border-st-border bg-st-surface px-6 py-3 text-[13px] font-normal tracking-wide text-st-text transition-all duration-500 hover:bg-st-surface hover:border-st-border"
              >
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>
                  Customize with your data
                </span>
              </button>
            </div>
          </div>
        )}

        {/* ─── Phase: CUSTOMIZE (lead capture → form) ─── */}
        {phase === "customize" && (
          <div className="space-y-6">
            {/* Sign in if no lead yet */}
            {!lead && (
              <GoogleSignIn onSignedIn={handleLeadCapture} title={title} />
            )}

            {/* Demo form (once lead exists) */}
            {lead && (
              <>
                {/* Logged-in indicator */}
                <div className="flex items-center justify-between rounded-lg border border-st-border/50 bg-st-surface px-4 py-2.5">
                  <span className="text-[12px] font-normal text-st-text-muted">
                    {lead.name
                      ? `${signedInLabel} `
                      : signedInLabel}
                    {lead.name && <span className="text-st-text">{lead.name}</span>}
                  </span>
                  <button
                    type="button"
                    onClick={handleBackToSample}
                    className="text-[11px] font-medium text-st-text-muted/60 transition-colors duration-300 hover:text-st-text-muted"
                  >
                    {t.demos.signIn.backToSample}
                  </button>
                </div>

                {/* Loading overlay */}
                {isLoading && <LoadingSkeleton />}

                {/* Demo form */}
                {!isLoading && children({
                  onSubmit: wrappedSubmit,
                  isLoading,
                  result: null,
                  error,
                  clearResult: () => {},
                })}

                {/* Error display */}
                {error && !isLoading && (
                  <div className="rounded-lg border border-red-500/10 bg-red-500/[0.03] px-4 py-3">
                    <p className="text-[13px] font-normal text-red-400/80">{error}</p>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* ─── Phase: CUSTOM_RESULT (AI-generated result) ─── */}
        {phase === "custom_result" && result && (
          <div className="space-y-6">
            {/* Custom result badge */}
            <div className="flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.04] px-4 py-2.5">
              <svg className="h-4 w-4 text-emerald-400/70 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-[12px] font-normal text-emerald-400/80">
                Custom result generated with your data
              </span>
            </div>

            {/* Render custom result via the demo renderer */}
            {children({
              onSubmit: wrappedSubmit,
              isLoading: false,
              result,
              error,
              clearResult: () => {
                clearResult();
                setPhase("customize");
              },
            })}

            {/* Action bar */}
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => handleDownloadPdf(result)}
                disabled={pdfLoading}
                className="relative overflow-hidden rounded-xl border border-st-gold/30 bg-st-gold/15 px-6 py-3 text-[13px] font-normal tracking-wide text-st-gold-light transition-all duration-500 hover:bg-st-gold/25 hover:border-st-gold/50 disabled:opacity-40"
              >
                {pdfLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                    Generating PDF...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                    Download PDF
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  clearResult();
                  setPhase("customize");
                }}
                className="hero-btn-secondary relative overflow-hidden rounded-xl px-6 py-3 text-[13px] font-normal tracking-wide text-st-text-muted transition-all duration-500 hover:text-st-text"
              >
                Try Again
              </button>
              <button
                type="button"
                onClick={handleBackToSample}
                className="hero-btn-secondary relative overflow-hidden rounded-xl px-6 py-3 text-[13px] font-normal tracking-wide text-st-text-muted transition-all duration-500 hover:text-st-text"
              >
                ← Back to sample
              </button>
            </div>

            {/* Full version CTA */}
            <FullVersionCta />
          </div>
        )}
      </div>
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
      <p className="text-center text-[12px] font-normal text-st-text-muted/60">
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
      <h4 className="mb-2 text-sm font-medium tracking-wide text-st-text">
        Want the full version?
      </h4>
      <p className="mb-5 text-[13px] font-normal leading-[1.7] text-st-text-muted">
        This demo shows a fraction of what the full solution delivers.
        Get a custom implementation tailored to your business.
      </p>
      <a
        href="#contact"
        className="hero-btn-primary inline-block overflow-hidden rounded-xl px-6 py-3 text-[13px] font-normal tracking-wide text-st-text transition-all duration-500"
      >
        Contact us
      </a>
    </div>
  );
}
