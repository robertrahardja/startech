import { useState } from "react";
import { useInView } from "../hooks/useInView";
import { SectionHeader } from "./Products";

const CAPABILITIES = [
  {
    title: "AWS AI Infrastructure",
    description:
      "Scalable AI deployment on Lambda, SageMaker, and Bedrock with cost-optimised, production-grade architectures.",
    details: [
      "Auto-scaling inference endpoints on SageMaker",
      "Serverless pipelines with Lambda and Step Functions",
      "Bedrock foundation model access with guardrails",
      "Cost optimisation through spot instances and reserved capacity",
    ],
    metric: "99.99%",
    metricLabel: "uptime",
  },
  {
    title: "OpenAI Integration",
    description:
      "Custom GPT-4 implementations, RAG systems with proprietary data, and intelligent automation pipelines.",
    details: [
      "Fine-tuned models on your domain-specific data",
      "RAG with vector search over internal documents",
      "Function calling for structured tool use",
      "Token-optimised prompts for cost efficiency",
    ],
    metric: "10x",
    metricLabel: "faster decisions",
  },
  {
    title: "AI Avatars & Video",
    description:
      "HeyGen-powered video avatars for training, marketing, and customer engagement at scale.",
    details: [
      "Photo-realistic avatars from a single reference image",
      "Script-to-video with automatic lip synchronisation",
      "Batch personalised video for outreach campaigns",
      "Custom branded templates and backgrounds",
    ],
    metric: "90%",
    metricLabel: "cost reduction",
  },
  {
    title: "Voice AI",
    description:
      "ElevenLabs voice synthesis in 50+ languages. Natural TTS for IVR, assistants, and multilingual content.",
    details: [
      "Voice cloning with just a few minutes of audio",
      "Real-time streaming for conversational AI",
      "Multi-language support with accent control",
      "Integration with IVR, chatbots, and e-learning",
    ],
    metric: "50+",
    metricLabel: "languages",
  },
  {
    title: "Edge AI",
    description:
      "Cloudflare Workers AI for sub-100ms inference across 300+ global data centres. No cold starts.",
    details: [
      "Deploy models to 300+ edge locations worldwide",
      "Zero cold start with always-warm inference",
      "Built-in vectorize for semantic search at the edge",
      "Pay-per-request pricing with no GPU management",
    ],
    metric: "<100ms",
    metricLabel: "global latency",
  },
  {
    title: "RAG & Fine-Tuning",
    description:
      "Retrieval-Augmented Generation with your proprietary data. Domain-specific models that understand your business.",
    details: [
      "Vector embeddings from your documents, databases, and APIs",
      "Hybrid search combining semantic and keyword retrieval",
      "Fine-tuning workflows with evaluation and versioning",
      "Guardrails for hallucination prevention and compliance",
    ],
    metric: "24/7",
    metricLabel: "availability",
  },
];

export default function AiCapabilities() {
  return (
    <section id="ai-capabilities" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeader
          label="AI Capabilities"
          title="Enterprise AI, production-ready"
          subtitle="We combine leading AI platforms to deliver solutions that scale. Implementation, not just strategy."
        />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((cap, i) => (
            <CapabilityCard key={cap.title} capability={cap} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CapabilityCard({
  capability,
  index,
}: {
  capability: (typeof CAPABILITIES)[number];
  index: number;
}) {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [flipped, setFlipped] = useState(false);

  const hasDetails = capability.details && capability.details.length > 0;

  return (
    <div
      ref={ref}
      className={`flip-card ${isInView ? "reveal visible" : "reveal"}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div
        className={`flip-card-inner ${flipped ? "is-flipped" : ""}`}
        onClick={hasDetails ? () => setFlipped((p) => !p) : undefined}
      >
        {/* ─── Front ─── */}
        <div className="flip-card-front card group relative overflow-hidden rounded-xl p-6 sm:p-7">
          <div className="relative z-10 flex h-full flex-col">
            <div className="mb-5 flex items-baseline justify-between">
              <span className="font-display text-2xl text-white md:text-3xl">
                {capability.metric}
              </span>
              <span className="text-[10px] font-light tracking-[0.15em] uppercase text-st-text-muted">
                {capability.metricLabel}
              </span>
            </div>

            <h3 className="mb-2 text-sm font-medium tracking-wide text-white md:text-base">
              {capability.title}
            </h3>
            <p className="flex-1 text-sm font-light leading-[1.7] text-st-text-muted">
              {capability.description}
            </p>

            {hasDetails && (
              <div className="mt-4 flex items-center justify-end">
                <span className="text-[10px] font-light tracking-[0.15em] uppercase text-st-text-muted/40 transition-colors duration-300 group-hover:text-st-gold-light/60">
                  Details
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ─── Back ─── */}
        {hasDetails && (
          <div className="flip-card-back flip-card-back-glass rounded-xl p-5 sm:p-6">
            <div className="relative z-10 flex h-full flex-col">
              <div className="mb-3 flex items-baseline justify-between">
                <span className="font-display text-xl text-st-gold-light/70 md:text-2xl">
                  {capability.metric}
                </span>
                <span className="text-[10px] font-light tracking-[0.15em] uppercase text-st-gold-light/40">
                  {capability.metricLabel}
                </span>
              </div>

              <div className="mb-3 h-px w-full gold-glimmer" />

              <ul className="flex-1 space-y-2">
                {capability.details.map((detail) => (
                  <li
                    key={detail}
                    className="flex items-start gap-2.5 text-[12px] font-light leading-[1.6] text-st-text-muted/90"
                  >
                    <span className="mt-[7px] h-px w-2.5 shrink-0 bg-st-gold-light/20" />
                    {detail}
                  </li>
                ))}
              </ul>

              <div className="mt-3 flex items-center justify-end">
                <span className="text-[10px] font-light tracking-[0.15em] uppercase text-st-text-muted/30">
                  Tap to flip
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
