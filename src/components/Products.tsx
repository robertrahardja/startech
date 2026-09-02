import { useState } from "react";
import SectionCta from "./SectionCta";
import { useSnapRail, useTapGuard } from "../hooks/useSnapRail";
import { haptic } from "../lib/haptics";
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
      "KYC and AML workflows, multi-jurisdiction regulatory reporting",
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
  health: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  ),
};

function ProductCard({
  product,
  index,
  onExpand,
  railRef,
}: {
  product: Product;
  index: number;
  onExpand: (product: Product) => void;
  railRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const hasDetails = product.details && product.details.length > 0;

  // Pointer-based so a swipe across the rail does not open the card.
  const tap = useTapGuard(() => {
    haptic("select");
    onExpand(product);
  }, railRef);

  const spanClass =
    product.span === "wide"
      ? "md:col-span-2"
      : product.span === "tall"
        ? "md:row-span-2"
        : "";

  return (
    <div
      ref={ref}
      className={`product-card pressable h-full ${spanClass} ${isInView ? "reveal visible" : "reveal"}`}
      style={{ transitionDelay: `${index * 60}ms` }}
      {...(hasDetails ? tap : {})}
    >
      <div className="card group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-xl p-6 sm:p-7">
        <div className="relative z-10 flex h-full flex-col">
          <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-lg bg-st-surface text-st-text-muted transition-colors duration-300 group-hover:text-st-text">
            {ICONS[product.icon]}
          </div>
          <h3 className="mb-2 text-sm font-medium tracking-wide text-st-text md:text-base">
            {product.title}
          </h3>
          <p className="mb-5 flex-1 text-sm font-normal leading-[1.7] text-st-text-muted">
            {product.description}
          </p>
          <div className="flex flex-wrap items-center gap-1.5">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-st-surface px-2 py-0.5 text-[10px] font-medium tracking-wide text-st-text-muted"
              >
                {tag}
              </span>
            ))}
            {hasDetails && (
              <span className="ml-auto text-[10px] font-medium tracking-[0.15em] uppercase text-st-text-muted/40 transition-colors duration-300 group-hover:text-st-gold-light/60">
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
  const { railRef, active, goTo } = useSnapRail(PRODUCTS.length);

  return (
    <section id="products" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeader
          label="Practices"
          title="Four practices, one delivery team"
          subtitle="We go deep in four areas rather than wide across twenty. Each one is led personally by the principal and staffed with specialists as the work demands."
        />

        {/* One swipeable rail on phones, a grid from sm: up. The rail is
            native scroll-snap; only the dots are wired up in JS. */}
        <div
          ref={railRef}
          className="snap-rail grid-cols-1 gap-3 sm:grid sm:grid-cols-2 sm:gap-3 lg:grid-cols-3"
        >
          {PRODUCTS.map((product, i) => (
            <div key={product.title} className="snap-item" data-snap-index={i}>
              <ProductCard
                product={product}
                index={i}
                onExpand={setExpanded}
                railRef={railRef}
              />
            </div>
          ))}
        </div>

        {/* Position indicator — phones only, where the rail exists. */}
        <div className="mt-4 flex items-center justify-center sm:hidden">
          {PRODUCTS.map((product, i) => (
            <button
              key={product.title}
              onClick={() => goTo(i)}
              aria-label={`Show ${product.title}`}
              aria-current={i === active}
              className="flex h-11 w-11 items-center justify-center"
            >
              <span className="rail-dot" data-active={i === active} />
            </button>
          ))}
        </div>

        <SectionCta
          prompt="Most engagements start in one practice and grow into a second. Tell us which problem is loudest right now."
          action="Start with one"
        />
      </div>

      {expanded && (
        <ExpandedDetailCard
          title={expanded.title}
          description={expanded.description}
          details={expanded.details!}
          tags={expanded.tags}
          header={
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-st-surface text-st-gold-light">
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
      className={`mb-10 text-center sm:mb-14 ${isInView ? "reveal visible" : "reveal"}`}
    >
      <span className="mb-3 inline-block text-[10px] font-medium tracking-[0.2em] uppercase text-st-text-muted">
        {label}
      </span>
      <h2 className="mb-4 font-display text-2xl tracking-[-0.02em] text-st-text sm:text-3xl md:text-5xl lg:text-6xl">
        {title}
      </h2>
      <p className="mx-auto max-w-3xl text-balance text-[15px] font-normal leading-[1.7] text-st-text-muted md:text-base">
        {subtitle}
      </p>
    </div>
  );
}

export { SectionHeader };
