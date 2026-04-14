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

interface SocialPost {
  platform: string;
  content: string;
  hashtags: string[];
  character_count: number;
  best_posting_time: string;
}

const PLATFORMS = ["LinkedIn", "Instagram", "Facebook", "X/Twitter"] as const;

export default function SocialMediaManagerDemo(props: DemoRendererProps) {
  const { onSubmit, isLoading, result, error, clearResult } = props;
  const [topic, setTopic] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ topic });
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  if (result) {
    const topicSummary = result.topic_summary as string;
    const posts = (result.posts as SocialPost[]) || [];

    const activePost = posts[activeTab];

    return (
      <div className="animate-fade-in-up space-y-4">
        {/* Topic summary */}
        <div className="rounded-xl border border-st-border bg-st-bg-card p-5">
          <h3 className="mb-2 text-[15px] font-light text-white">
            Content Strategy
          </h3>
          <p className="text-[13px] font-light leading-[1.7] text-st-text-muted">
            {topicSummary}
          </p>
        </div>

        {/* Platform tabs */}
        <div className="rounded-xl border border-st-border bg-st-bg-card p-5">
          <div className="mb-4 flex gap-1 rounded-lg border border-st-border p-1">
            {PLATFORMS.map((platform, i) => (
              <button
                key={platform}
                type="button"
                onClick={() => setActiveTab(i)}
                className={`flex-1 rounded-md px-3 py-2 text-[12px] font-light tracking-wide transition-all duration-300 ${
                  activeTab === i
                    ? "bg-white/[0.08] text-white"
                    : "text-st-text-muted hover:text-white"
                }`}
              >
                {platform}
              </button>
            ))}
          </div>

          {activePost && (
            <div className="space-y-4">
              {/* Post content */}
              <div className="rounded-lg border border-st-border/50 bg-white/[0.02] p-4">
                <p className="whitespace-pre-wrap text-[13px] font-light leading-[1.7] text-white">
                  {activePost.content}
                </p>
              </div>

              {/* Hashtags */}
              {activePost.hashtags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {activePost.hashtags.map((tag, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-white/[0.05] px-2.5 py-1 text-[11px] font-light text-st-text-muted"
                    >
                      {tag.startsWith("#") ? tag : `#${tag}`}
                    </span>
                  ))}
                </div>
              )}

              {/* Meta info */}
              <div className="flex items-center justify-between border-t border-st-border pt-3">
                <div className="flex gap-4">
                  <span className="text-[11px] font-light text-st-text-muted">
                    {activePost.character_count} characters
                  </span>
                  <span className="text-[11px] font-light text-st-text-muted">
                    Best time: {activePost.best_posting_time}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(activePost.content, activeTab)}
                  className="text-[11px] font-light text-st-text-muted transition-colors duration-300 hover:text-white"
                >
                  {copied === activeTab ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
          )}
        </div>

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
        <p>Describe what you want to promote — a new product, service, event, sale, or company announcement. Include key details like features, prices, dates, or target audience. The AI will generate ready-to-post content tailored to LinkedIn, Instagram, Facebook, and X/Twitter.</p>
        <p className="mt-2 text-[12px] text-st-gold-light/60">Each platform gets content optimized for its audience and format — LinkedIn is professional, Instagram is visual and casual, X is concise. Hashtags and best posting times are included.</p>
      </div>
      <div>
        <label className={labelClass}>Topic or Product</label>
        <textarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder={`Describe your product, service, or topic to promote...\n\ne.g. We just launched a new organic coffee blend at our cafe in Tiong Bahru`}
          rows={4}
          className={`${inputClass} resize-none`}
        />
      </div>

      {error && (
        <p className="text-[13px] font-light text-red-400/80">{error}</p>
      )}

      <button
        type="submit"
        disabled={isLoading || !topic.trim()}
        className="relative w-full overflow-hidden rounded-xl border border-st-gold/30 bg-st-gold/15 px-4 py-3.5 text-[13px] font-light tracking-wide text-st-gold-light transition-all duration-500 hover:bg-st-gold/25 hover:border-st-gold/50 disabled:opacity-40"
      >
        {isLoading ? "Generating..." : "Generate Posts"}
      </button>
    </form>
  );
}
