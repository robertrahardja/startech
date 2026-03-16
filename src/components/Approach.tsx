import { useInView } from "../hooks/useInView";
import { SectionHeader } from "./Products";
import type { TimelineStep } from "../types";

const STEPS: TimelineStep[] = [
  {
    week: "Week 1–2",
    title: "Discovery & AI Readiness",
    items: [
      "Business goals and pain point analysis",
      "Current systems and data assessment",
      "Highest-impact AI opportunity identification",
      "Success metrics and KPI definition",
    ],
    deliverable: "AI Opportunity Report & ROI Projections",
  },
  {
    week: "Week 3–4",
    title: "Solution Architecture",
    items: [
      "AI solution architecture design",
      "Model and platform selection",
      "System integration planning",
      "Data pipeline and security protocols",
    ],
    deliverable: "Technical Architecture & Implementation Plan",
  },
  {
    week: "Week 5–8",
    title: "Proof of Concept",
    items: [
      "Working prototype with real data",
      "AI model training and fine-tuning",
      "Core feature implementation",
      "User testing and feedback",
    ],
    deliverable: "Working PoC with Core Capabilities",
  },
  {
    week: "Week 9–11",
    title: "Production Deployment",
    items: [
      "Production-ready system scaling",
      "Security, monitoring, and backup",
      "Load testing and performance tuning",
      "Staff training and documentation",
    ],
    deliverable: "Production System Ready for Users",
  },
  {
    week: "Week 12+",
    title: "Optimisation & Support",
    items: [
      "Performance monitoring and feedback",
      "Continuous model improvement",
      "Feature enhancements",
      "Ongoing technical support",
    ],
    deliverable: "Performance Reports & Recommendations",
  },
];

export default function Approach() {
  return (
    <section id="approach" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <SectionHeader
          label="Approach"
          title="Strategy to production in 90 days"
          subtitle="A proven process refined across enterprise deployments. We implement, not just advise."
        />

        <div className="relative">
          {/* Vertical line */}
          <div className="line-grow absolute top-0 bottom-0 left-3 w-px bg-st-border sm:left-4" />

          <div className="space-y-10">
            {STEPS.map((step, i) => (
              <TimelineCard key={step.week} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineCard({
  step,
  index,
}: {
  step: TimelineStep;
  index: number;
}) {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`relative flex items-start gap-6 pl-9 sm:pl-11 ${
        isInView ? "reveal visible" : "reveal"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Dot */}
      <div className="absolute left-3 top-1 z-10 sm:left-4">
        <div className="h-1.5 w-1.5 rounded-full bg-st-text-muted/40 transition-colors duration-500" />
      </div>

      <div className="flex-1">
        <span className="mb-1 inline-block text-[10px] font-light tracking-[0.15em] uppercase text-st-text-muted">
          {step.week}
        </span>
        <h3 className="mb-3 text-[13px] font-medium tracking-wide text-white">
          {step.title}
        </h3>
        <ul className="mb-4 space-y-1.5 text-[13px] font-light leading-[1.7] text-st-text-muted">
          {step.items.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span className="mt-2 h-px w-3 shrink-0 bg-st-border" />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-[11px] font-light tracking-wide text-st-blue-light/50">
          {step.deliverable}
        </p>
      </div>
    </div>
  );
}
