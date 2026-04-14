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

interface Finding {
  clause_excerpt: string;
  issue: string;
  severity: "high" | "medium" | "low";
  regulation: string;
  suggestion: string;
}

const severityColors: Record<string, { text: string; bg: string }> = {
  high: { text: "text-red-400", bg: "bg-red-400/10" },
  medium: { text: "text-amber-400", bg: "bg-amber-400/10" },
  low: { text: "text-blue-400", bg: "bg-blue-400/10" },
};

function riskScoreColor(score: number): string {
  if (score <= 3) return "text-emerald-400";
  if (score <= 6) return "text-amber-400";
  return "text-red-400";
}

export default function ComplianceCheckerDemo(props: DemoRendererProps) {
  const { onSubmit, isLoading, result, error, clearResult } = props;
  const [contractText, setContractText] = useState("");
  const [expandedFinding, setExpandedFinding] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ contract_text: contractText });
  };

  const toggleFinding = (index: number) => {
    setExpandedFinding(expandedFinding === index ? null : index);
  };

  if (result) {
    const documentType = result.document_type as string;
    const findings = (result.findings as Finding[]) || [];
    const riskScore = result.risk_score as number;
    const summary = result.summary as string;

    return (
      <div className="animate-fade-in-up space-y-4">
        {/* Risk score + summary */}
        <div className="rounded-xl border border-st-border bg-st-bg-card p-5">
          <div className="flex items-start gap-6">
            {/* Risk score */}
            <div className="flex flex-col items-center">
              <span
                className={`text-[40px] font-light leading-none ${riskScoreColor(riskScore)}`}
              >
                {riskScore}
              </span>
              <span className="mt-1 text-[11px] font-light text-st-text-muted">
                Risk Score
              </span>
            </div>

            {/* Summary */}
            <div className="flex-1">
              <div className="mb-2 flex items-center gap-2">
                <h3 className="text-[15px] font-light text-white">
                  Compliance Review
                </h3>
                <span className="rounded-full bg-white/[0.05] px-2 py-0.5 text-[11px] font-light text-st-text-muted">
                  {documentType}
                </span>
              </div>
              <p className="text-[13px] font-light leading-[1.7] text-st-text-muted">
                {summary}
              </p>
            </div>
          </div>
        </div>

        {/* Findings */}
        <div className="space-y-3">
          {findings.map((finding, i) => {
            const sev = severityColors[finding.severity] || severityColors.low;
            const isExpanded = expandedFinding === i;

            return (
              <div
                key={i}
                className="rounded-xl border border-st-border bg-st-bg-card"
              >
                {/* Header */}
                <button
                  type="button"
                  onClick={() => toggleFinding(i)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-light ${sev.text} ${sev.bg}`}
                    >
                      {finding.severity}
                    </span>
                    <span className="text-[13px] font-light text-white">
                      {finding.issue}
                    </span>
                  </div>
                  <svg
                    className={`h-4 w-4 flex-shrink-0 text-st-text-muted transition-transform duration-300 ${
                      isExpanded ? "rotate-180" : ""
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

                {/* Expanded */}
                {isExpanded && (
                  <div className="space-y-3 border-t border-st-border px-5 pb-5 pt-4">
                    {/* Clause excerpt */}
                    <div className="rounded-lg border-l-2 border-st-border bg-white/[0.02] px-4 py-3">
                      <p className="text-[12px] font-light italic leading-[1.7] text-st-text-muted">
                        &ldquo;{finding.clause_excerpt}&rdquo;
                      </p>
                    </div>

                    {/* Regulation */}
                    <div>
                      <span className="text-[11px] font-light text-st-text-muted">
                        Regulation
                      </span>
                      <p className="mt-0.5 text-[13px] font-light text-white">
                        {finding.regulation}
                      </p>
                    </div>

                    {/* Suggestion */}
                    <div>
                      <span className="text-[11px] font-light text-st-text-muted">
                        Suggestion
                      </span>
                      <p className="mt-0.5 text-[13px] font-light leading-[1.7] text-white">
                        {finding.suggestion}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
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
        <p>Paste the text from a contract, employee policy, terms of service, or any business agreement. The AI will analyze it against key Singapore regulations — Employment Act, PDPA (data protection), Companies Act — and flag potential compliance issues with severity ratings and fix suggestions.</p>
        <p className="mt-2 text-[12px] text-st-gold-light/60">For best results, paste at least 2-3 paragraphs. The AI generates a risk score (0-10), identifies specific clauses of concern, cites the relevant regulation, and suggests corrective language.</p>
      </div>
      <div>
        <label className={labelClass}>Contract or Policy Text</label>
        <textarea
          value={contractText}
          onChange={(e) => setContractText(e.target.value)}
          placeholder="Paste your contract, policy, or agreement text here..."
          rows={8}
          className={`${inputClass} resize-none`}
        />
      </div>

      {error && (
        <p className="text-[13px] font-light text-red-400/80">{error}</p>
      )}

      <button
        type="submit"
        disabled={isLoading || !contractText.trim()}
        className="relative w-full overflow-hidden rounded-xl border border-st-gold/30 bg-st-gold/15 px-4 py-3.5 text-[13px] font-light tracking-wide text-st-gold-light transition-all duration-500 hover:bg-st-gold/25 hover:border-st-gold/50 disabled:opacity-40"
      >
        {isLoading ? "Generating..." : "Check Compliance"}
      </button>
    </form>
  );
}
