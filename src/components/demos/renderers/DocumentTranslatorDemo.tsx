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

const LANGUAGES = [
  "Chinese (Simplified)",
  "Chinese (Traditional)",
  "Malay",
  "Indonesian",
  "Tamil",
  "Japanese",
  "Korean",
];

export default function DocumentTranslatorDemo(props: DemoRendererProps) {
  const { onSubmit, isLoading, result, error, clearResult } = props;
  const [sourceText, setSourceText] = useState("");
  const [targetLanguage, setTargetLanguage] = useState(LANGUAGES[0]);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ source_text: sourceText, target_language: targetLanguage });
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (result) {
    const sourceLanguage = result.source_language as string;
    const targetLang = result.target_language as string;
    const originalText = result.original_text as string;
    const translatedText = result.translated_text as string;
    const notes = (result.notes as string[]) || [];

    return (
      <div className="animate-fade-in-up space-y-4">
        {/* Side-by-side on desktop, stacked on mobile */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Original */}
          <div className="rounded-xl border border-st-border bg-st-bg-card p-5">
            <div className="mb-3 flex items-center gap-2">
              <h3 className="text-[13px] font-light text-st-text-muted">
                Original
              </h3>
              <span className="rounded-full bg-white/[0.05] px-2 py-0.5 text-[11px] font-light text-st-text-muted">
                {sourceLanguage}
              </span>
            </div>
            <p className="whitespace-pre-wrap text-[13px] font-light leading-[1.7] text-white">
              {originalText}
            </p>
          </div>

          {/* Translation */}
          <div className="rounded-xl border border-st-border bg-st-bg-card p-5">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-[13px] font-light text-st-text-muted">
                  Translation
                </h3>
                <span className="rounded-full bg-white/[0.05] px-2 py-0.5 text-[11px] font-light text-st-text-muted">
                  {targetLang}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(translatedText)}
                className="text-[11px] font-light text-st-text-muted transition-colors duration-300 hover:text-white"
              >
                {copied ? "Copied" : "Copy Translation"}
              </button>
            </div>
            <p className="whitespace-pre-wrap text-[13px] font-light leading-[1.7] text-white">
              {translatedText}
            </p>
          </div>
        </div>

        {/* Notes */}
        {notes.length > 0 && (
          <div className="rounded-xl border border-st-border bg-st-bg-card p-5">
            <h4 className="mb-2 text-[13px] font-light text-st-text-muted">
              Translation Notes
            </h4>
            <ul className="space-y-1">
              {notes.map((note, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-[13px] font-light leading-[1.7] text-white"
                >
                  <span className="mt-1 text-st-text-muted/50">&bull;</span>
                  {note}
                </li>
              ))}
            </ul>
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
        <p>Paste the text you want translated — business emails, contracts, product descriptions, marketing copy, or any document. Select your target language from the dropdown. The AI will translate while preserving tone, formatting, and business terminology.</p>
        <p className="mt-2 text-[12px] text-st-gold-light/60">Supported languages: Chinese (Simplified and Traditional), Malay, Indonesian, Tamil, Japanese, Korean. The AI auto-detects the source language.</p>
      </div>
      <div>
        <label className={labelClass}>Text to Translate</label>
        <textarea
          value={sourceText}
          onChange={(e) => setSourceText(e.target.value)}
          placeholder="Paste the text to translate..."
          rows={5}
          className={`${inputClass} resize-none`}
        />
      </div>

      <div>
        <label className={labelClass}>Target Language</label>
        <select
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
          className={inputClass}
        >
          {LANGUAGES.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <p className="text-[13px] font-light text-red-400/80">{error}</p>
      )}

      <button
        type="submit"
        disabled={isLoading || !sourceText.trim()}
        className="relative w-full overflow-hidden rounded-xl border border-st-gold/30 bg-st-gold/15 px-4 py-3.5 text-[13px] font-light tracking-wide text-st-gold-light transition-all duration-500 hover:bg-st-gold/25 hover:border-st-gold/50 disabled:opacity-40"
      >
        {isLoading ? "Generating..." : "Translate"}
      </button>
    </form>
  );
}
