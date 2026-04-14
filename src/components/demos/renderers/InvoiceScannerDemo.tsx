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

interface LineItem {
  description: string;
  quantity: number;
  unit_price: number;
  amount: number;
}

function generateCsv(items: LineItem[], subtotal: number, gst: number, total: number): string {
  const header = "Description,Quantity,Unit Price,Amount";
  const rows = items.map(
    (i) => `"${i.description}",${i.quantity},${i.unit_price},${i.amount}`
  );
  rows.push(`"Subtotal",,,${subtotal}`);
  rows.push(`"GST",,,${gst}`);
  rows.push(`"Total",,,${total}`);
  return [header, ...rows].join("\n");
}

function downloadCsv(csv: string, filename: string) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function InvoiceScannerDemo(props: DemoRendererProps) {
  const { onSubmit, isLoading, result, error, clearResult } = props;
  const [receiptText, setReceiptText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ receipt_text: receiptText });
  };

  if (result) {
    const vendor = result.vendor as string;
    const date = result.date as string;
    const currency = (result.currency as string) || "SGD";
    const items = (result.items as LineItem[]) || [];
    const subtotal = result.subtotal as number;
    const gst = result.gst as number;
    const total = result.total as number;

    return (
      <div className="animate-fade-in-up space-y-4">
        <div className="rounded-xl border border-st-border bg-st-bg-card p-5">
          <div className="mb-4 flex items-baseline justify-between">
            <div>
              <h3 className="text-[15px] font-light text-white">{vendor}</h3>
              <p className="mt-0.5 text-[12px] font-light text-st-text-muted">
                {date}
              </p>
            </div>
            <span className="text-[11px] font-light tracking-wide text-st-text-muted">
              {currency}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-[13px] font-light">
              <thead>
                <tr className="border-b border-st-border text-left text-st-text-muted">
                  <th className="pb-2 pr-4 font-light">Description</th>
                  <th className="pb-2 pr-4 text-right font-light">Qty</th>
                  <th className="pb-2 pr-4 text-right font-light">
                    Unit Price
                  </th>
                  <th className="pb-2 text-right font-light">Amount</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr
                    key={i}
                    className={i % 2 === 1 ? "bg-white/[0.02]" : ""}
                  >
                    <td className="py-2 pr-4 text-white">{item.description}</td>
                    <td className="py-2 pr-4 text-right text-white">
                      {item.quantity}
                    </td>
                    <td className="py-2 pr-4 text-right text-white">
                      {item.unit_price.toFixed(2)}
                    </td>
                    <td className="py-2 text-right text-white">
                      {item.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 space-y-1 border-t border-st-border pt-3 text-right text-[13px] font-light">
            <div className="text-st-text-muted">
              Subtotal:{" "}
              <span className="ml-3 text-white">{subtotal.toFixed(2)}</span>
            </div>
            <div className="text-st-text-muted">
              GST:{" "}
              <span className="ml-3 text-white">{gst.toFixed(2)}</span>
            </div>
            <div className="mt-1 text-[14px] text-white">
              Total:{" "}
              <span className="ml-3 font-normal">{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {error && (
          <p className="text-[13px] font-light text-red-400/80">{error}</p>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() =>
              downloadCsv(
                generateCsv(items, subtotal, gst, total),
                `invoice-${vendor.replace(/\s+/g, "-").toLowerCase()}.csv`
              )
            }
            className="hero-btn-secondary relative overflow-hidden rounded-xl px-6 py-3 text-[13px] font-light tracking-wide text-st-text-muted transition-all duration-500 hover:text-white"
          >
            Export CSV
          </button>
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
        <p>Copy and paste the full text from a receipt or invoice — include the store name, date, item names, quantities, and prices. The more detail you include, the more accurate the extraction.</p>
        <p className="mt-2 text-[12px] text-st-gold-light/60">Example: &apos;NTUC FairPrice, 12 Jan 2026, Milk x2 $3.90, Rice 5kg $8.50, Eggs x1 $2.80&apos;. Works with any format — handwritten notes, email invoices, or POS receipts.</p>
      </div>
      <div>
        <label className={labelClass}>Receipt or Invoice Text</label>
        <textarea
          value={receiptText}
          onChange={(e) => setReceiptText(e.target.value)}
          placeholder={`ABC Office Supplies\nDate: 15/01/2026\n\nA4 Paper x5 @ $8.50\nPrinter Ink x2 @ $45.00\nStapler x1 @ $12.00`}
          rows={8}
          className={`${inputClass} resize-none`}
        />
      </div>

      {error && (
        <p className="text-[13px] font-light text-red-400/80">{error}</p>
      )}

      <button
        type="submit"
        disabled={isLoading || !receiptText.trim()}
        className="relative w-full overflow-hidden rounded-xl border border-st-gold/30 bg-st-gold/15 px-4 py-3.5 text-[13px] font-light tracking-wide text-st-gold-light transition-all duration-500 hover:bg-st-gold/25 hover:border-st-gold/50 disabled:opacity-40"
      >
        {isLoading ? "Generating..." : "Generate"}
      </button>
    </form>
  );
}
