import ResultActions from "./ResultActions";

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

const signColor = (n: number) => (n >= 0 ? "text-emerald-400" : "text-red-400");

/** The drafted management summary: headline figures, metrics, analysis, trends and recommendations. */
export default function FinancialReportResult({
  result,
  error,
  clearResult,
}: {
  result: Record<string, unknown>;
  error: string | null;
  clearResult?: () => void;
}) {
  const netProfit = result.net_profit as number;
  const netMargin = result.net_margin_pct as number;
  const keyMetrics = (result.key_metrics as KeyMetric[]) || [];
  const analysis = result.analysis as string;

  const figures = [
    { label: "Revenue", value: formatCurrency(result.revenue as number), color: "text-st-text" },
    { label: "Expenses", value: formatCurrency(result.expenses as number), color: "text-st-text" },
    { label: "Net Profit", value: formatCurrency(netProfit), color: signColor(netProfit) },
    { label: "Gross Margin", value: `${result.gross_margin_pct as number}%`, color: "text-st-text" },
    { label: "Net Margin", value: `${netMargin}%`, color: signColor(netMargin) },
  ];

  return (
    <div className="animate-fade-in-up space-y-4">
      <div className="rounded-xl border border-st-border bg-st-bg-card p-5">
        <div className="mb-4 flex items-baseline justify-between">
          <h3 className="text-[15px] font-normal text-st-text">Summary (draft for review)</h3>
          <span className="text-[11px] font-medium tracking-wide text-st-text-muted">{result.period as string}</span>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          {figures.map((f) => (
            <div key={f.label}>
              <span className="text-[11px] font-medium text-st-text-muted">{f.label}</span>
              <p className={`mt-0.5 text-[15px] font-normal ${f.color}`}>{f.value}</p>
            </div>
          ))}
        </div>
      </div>

      {keyMetrics.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {keyMetrics.map((km, i) => (
            <div
              key={i}
              className={`rounded-xl border bg-st-bg-card p-4 ${assessmentColors[km.assessment] || assessmentColors.neutral}`}
            >
              <span className="text-[11px] font-medium text-st-text-muted">{km.metric}</span>
              <p className="mt-0.5 text-[15px] font-normal">{km.value}</p>
            </div>
          ))}
        </div>
      )}

      {analysis && (
        <Card title="Analysis">
          <p className="text-[13px] font-normal leading-[1.7] text-st-text">{analysis}</p>
        </Card>
      )}

      <ListCard title="Trends" items={(result.trends as string[]) || []} />
      <ListCard title="Recommendations" items={(result.recommendations as string[]) || []} numbered />

      <ResultActions error={error} clearResult={clearResult} />
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-st-border bg-st-bg-card p-5">
      <h4 className="mb-2 text-[13px] font-normal text-st-text-muted">{title}</h4>
      {children}
    </div>
  );
}

function ListCard({ title, items, numbered = false }: { title: string; items: string[]; numbered?: boolean }) {
  if (items.length === 0) return null;
  const List = numbered ? "ol" : "ul";
  return (
    <Card title={title}>
      <List className="space-y-1">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2 text-[13px] font-normal leading-[1.7] text-st-text">
            {numbered ? (
              <span className="min-w-[1.25rem] text-st-text-muted">{i + 1}.</span>
            ) : (
              <span className="mt-1 text-st-text-muted/50">&bull;</span>
            )}
            {item}
          </li>
        ))}
      </List>
    </Card>
  );
}
