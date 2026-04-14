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

function generateCsv(items: LineItem[]): string {
  const header = "Description,Quantity,Unit Price (SGD),Amount (SGD)";
  const rows = items.map(
    (i) => `"${i.description}",${i.quantity},${i.unit_price},${i.amount}`
  );
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

export default function QuotationGeneratorDemo(props: DemoRendererProps) {
  const { onSubmit, isLoading, result, error, clearResult } = props;
  const [clientName, setClientName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      client_name: clientName,
      service_description: serviceDescription,
      quantity,
      notes,
    });
  };

  if (result) {
    const quoteNumber = result.quote_number as string;
    const date = result.date as string;
    const client = result.client as string;
    const items = (result.items as LineItem[]) || [];
    const subtotal = result.subtotal as number;
    const gst = result.gst as number;
    const total = result.total as number;
    const terms = result.terms as string;
    const validityDays = result.validity_days as number;

    return (
      <div className="animate-fade-in-up space-y-4">
        <div className="rounded-xl border border-st-border bg-st-bg-card p-5">
          {/* Header */}
          <div className="mb-5 flex items-start justify-between border-b border-st-border pb-4">
            <div>
              <h3 className="text-[17px] font-light tracking-wide text-white">
                QUOTATION
              </h3>
              <p className="mt-1 text-[12px] font-light text-st-text-muted">
                {quoteNumber}
              </p>
            </div>
            <p className="text-[12px] font-light text-st-text-muted">{date}</p>
          </div>

          {/* Client */}
          <div className="mb-5">
            <p className="text-[11px] font-light tracking-wide text-st-text-muted">
              Bill To
            </p>
            <p className="mt-1 text-[13px] font-light text-white">{client}</p>
          </div>

          {/* Items table */}
          <div className="overflow-x-auto">
            <table className="w-full text-[13px] font-light">
              <thead>
                <tr className="border-b border-st-border text-left text-st-text-muted">
                  <th className="pb-2 pr-4 font-light">Description</th>
                  <th className="pb-2 pr-4 text-right font-light">Qty</th>
                  <th className="pb-2 pr-4 text-right font-light">
                    Unit Price (SGD)
                  </th>
                  <th className="pb-2 text-right font-light">Amount (SGD)</th>
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

          {/* Totals */}
          <div className="mt-4 space-y-1 border-t border-st-border pt-3 text-right text-[13px] font-light">
            <div className="text-st-text-muted">
              Subtotal:{" "}
              <span className="ml-3 text-white">{subtotal.toFixed(2)}</span>
            </div>
            <div className="text-st-text-muted">
              GST (9%):{" "}
              <span className="ml-3 text-white">{gst.toFixed(2)}</span>
            </div>
            <div className="mt-1 text-[14px] text-white">
              Total:{" "}
              <span className="ml-3 font-normal">{total.toFixed(2)}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-5 space-y-2 border-t border-st-border pt-4 text-[12px] font-light text-st-text-muted">
            {terms && (
              <p>
                <span className="text-white/60">Terms:</span> {terms}
              </p>
            )}
            <p>
              <span className="text-white/60">Valid for:</span> {validityDays}{" "}
              days
            </p>
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
                generateCsv(items),
                `quotation-${quoteNumber || "draft"}.csv`
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
        <p>Enter your client&apos;s name and describe the services or products you want to quote — include quantities, specifications, and any special terms. The AI will generate a professional quotation with line items, subtotals, 9% GST, and payment terms.</p>
        <p className="mt-2 text-[12px] text-st-gold-light/60">Example: &apos;Web design for a 5-page corporate site with contact form and mobile responsive design, delivery in 4 weeks.&apos; The more specific, the more realistic the quote.</p>
      </div>
      <div>
        <label className={labelClass}>Client Name</label>
        <input
          type="text"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          placeholder="Client or company name"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Services/Products</label>
        <textarea
          value={serviceDescription}
          onChange={(e) => setServiceDescription(e.target.value)}
          placeholder="What services or products to quote..."
          rows={3}
          className={`${inputClass} resize-none`}
        />
      </div>

      <div>
        <label className={labelClass}>Quantity/Scope</label>
        <input
          type="text"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="e.g. 100 units, 6 months..."
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Special Requirements</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any special terms or requirements..."
          rows={2}
          className={`${inputClass} resize-none`}
        />
      </div>

      {error && (
        <p className="text-[13px] font-light text-red-400/80">{error}</p>
      )}

      <button
        type="submit"
        disabled={
          isLoading || !clientName.trim() || !serviceDescription.trim()
        }
        className="relative w-full overflow-hidden rounded-xl border border-st-gold/30 bg-st-gold/15 px-4 py-3.5 text-[13px] font-light tracking-wide text-st-gold-light transition-all duration-500 hover:bg-st-gold/25 hover:border-st-gold/50 disabled:opacity-40"
      >
        {isLoading ? "Generating..." : "Generate"}
      </button>
    </form>
  );
}
