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

interface KeyMetric {
  metric: string;
  value: string;
  assessment: "positive" | "negative" | "neutral";
}

const assessmentColors: Record<string, string> = {
  positive: "text-emerald-400 border-emerald-400/20",
  negative: "text-red-400 border-red-400/20",
  neutral: "text-gray-400 border-gray-400/20",
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-SG", {
    style: "currency",
    currency: "SGD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

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
    const rPeriod = result.period as string;
    const rRevenue = result.revenue as number;
    const rExpenses = result.expenses as number;
    const netProfit = result.net_profit as number;
    const grossMargin = result.gross_margin_pct as number;
    const netMargin = result.net_margin_pct as number;
    const analysis = result.analysis as string;
    const keyMetrics = (result.key_metrics as KeyMetric[]) || [];
    const trends = (result.trends as string[]) || [];
    const recommendations = (result.recommendations as string[]) || [];

    return (
      <div className="animate-fade-in-up space-y-4">
        {/* P&L Summary */}
        <div className="rounded-xl border border-st-border bg-st-bg-card p-5">
          <div className="mb-4 flex items-baseline justify-between">
            <h3 className="text-[15px] font-light text-white">
              Profit &amp; Loss Summary
            </h3>
            <span className="text-[11px] font-light tracking-wide text-st-text-muted">
              {rPeriod}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
            <div>
              <span className="text-[11px] font-light text-st-text-muted">
                Revenue
              </span>
              <p className="mt-0.5 text-[15px] font-light text-white">
                {formatCurrency(rRevenue)}
              </p>
            </div>
            <div>
              <span className="text-[11px] font-light text-st-text-muted">
                Expenses
              </span>
              <p className="mt-0.5 text-[15px] font-light text-white">
                {formatCurrency(rExpenses)}
              </p>
            </div>
            <div>
              <span className="text-[11px] font-light text-st-text-muted">
                Net Profit
              </span>
              <p
                className={`mt-0.5 text-[15px] font-light ${netProfit >= 0 ? "text-emerald-400" : "text-red-400"}`}
              >
                {formatCurrency(netProfit)}
              </p>
            </div>
            <div>
              <span className="text-[11px] font-light text-st-text-muted">
                Gross Margin
              </span>
              <p className="mt-0.5 text-[15px] font-light text-white">
                {grossMargin}%
              </p>
            </div>
            <div>
              <span className="text-[11px] font-light text-st-text-muted">
                Net Margin
              </span>
              <p
                className={`mt-0.5 text-[15px] font-light ${netMargin >= 0 ? "text-emerald-400" : "text-red-400"}`}
              >
                {netMargin}%
              </p>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        {keyMetrics.length > 0 && (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {keyMetrics.map((km, i) => {
              const colors =
                assessmentColors[km.assessment] || assessmentColors.neutral;
              return (
                <div
                  key={i}
                  className={`rounded-xl border bg-st-bg-card p-4 ${colors}`}
                >
                  <span className="text-[11px] font-light text-st-text-muted">
                    {km.metric}
                  </span>
                  <p className="mt-0.5 text-[15px] font-light">{km.value}</p>
                </div>
              );
            })}
          </div>
        )}

        {/* Analysis */}
        {analysis && (
          <div className="rounded-xl border border-st-border bg-st-bg-card p-5">
            <h4 className="mb-2 text-[13px] font-light text-st-text-muted">
              Analysis
            </h4>
            <p className="text-[13px] font-light leading-[1.7] text-white">
              {analysis}
            </p>
          </div>
        )}

        {/* Trends */}
        {trends.length > 0 && (
          <div className="rounded-xl border border-st-border bg-st-bg-card p-5">
            <h4 className="mb-2 text-[13px] font-light text-st-text-muted">
              Trends
            </h4>
            <ul className="space-y-1">
              {trends.map((trend, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-[13px] font-light leading-[1.7] text-white"
                >
                  <span className="mt-1 text-st-text-muted/50">&bull;</span>
                  {trend}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="rounded-xl border border-st-border bg-st-bg-card p-5">
            <h4 className="mb-2 text-[13px] font-light text-st-text-muted">
              Recommendations
            </h4>
            <ol className="space-y-1">
              {recommendations.map((rec, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-[13px] font-light leading-[1.7] text-white"
                >
                  <span className="min-w-[1.25rem] text-st-text-muted">
                    {i + 1}.
                  </span>
                  {rec}
                </li>
              ))}
            </ol>
          </div>
        )}

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
        <p>Enter the reporting period, total revenue, and total expenses in SGD. Optionally, add a breakdown of revenue sources or expense categories. The AI will generate a financial analysis with profit margins, key metrics, trend observations, and actionable recommendations.</p>
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
        <p className="text-[13px] font-light text-red-400/80">{error}</p>
      )}

      <button
        type="submit"
        disabled={isLoading || !period.trim() || !revenue.trim()}
        className="relative w-full overflow-hidden rounded-xl border border-st-gold/30 bg-st-gold/15 px-4 py-3.5 text-[13px] font-light tracking-wide text-st-gold-light transition-all duration-500 hover:bg-st-gold/25 hover:border-st-gold/50 disabled:opacity-40"
      >
        {isLoading ? "Generating..." : "Generate Financial Report"}
      </button>
    </form>
  );
}
