import { useState } from "react";

interface DemoRendererProps {
  onSubmit: (input: Record<string, string>) => void;
  isLoading: boolean;
  result: Record<string, unknown> | null;
  error: string | null;
  clearResult: () => void;
}

const inputClass =
  "w-full min-h-[44px] rounded-lg border border-st-border bg-st-surface px-3.5 py-3 text-[13px] font-normal text-st-text placeholder-st-text-muted/50 outline-none transition-colors duration-300 focus:border-st-border";
const labelClass =
  "mb-1.5 block text-[11px] font-medium tracking-wide text-st-text/60";

interface InventoryItem {
  name: string;
  current_stock: number;
  daily_usage: number;
  days_until_empty: number;
  restock_date: string;
  alert_level: "critical" | "warning" | "ok";
  recommended_order_qty: number;
}

const alertColors: Record<string, string> = {
  critical: "text-red-400",
  warning: "text-amber-400",
  ok: "text-emerald-400",
};

const alertBgColors: Record<string, string> = {
  critical: "bg-red-400/10",
  warning: "bg-amber-400/10",
  ok: "bg-emerald-400/10",
};

export default function InventoryTrackerDemo(props: DemoRendererProps) {
  const { onSubmit, isLoading, result, error, clearResult } = props;
  const [itemsText, setItemsText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ items_text: itemsText });
  };

  if (result) {
    const analysisDate = result.analysis_date as string;
    const items = (result.items as InventoryItem[]) || [];
    const summary = result.summary as string;

    return (
      <div className="animate-fade-in-up space-y-4">
        <div className="rounded-xl border border-st-border bg-st-bg-card p-5">
          <div className="mb-4 flex items-baseline justify-between">
            <h3 className="text-[15px] font-normal text-st-text">
              Inventory Analysis
            </h3>
            <span className="text-[11px] font-medium tracking-wide text-st-text-muted">
              {analysisDate}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-[13px] font-normal">
              <thead>
                <tr className="border-b border-st-border text-left text-st-text-muted">
                  <th className="pb-2 pr-4 font-normal">Item</th>
                  <th className="pb-2 pr-4 text-right font-normal">Stock</th>
                  <th className="pb-2 pr-4 text-right font-normal">Daily Use</th>
                  <th className="pb-2 pr-4 text-right font-normal">Days Left</th>
                  <th className="pb-2 pr-4 font-normal">Restock By</th>
                  <th className="pb-2 pr-4 text-center font-normal">Alert</th>
                  <th className="pb-2 text-right font-normal">Order Qty</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr
                    key={i}
                    className={i % 2 === 1 ? "bg-st-surface" : ""}
                  >
                    <td className="py-2 pr-4 text-st-text">{item.name}</td>
                    <td className="py-2 pr-4 text-right text-st-text">
                      {item.current_stock}
                    </td>
                    <td className="py-2 pr-4 text-right text-st-text">
                      {item.daily_usage}
                    </td>
                    <td className="py-2 pr-4 text-right text-st-text">
                      {item.days_until_empty}
                    </td>
                    <td className="py-2 pr-4 text-st-text">{item.restock_date}</td>
                    <td className="py-2 pr-4 text-center">
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-medium ${alertColors[item.alert_level]} ${alertBgColors[item.alert_level]}`}
                      >
                        {item.alert_level}
                      </span>
                    </td>
                    <td className="py-2 text-right text-st-text">
                      {item.recommended_order_qty}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {summary && (
            <div className="mt-4 border-t border-st-border pt-3">
              <p className="text-[13px] font-normal leading-[1.7] text-st-text-muted">
                {summary}
              </p>
            </div>
          )}
        </div>

        {error && (
          <p className="text-[13px] font-normal text-red-400/80">{error}</p>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={clearResult}
            className="hero-btn-secondary relative overflow-hidden rounded-xl px-6 py-3 text-[13px] font-normal tracking-wide text-st-text-muted transition-all duration-500 hover:text-st-text"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-lg border border-st-gold/20 bg-st-gold/[0.04] px-4 py-3.5 text-[13px] font-normal leading-relaxed text-st-gold-light/80">
        <p className="mb-2 font-medium text-st-gold-light">How to use this demo</p>
        <p>List your inventory items, one per line. For each item, include the item name, current stock quantity, and how fast you use them (e.g. per day or per week). The AI will calculate days until empty, predict restock dates, and flag items that need urgent reordering.</p>
        <p className="mt-2 text-[12px] text-st-gold-light/60">Format: &apos;Item name - quantity - usage rate&apos;. Example: &apos;Printing Paper - 20 reams - 3 per day&apos; or &apos;Hand Soap - 5 bottles - 1 per week&apos;. Any format works — the AI will figure it out.</p>
      </div>
      <div>
        <label className={labelClass}>Items with Stock and Usage</label>
        <textarea
          value={itemsText}
          onChange={(e) => setItemsText(e.target.value)}
          placeholder={`List items with current stock and daily usage:\n\nA4 Paper - 50 reams - 3/day\nPrinter Ink - 8 cartridges - 1/week\nHand Sanitizer - 12 bottles - 2/day`}
          rows={6}
          className={`${inputClass} resize-none`}
        />
      </div>

      {error && (
        <p className="text-[13px] font-normal text-red-400/80">{error}</p>
      )}

      <button
        type="submit"
        disabled={isLoading || !itemsText.trim()}
        className="relative w-full overflow-hidden rounded-xl border border-st-gold/30 bg-st-gold/15 px-4 py-3.5 text-[13px] font-normal tracking-wide text-st-gold-light transition-all duration-500 hover:bg-st-gold/25 hover:border-st-gold/50 disabled:opacity-40"
      >
        {isLoading ? "Generating..." : "Analyse Inventory"}
      </button>
    </form>
  );
}
