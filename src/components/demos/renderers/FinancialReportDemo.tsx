import { useState } from "react";
import FinancialReportResult from "./FinancialReportResult";

interface DemoRendererProps {
  onSubmit: (input: Record<string, string>) => void;
  isLoading: boolean;
  result: Record<string, unknown> | null;
  error: string | null;
  clearResult?: () => void;
}

const inputClass =
  "w-full min-h-[44px] rounded-lg border border-st-border bg-st-surface px-3.5 py-3 text-[13px] font-normal text-st-text placeholder-st-text-muted/50 outline-none transition-colors duration-300 focus:border-st-border";
const labelClass =
  "mb-1.5 block text-[11px] font-medium tracking-wide text-st-text/60";

export default function FinancialReportDemo(props: DemoRendererProps) {
  const { onSubmit, isLoading, result, error, clearResult } = props;
  const [period, setPeriod] = useState("");
  const [revenue, setRevenue] = useState("");
  const [expenses, setExpenses] = useState("");
  const [breakdown, setBreakdown] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ period, revenue, expenses, breakdown });
  };

  if (result) {
    return <FinancialReportResult result={result} error={error} clearResult={clearResult} />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-lg border border-st-gold/20 bg-st-gold/[0.04] px-4 py-3.5 text-[13px] font-normal leading-relaxed text-st-gold-light/80">
        <p className="mb-2 font-medium text-st-gold-light">How to use this demo</p>
        <p>Enter the reporting period, total revenue, and total expenses in SGD. Optionally, add a breakdown of revenue sources or expense categories. The AI drafts a summary with profit margins, key metrics, trend observations and recommendations, for your accountant to review. It is not a set of financial statements.</p>
        <p className="mt-2 text-[12px] text-st-gold-light/60">Example: Period &apos;Q1 2026&apos;, Revenue &apos;$250,000&apos;, Expenses &apos;$180,000&apos;, Breakdown &apos;Product sales $150K, Services $100K. Rent $30K, Salaries $120K, Marketing $30K&apos;. The more detail, the richer the analysis.</p>
      </div>
      <div>
        <label className={labelClass}>Period</label>
        <input
          type="text"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          placeholder="e.g. Q1 2026, January 2026..."
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Total Revenue</label>
        <input
          type="text"
          value={revenue}
          onChange={(e) => setRevenue(e.target.value)}
          placeholder="Total revenue in SGD"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Total Expenses</label>
        <input
          type="text"
          value={expenses}
          onChange={(e) => setExpenses(e.target.value)}
          placeholder="Total expenses in SGD"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Breakdown</label>
        <textarea
          value={breakdown}
          onChange={(e) => setBreakdown(e.target.value)}
          placeholder="Revenue/expense breakdown if available..."
          rows={3}
          className={`${inputClass} resize-none`}
        />
      </div>

      {error && (
        <p className="text-[13px] font-normal text-red-400/80">{error}</p>
      )}

      <button
        type="submit"
        disabled={isLoading || !period.trim() || !revenue.trim()}
        className="relative w-full overflow-hidden rounded-xl border border-st-gold/30 bg-st-gold/15 px-4 py-3.5 text-[13px] font-normal tracking-wide text-st-gold-light transition-all duration-500 hover:bg-st-gold/25 hover:border-st-gold/50 disabled:opacity-40"
      >
        {isLoading ? "Generating..." : "Generate Financial Report"}
      </button>
    </form>
  );
}
