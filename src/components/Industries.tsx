import { useInView } from "../hooks/useInView";
import { SectionHeader } from "./Products";

const INDUSTRIES = [
  {
    name: "Healthcare",
    description:
      "Hospital management, patient intake automation, medical record analysis, and AI-powered triage systems.",
  },
  {
    name: "Finance & Banking",
    description:
      "Accounting engines, insurance document processing, startup valuation, tax compliance, and fraud detection.",
  },
  {
    name: "Education",
    description:
      "LMS with AI tutoring, adaptive assessments, certification systems, and multi-language course delivery.",
  },
  {
    name: "Government",
    description:
      "Secure, compliant solutions for public sector. Citizen services automation and mission-critical applications.",
  },
  {
    name: "Manufacturing",
    description:
      "ERP systems, predictive maintenance, supply chain optimisation, and quality control automation.",
  },
  {
    name: "E-Commerce",
    description:
      "AI-powered recommendations, virtual assistants, automated customer service, and inventory management.",
  },
];

export default function Industries() {
  return (
    <section id="industries" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-[960px] px-6 sm:px-8">
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

  return (
    <div
      ref={ref}
      className={`card group rounded-xl p-6 sm:p-7 ${
        isInView ? "reveal visible" : "reveal"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <h3 className="mb-2 text-[13px] font-medium tracking-wide text-white">
        {industry.name}
      </h3>
      <p className="text-[13px] font-light leading-[1.7] text-st-text-muted">
        {industry.description}
      </p>
    </div>
  );
}
