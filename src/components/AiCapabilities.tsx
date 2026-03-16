import { useInView } from "../hooks/useInView";
import { SectionHeader } from "./Products";

const CAPABILITIES = [
  {
    title: "AWS AI Infrastructure",
    description:
      "Scalable AI deployment on Lambda, SageMaker, and Bedrock with cost-optimised, production-grade architectures.",
    metric: "99.99%",
    metricLabel: "uptime",
  },
  {
    title: "OpenAI Integration",
    description:
      "Custom GPT-4 implementations, RAG systems with proprietary data, and intelligent automation pipelines.",
    metric: "10x",
    metricLabel: "faster decisions",
  },
  {
    title: "AI Avatars & Video",
    description:
      "HeyGen-powered video avatars for training, marketing, and customer engagement at scale.",
    metric: "90%",
    metricLabel: "cost reduction",
  },
  {
    title: "Voice AI",
    description:
      "ElevenLabs voice synthesis in 50+ languages. Natural TTS for IVR, assistants, and multilingual content.",
    metric: "50+",
    metricLabel: "languages",
  },
  {
    title: "Edge AI",
    description:
      "Cloudflare Workers AI for sub-100ms inference across 300+ global data centres. No cold starts.",
    metric: "<100ms",
    metricLabel: "global latency",
  },
  {
    title: "RAG & Fine-Tuning",
    description:
      "Retrieval-Augmented Generation with your proprietary data. Domain-specific models that understand your business.",
    metric: "24/7",
    metricLabel: "availability",
  },
];

export default function AiCapabilities() {
  return (
    <section id="ai-capabilities" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-[960px] px-6 sm:px-8">
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

  return (
    <div
      ref={ref}
      className={`card group rounded-xl p-6 sm:p-7 ${
        isInView ? "reveal visible" : "reveal"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="mb-5 flex items-baseline justify-between">
        <span className="font-display text-2xl text-white">
          {capability.metric}
        </span>
        <span className="text-[10px] font-light tracking-[0.15em] uppercase text-st-text-muted">
          {capability.metricLabel}
        </span>
      </div>

      <h3 className="mb-2 text-[13px] font-medium tracking-wide text-white">
        {capability.title}
      </h3>
      <p className="text-[13px] font-light leading-[1.7] text-st-text-muted">
        {capability.description}
      </p>
    </div>
  );
}
