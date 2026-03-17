import { useState } from "react";
import { useInView } from "../hooks/useInView";
import { SectionHeader } from "./Products";

const INDUSTRIES = [
  {
    name: "Healthcare",
    description:
      "Hospital management, patient intake automation, medical record analysis, and AI-powered triage systems.",
    details: [
      "Electronic medical records with HL7 and FHIR compliance",
      "AI triage that prioritises patients by symptom severity",
      "Automated insurance claim submission and tracking",
      "Telemedicine integration with scheduling and billing",
    ],
  },
  {
    name: "Finance & Banking",
    description:
      "Accounting engines, insurance document processing, startup valuation, tax compliance, and fraud detection.",
    details: [
      "Real-time transaction monitoring and anomaly detection",
      "Regulatory reporting for MAS and OJK compliance",
      "Automated reconciliation across accounts and currencies",
      "AI-powered credit scoring and risk assessment",
    ],
  },
  {
    name: "Education",
    description:
      "LMS with AI tutoring, adaptive assessments, certification systems, and multi-language course delivery.",
    details: [
      "Adaptive learning paths based on student performance",
      "AI-generated quizzes with automatic grading",
      "Multi-language content delivery with voice synthesis",
      "Certification tracking and credential management",
    ],
  },
  {
    name: "Government",
    description:
      "Secure, compliant solutions for public sector. Citizen services automation and mission-critical applications.",
    details: [
      "Citizen portal with digital identity verification",
      "Document processing for permits, licenses, and applications",
      "Audit-ready logging and compliance reporting",
      "High-availability infrastructure for critical services",
    ],
  },
  {
    name: "Manufacturing",
    description:
      "ERP systems, predictive maintenance, supply chain optimisation, and quality control automation.",
    details: [
      "IoT sensor integration for predictive maintenance",
      "Supply chain visibility with real-time tracking",
      "Quality control with computer vision inspection",
      "Production scheduling and capacity planning",
    ],
  },
  {
    name: "E-Commerce",
    description:
      "AI-powered recommendations, virtual assistants, automated customer service, and inventory management.",
    details: [
      "Personalised product recommendations with collaborative filtering",
      "AI chatbots for 24/7 customer support",
      "Dynamic pricing based on demand and competitor analysis",
      "Inventory forecasting with seasonal trend detection",
    ],
  },
];

export default function Industries() {
  return (
    <section id="industries" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeader
          label="Industries"
          title="Domain expertise"
          subtitle="Deep understanding of your industry's regulatory, operational, and technical requirements."
        />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((industry, i) => (
            <IndustryCard key={industry.name} industry={industry} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function IndustryCard({
  industry,
  index,
}: {
  industry: (typeof INDUSTRIES)[number];
  index: number;
}) {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [flipped, setFlipped] = useState(false);

  const hasDetails = industry.details && industry.details.length > 0;

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
            <h3 className="mb-2 text-sm font-medium tracking-wide text-white md:text-base">
              {industry.name}
            </h3>
            <p className="flex-1 text-sm font-light leading-[1.7] text-st-text-muted">
              {industry.description}
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
              <h3 className="mb-1 text-[13px] font-medium tracking-wide text-white">
                {industry.name}
              </h3>

              <div className="mb-3 h-px w-full gold-glimmer" />

              <ul className="flex-1 space-y-2">
                {industry.details.map((detail) => (
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
