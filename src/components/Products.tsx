import { useState } from "react";
import { useInView } from "../hooks/useInView";
import type { Product } from "../types";
import ExpandedDetailCard from "./ExpandedDetailCard";

const PRODUCTS: Product[] = [
  {
    title: "AI Implementation",
    description:
      "Retrieval over your own documents, domain-tuned models, and automation pipelines — with the guardrails and source attribution that make the output usable in a regulated business.",
    details: [
      "Retrieval-augmented generation with vector search over your proprietary data",
      "Multi-provider routing behind an abstraction layer — swap models without touching product code",
      "Confidence scoring with source attribution, so answers can be checked",
      "Guardrails for hallucination prevention and compliance review",
    ],
    icon: "brain",
    tags: ["Claude", "OpenAI", "RAG", "Vectorize"],
    span: "wide",
  },
  {
    title: "Enterprise Software",
    description:
      "Full ERP and line-of-business systems — financials, HR, inventory, procurement and manufacturing — built to be audited, not just demoed.",
    details: [
      "General ledger, AP, AR, payroll and fixed assets",
      "Multi-tenant, multi-currency, role-based access, audit-ready logging",
      "Singapore payroll compliance engine verified scenario-by-scenario against CPF Board tables",
      "Integrates with Xero, QuickBooks, Sheets and Excel",
    ],
    icon: "erp",
    tags: ["Java 21", "Spring Boot", "PostgreSQL"],
    span: "default",
  },
  {
    title: "Financial Systems",
    description:
      "Accounting engines, document AI, valuation and reconciliation for operators who answer to a regulator.",
    details: [
      "Automated reconciliation across accounts and currencies, with deterministic dedupe",
      "Bank statement ingestion — including formats that carry no transfer identifier",
      "KYC and AML workflows, MAS and OJK reporting",
      "DCF and comparable analysis with Monte Carlo simulation",
    ],
    icon: "chart",
    tags: ["D1", "PostgreSQL", "Workers"],
    span: "default",
  },
  {
    title: "Healthcare & Public Sector",
    description:
      "Patient platforms, medical records and citizen services for high-volume, high-assurance environments where the data rules come first.",
    details: [
      "Data residency decided at architecture time, not retrofitted after review",
      "Patient-owned custodian model — never a claim to be the provider's record system",
      "Multilingual delivery across English, Chinese, Malay and Bahasa Indonesia",
      "High-availability infrastructure for critical services",
    ],
    icon: "health",
    tags: ["PDPA", "BPJS", "Cloudflare"],
    span: "wide",
  },
];

const ICONS: Record<string, React.ReactNode> = {
  erp: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25a2.25 2.25 0 01-2.25-2.25v-2.25z" />
    </svg>
  ),
  brain: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
    </svg>
  ),
  chart: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  ),
  scan: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),
  edu: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15v-3.75m0 0h10.5" />
    </svg>
  ),
  health: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  ),
  exchange: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
    </svg>
  ),
  video: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25z" />
    </svg>
  ),
};

function ProductCard({
  product,
  index,
  onExpand,
}: {
  product: Product;
  index: number;
  onExpand: (product: Product) => void;
}) {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  const spanClass =
    product.span === "wide"
      ? "md:col-span-2"
      : product.span === "tall"
        ? "md:row-span-2"
        : "";

  const hasDetails = product.details && product.details.length > 0;

  return (
    <div
      ref={ref}
      className={`product-card ${spanClass} ${isInView ? "reveal visible" : "reveal"}`}
      style={{ transitionDelay: `${index * 60}ms` }}
      onClick={hasDetails ? () => onExpand(product) : undefined}
    >
      <div className="card group relative cursor-pointer overflow-hidden rounded-xl p-6 sm:p-7">
        <div className="relative z-10 flex h-full flex-col">
          <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.04] text-st-text-muted transition-colors duration-300 group-hover:text-st-text">
            {ICONS[product.icon]}
          </div>
          <h3 className="mb-2 text-sm font-medium tracking-wide text-white md:text-base">
            {product.title}
          </h3>
          <p className="mb-5 flex-1 text-sm font-light leading-[1.7] text-st-text-muted">
            {product.description}
          </p>
          <div className="flex flex-wrap items-center gap-1.5">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-white/[0.03] px-2 py-0.5 text-[10px] font-light tracking-wide text-st-text-muted"
              >
                {tag}
              </span>
            ))}
            {hasDetails && (
              <span className="ml-auto text-[10px] font-light tracking-[0.15em] uppercase text-st-text-muted/40 transition-colors duration-300 group-hover:text-st-gold-light/60">
                Details →
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Products() {
  const [expanded, setExpanded] = useState<Product | null>(null);

  return (
    <section id="products" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeader
          label="Practices"
          title="Four practices, one delivery team"
          subtitle="We go deep in four areas rather than wide across twenty. Each one is led personally by the principal and staffed with specialists as the work demands."
        />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product, i) => (
            <ProductCard
              key={product.title}
              product={product}
              index={i}
              onExpand={setExpanded}
            />
          ))}
        </div>
      </div>

      {expanded && (
        <ExpandedDetailCard
          title={expanded.title}
          description={expanded.description}
          details={expanded.details!}
          tags={expanded.tags}
          header={
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.08] text-st-gold-light">
              {ICONS[expanded.icon]}
            </div>
          }
          onClose={() => setExpanded(null)}
        />
      )}
    </section>
  );
}

function SectionHeader({
  label,
  title,
  subtitle,
}: {
  label: string;
  title: string;
  subtitle: string;
}) {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`mb-16 text-center ${isInView ? "reveal visible" : "reveal"}`}
    >
      <span className="mb-3 inline-block text-[10px] font-light tracking-[0.2em] uppercase text-st-text-muted">
        {label}
      </span>
      <h2 className="mb-4 font-display text-2xl tracking-[-0.02em] text-white sm:text-3xl md:text-5xl lg:text-6xl">
        {title}
      </h2>
      <p className="mx-auto max-w-lg text-[15px] font-light leading-[1.7] text-st-text-muted md:text-base">
        {subtitle}
      </p>
    </div>
  );
}

export { SectionHeader };
