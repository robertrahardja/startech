import { useState, useRef, useEffect } from "react";
import { useInView } from "../hooks/useInView";
import { SectionHeader } from "./Products";
import type { TimelineStep } from "../types";

const DAY_LABELS = ["Day 14", "Day 28", "Day 56", "Day 77", "Day 90"];

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
  const [active, setActive] = useState(0);
  const [sectionRef, isInView] = useInView({ threshold: 0.15 });
  const touchStart = useRef(0);

  const go = (dir: 1 | -1) => {
    setActive((p) => Math.max(0, Math.min(STEPS.length - 1, p + dir)));
  };

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const step = STEPS[active];

  return (
    <section id="approach" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeader
          label="Approach"
          title="Strategy to production in 90 days"
          subtitle="A proven process refined across enterprise deployments. We implement, not just advise."
        />

        <div
          ref={sectionRef}
          className={`${isInView ? "reveal visible" : "reveal"}`}
        >
          {/* Progress steps */}
          <div className="mb-10 flex items-start justify-center">
            {STEPS.map((s, i) => (
              <div key={s.week} className="flex items-start">
                <button
                  onClick={() => setActive(i)}
                  className="flex flex-col items-center gap-2.5"
                >
                  <div
                    className={`step-box flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-all duration-400 sm:h-11 sm:w-11 ${
                      i === active
                        ? "border border-st-gold-light/40 bg-st-gold-light/15 text-st-gold-light"
                        : i < active
                          ? "border border-white/[0.12] bg-white/[0.06] text-white/70"
                          : "border border-white/[0.08] bg-white/[0.02] text-white/40"
                    }`}
                    style={{ animationDelay: `${i * 150}ms` }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <span
                    className={`text-[11px] font-light tracking-[0.1em] uppercase transition-colors duration-400 ${
                      i === active ? "text-st-gold-light/80" : "text-white/35"
                    }`}
                  >
                    {DAY_LABELS[i]}
                  </span>
                </button>
                {/* Connector line */}
                {i < STEPS.length - 1 && (
                  <div
                    className={`mt-5 h-px w-6 self-start transition-colors duration-400 sm:w-10 md:w-14 sm:mt-[22px] ${
                      i < active ? "bg-st-gold-light/30" : "bg-white/[0.10]"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Card area with swipe */}
          <div
            className="relative mx-auto max-w-2xl"
            onTouchStart={(e) => { touchStart.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              const diff = touchStart.current - e.changedTouches[0].clientX;
              if (Math.abs(diff) > 50) go(diff > 0 ? 1 : -1);
            }}
          >
            {/* Card */}
            <div
              key={active}
              className="carousel-card-enter card rounded-2xl p-8 sm:p-10"
            >
              {/* Header */}
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <span className="mb-2 inline-block text-sm font-light tracking-[0.2em] uppercase text-st-gold-light/70 sm:text-base">
                    {step.week}
                  </span>
                  <h3 className="text-xl font-medium tracking-wide text-white sm:text-2xl">
                    {step.title}
                  </h3>
                </div>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-st-gold-light/15 bg-white/[0.04]">
                  <span className="font-display text-lg text-st-gold-light/80">
                    {String(active + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* Items */}
              <ul className="mb-8 space-y-3">
                {step.items.map((item, i) => (
                  <li
                    key={item}
                    className="carousel-item-enter flex items-start gap-3 text-base font-light leading-[1.75] text-white/85 sm:text-lg"
                    style={{ animationDelay: `${i * 60 + 100}ms` }}
                  >
                    <span className="mt-[10px] h-px w-4 shrink-0 bg-st-gold-light/30" />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Deliverable */}
              <div className="border-t border-white/[0.06] pt-5">
                <span className="text-[11px] font-light tracking-[0.15em] uppercase text-white/45">
                  Deliverable
                </span>
                <p className="mt-1.5 text-[15px] font-light leading-[1.6] text-st-gold-light/80">
                  {step.deliverable}
                </p>
              </div>
            </div>

            {/* Navigation arrows */}
            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={() => go(-1)}
                disabled={active === 0}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.10] text-white/50 transition-all hover:border-white/[0.20] hover:text-white disabled:cursor-default disabled:opacity-20 disabled:hover:border-white/[0.10] disabled:hover:text-white/50"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>

              {/* Dot indicators */}
              <div className="flex gap-2">
                {STEPS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`h-1.5 rounded-full transition-all duration-400 ${
                      i === active
                        ? "w-6 bg-st-gold-light/50"
                        : "w-1.5 bg-white/15 hover:bg-white/30"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => go(1)}
                disabled={active === STEPS.length - 1}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.10] text-white/50 transition-all hover:border-white/[0.20] hover:text-white disabled:cursor-default disabled:opacity-20 disabled:hover:border-white/[0.10] disabled:hover:text-white/50"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
