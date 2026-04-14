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

export default function CustomerChatbotDemo(props: DemoRendererProps) {
  const { onSubmit, isLoading, result, error, clearResult } = props;
  const [businessDescription, setBusinessDescription] = useState("");
  const [question, setQuestion] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      business_description: businessDescription,
      question,
    });
  };

  if (result) {
    const q = result.question as string;
    const answer = result.answer as string;
    const confidence = result.confidence_percent as number;
    const followups = (result.suggested_followups as string[]) || [];

    return (
      <div className="animate-fade-in-up space-y-4">
        <div className="rounded-xl border border-st-border bg-st-bg-card p-5">
          {/* Question bubble - right aligned */}
          <div className="mb-4 flex justify-end">
            <div className="max-w-[80%] rounded-2xl rounded-br-md bg-white/10 px-4 py-3">
              <p className="text-[13px] font-light text-white">{q}</p>
            </div>
          </div>

          {/* Answer bubble - left aligned */}
          <div className="mb-4 flex justify-start">
            <div className="max-w-[80%] rounded-2xl rounded-bl-md border border-st-border bg-white/[0.03] px-4 py-3">
              <p className="text-[13px] font-light leading-relaxed text-white">
                {answer}
              </p>
              <span className="mt-2 inline-block rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-light tracking-wide text-st-text-muted">
                {confidence}% confident
              </span>
            </div>
          </div>

          {/* Suggested follow-ups */}
          {followups.length > 0 && (
            <div className="mt-4 border-t border-st-border pt-3">
              <p className="mb-2 text-[11px] font-light tracking-wide text-st-text-muted">
                Suggested follow-ups
              </p>
              <div className="flex flex-wrap gap-2">
                {followups.map((f, i) => (
                  <span
                    key={i}
                    className="cursor-default rounded-full border border-st-border px-3 py-1.5 text-[12px] font-light text-white/70 transition-colors duration-300 hover:border-st-border-hover hover:text-white"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {error && (
          <p className="text-[13px] font-light text-red-400/80">{error}</p>
        )}

        <button
          type="button"
          onClick={clearResult}
          className="hero-btn-secondary relative overflow-hidden rounded-xl px-6 py-3 text-[13px] font-light tracking-wide text-st-text-muted transition-all duration-500 hover:text-white"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-lg border border-st-gold/20 bg-st-gold/[0.04] px-4 py-3.5 text-[13px] font-light leading-relaxed text-st-gold-light/80">
        <p className="mb-2 font-medium text-st-gold-light">How to use this demo</p>
        <p>First, describe your business in a few sentences — what you sell, who your customers are, and your key services. Then type a real question that a customer might ask. The AI will generate a response as if it were your trained support chatbot.</p>
        <p className="mt-2 text-[12px] text-st-gold-light/60">Try questions like &apos;What are your opening hours?&apos;, &apos;Do you deliver to Jurong?&apos;, or &apos;How do I return an item?&apos; — the more context you give about your business, the better the answers.</p>
      </div>
      <div>
        <label className={labelClass}>Your Business</label>
        <textarea
          value={businessDescription}
          onChange={(e) => setBusinessDescription(e.target.value)}
          placeholder="Describe your business briefly..."
          rows={3}
          className={`${inputClass} resize-none`}
        />
      </div>

      <div>
        <label className={labelClass}>Sample Customer Question</label>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="What would a customer ask?"
          rows={2}
          className={`${inputClass} resize-none`}
        />
      </div>

      {error && (
        <p className="text-[13px] font-light text-red-400/80">{error}</p>
      )}

      <button
        type="submit"
        disabled={isLoading || !businessDescription.trim() || !question.trim()}
        className="relative w-full overflow-hidden rounded-xl border border-st-gold/30 bg-st-gold/15 px-4 py-3.5 text-[13px] font-light tracking-wide text-st-gold-light transition-all duration-500 hover:bg-st-gold/25 hover:border-st-gold/50 disabled:opacity-40"
      >
        {isLoading ? "Generating..." : "Generate"}
      </button>
    </form>
  );
}
