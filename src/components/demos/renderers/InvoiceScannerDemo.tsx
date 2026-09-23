import { useCallback, useRef, useState } from "react";

interface DemoRendererProps {
  onSubmit: (input: Record<string, string>) => void;
  isLoading: boolean;
  result: Record<string, unknown> | null;
  error: string | null;
  clearResult: () => void;
}

const MAX_IMAGE_DIMENSION = 1600;
const JPEG_QUALITY = 0.82;

/**
 * Re-encodes an image file as a capped-resolution JPEG data URL before it
 * ever leaves the browser. A phone photo can run 10-12MP; nothing here
 * needs more detail than MAX_IMAGE_DIMENSION gives the model, and sending
 * the original would multiply both the request size and the per-call cost.
 */
async function compressImageToDataUrl(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_IMAGE_DIMENSION / Math.max(bitmap.width, bitmap.height));
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  return canvas.toDataURL("image/jpeg", JPEG_QUALITY);
}

const inputClass =
  "w-full min-h-[44px] rounded-lg border border-st-border bg-st-surface px-3.5 py-3 text-[13px] font-normal text-st-text placeholder-st-text-muted/50 outline-none transition-colors duration-300 focus:border-st-border";
const labelClass =
  "mb-1.5 block text-[11px] font-medium tracking-wide text-st-text/60";

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

interface ExtractedInvoiceResultProps {
  result: Record<string, unknown>;
  error: string | null;
  clearResult: () => void;
}

/** The extracted-receipt table plus its export/retry actions — split out so
 * the form component only has to carry the upload/fallback state it owns. */
function ExtractedInvoiceResult({ result, error, clearResult }: ExtractedInvoiceResultProps) {
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
            <h3 className="text-[15px] font-normal text-st-text">{vendor}</h3>
            <p className="mt-0.5 text-[12px] font-normal text-st-text-muted">
              {date}
            </p>
          </div>
          <span className="text-[11px] font-medium tracking-wide text-st-text-muted">
            {currency}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-[13px] font-normal">
            <thead>
              <tr className="border-b border-st-border text-left text-st-text-muted">
                <th className="pb-2 pr-4 font-normal">Description</th>
                <th className="pb-2 pr-4 text-right font-normal">Qty</th>
                <th className="pb-2 pr-4 text-right font-normal">
                  Unit Price
                </th>
                <th className="pb-2 text-right font-normal">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr
                  key={i}
                  className={i % 2 === 1 ? "bg-st-surface" : ""}
                >
                  <td className="py-2 pr-4 text-st-text">{item.description}</td>
                  <td className="py-2 pr-4 text-right text-st-text">
                    {item.quantity}
                  </td>
                  <td className="py-2 pr-4 text-right text-st-text">
                    {item.unit_price.toFixed(2)}
                  </td>
                  <td className="py-2 text-right text-st-text">
                    {item.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 space-y-1 border-t border-st-border pt-3 text-right text-[13px] font-normal">
          <div className="text-st-text-muted">
            Subtotal:{" "}
            <span className="ml-3 text-st-text">{subtotal.toFixed(2)}</span>
          </div>
          <div className="text-st-text-muted">
            GST:{" "}
            <span className="ml-3 text-st-text">{gst.toFixed(2)}</span>
          </div>
          <div className="mt-1 text-[14px] text-st-text">
            Total:{" "}
            <span className="ml-3 font-normal">{total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {error && (
        <p className="text-[13px] font-normal text-red-400/80">{error}</p>
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
          className="hero-btn-secondary relative overflow-hidden rounded-xl px-6 py-3 text-[13px] font-normal tracking-wide text-st-text-muted transition-all duration-500 hover:text-st-text"
        >
          Export CSV
        </button>
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

// The upload/preview/text-fallback states genuinely belong together as one
// form; the result view already split out into ExtractedInvoiceResult above.
// fallow-ignore-next-line complexity
export default function InvoiceScannerDemo(props: DemoRendererProps) {
  const { onSubmit, isLoading, result, error, clearResult } = props;
  const [receiptText, setReceiptText] = useState("");
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [showTextFallback, setShowTextFallback] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageError(null);
    if (!file.type.startsWith("image/")) {
      setImageError("Please choose an image file.");
      return;
    }

    try {
      const dataUrl = await compressImageToDataUrl(file);
      setImageDataUrl(dataUrl);
    } catch {
      setImageError("Couldn't read that image — try a different file.");
    }
  }, []);

  const clearImage = useCallback(() => {
    setImageDataUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (imageDataUrl) {
      onSubmit({ receipt_image: imageDataUrl });
    } else {
      onSubmit({ receipt_text: receiptText });
    }
  };

  if (result) {
    return <ExtractedInvoiceResult result={result} error={error} clearResult={clearResult} />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-lg border border-st-gold/20 bg-st-gold/[0.04] px-4 py-3.5 text-[13px] font-normal leading-relaxed text-st-gold-light/80">
        <p className="mb-2 font-medium text-st-gold-light">How to use this demo</p>
        <p>Take a photo of a receipt or invoice, or upload one from your device. The AI reads it directly — no typing required.</p>
      </div>

      {imageDataUrl ? (
        <div className="space-y-2">
          <label className={labelClass}>Receipt / Invoice Photo</label>
          <div className="relative overflow-hidden rounded-lg border border-st-border">
            <img
              src={imageDataUrl}
              alt="Receipt preview"
              className="max-h-80 w-full object-contain bg-st-surface"
            />
            <button
              type="button"
              onClick={clearImage}
              className="absolute right-2 top-2 rounded-lg border border-st-border bg-st-bg-card px-3 py-1.5 text-[12px] font-normal text-st-text-muted transition-colors duration-300 hover:text-st-text"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div>
          <label className={labelClass}>Receipt / Invoice Photo</label>
          <label
            htmlFor="receipt-photo-input"
            className={`${inputClass} flex min-h-[120px] cursor-pointer flex-col items-center justify-center gap-2 border-dashed text-center text-st-text-muted hover:border-st-text-muted/40`}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75v6.75m0 0l-3-3m3 3l3-3m-8.25 6a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
            </svg>
            <span className="text-[13px]">Take a photo or choose a file</span>
          </label>
          <input
            id="receipt-photo-input"
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            className="sr-only"
          />
          {imageError && (
            <p className="mt-1.5 text-[12px] font-normal text-red-400/80">{imageError}</p>
          )}
        </div>
      )}

      {!imageDataUrl && (
        <div>
          {showTextFallback ? (
            <div>
              <label className={labelClass}>Or paste the text instead</label>
              <textarea
                value={receiptText}
                onChange={(e) => setReceiptText(e.target.value)}
                placeholder={`ABC Office Supplies\nDate: 15/01/2026\n\nA4 Paper x5 @ $8.50\nPrinter Ink x2 @ $45.00\nStapler x1 @ $12.00`}
                rows={6}
                className={`${inputClass} resize-none`}
              />
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowTextFallback(true)}
              className="text-[12px] font-normal text-st-text-muted/70 underline-offset-2 transition-colors duration-300 hover:text-st-text-muted hover:underline"
            >
              No photo handy? Paste the text instead
            </button>
          )}
        </div>
      )}

      {error && (
        <p className="text-[13px] font-normal text-red-400/80">{error}</p>
      )}

      <button
        type="submit"
        disabled={isLoading || (!imageDataUrl && !receiptText.trim())}
        className="relative w-full overflow-hidden rounded-xl border border-st-gold/30 bg-st-gold/15 px-4 py-3.5 text-[13px] font-normal tracking-wide text-st-gold-light transition-all duration-500 hover:bg-st-gold/25 hover:border-st-gold/50 disabled:opacity-40"
      >
        {isLoading ? "Generating..." : "Generate"}
      </button>
    </form>
  );
}
