import { useState } from "react";
import TrainingContentResult from "./TrainingContentResult";

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

export default function TrainingContentDemo(props: DemoRendererProps) {
  const { onSubmit, isLoading, result, error, clearResult } = props;
  const [sopText, setSopText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ sop_text: sopText });
  };

  if (result) {
    return <TrainingContentResult result={result} error={error} clearResult={clearResult} />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-lg border border-st-gold/20 bg-st-gold/[0.04] px-4 py-3.5 text-[13px] font-normal leading-relaxed text-st-gold-light/80">
        <p className="mb-2 font-medium text-st-gold-light">How to use this demo</p>
        <p>Paste your Standard Operating Procedure (SOP), process document, or step-by-step guide. The AI will transform it into a structured training course — with learning modules, objectives, content summaries, and quiz questions with multiple-choice answers.</p>
        <p className="mt-2 text-[12px] text-st-gold-light/60">The output is a draft for your trainer to review. Include as much procedural detail as possible — the AI will organize it into logical learning modules with assessments.</p>
      </div>
      <div>
        <label className={labelClass}>SOP or Process Document</label>
        <textarea
          value={sopText}
          onChange={(e) => setSopText(e.target.value)}
          placeholder="Paste your SOP, procedure, or process document..."
          rows={8}
          className={`${inputClass} resize-none`}
        />
      </div>

      {error && (
        <p className="text-[13px] font-normal text-red-400/80">{error}</p>
      )}

      <button
        type="submit"
        disabled={isLoading || !sopText.trim()}
        className="relative w-full overflow-hidden rounded-xl border border-st-gold/30 bg-st-gold/15 px-4 py-3.5 text-[13px] font-normal tracking-wide text-st-gold-light transition-all duration-500 hover:bg-st-gold/25 hover:border-st-gold/50 disabled:opacity-40"
      >
        {isLoading ? "Generating..." : "Generate Training Course"}
      </button>
    </form>
  );
}
