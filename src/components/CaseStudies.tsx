import { useInView } from "../hooks/useInView";

interface CaseStudy {
  id: string;
  sector: string;
  market: string;
  title: string;
  /** The state of the world before we arrived. */
  before: string;
  /** What was actually built. */
  built: string;
  /** The hard, checkable number or fact. */
  metric: { figure: string; caption: string };
  /** Concrete details a buyer can interrogate. */
  detail: string[];
}

const CASES: CaseStudy[] = [
  {
    id: "vehicle-export",
    sector: "Cross-border trade",
    market: "Japan",
    title: "A vehicle exporter running on spreadsheets and WhatsApp",
    before:
      "Inventory in Airtable, payments reconciled by hand in Excel, customer conversations scattered across WhatsApp. An earlier offshore vendor had delivered a CRM the team could not use, so they used it only to display cars.",
    built:
      "A full operational rebuild: inventory, role-scoped CRM, document generation for proforma and commercial invoices, shipping instructions, bank-statement import and two-level payment routing.",
    metric: { figure: "2", caption: "money-losing bugs caught before release" },
    detail: [
      "A re-imported bank statement was silently doubling receipts — most Japanese banks issue no transfer ID, so the dedupe key was never populated. Replaced with a deterministic content-derived key.",
      "The customer page was exposing company-wide revenue totals to individual sales reps. Found in testing, fixed, verified with two reps against one customer.",
      "Five roles, each scoped: admin, manager, sales rep, tax accountant, customer.",
    ],
  },
  {
    id: "erp",
    sector: "Enterprise resource planning",
    market: "Singapore & Indonesia",
    title: "A payroll engine an accountant can audit line by line",
    before:
      "Singapore payroll compliance is unforgiving: CPF's three-step rounding, age and residency bands, ordinary-wage ceilings, SDL floors and caps. Most systems approximate it and hope nobody checks.",
    built:
      "A multi-tenant ERP backend in Java 21 and Spring Boot, with a Singapore payroll compliance engine verified against CPF Board tables scenario by scenario.",
    metric: { figure: "7,060", caption: "automated tests across 484 calculators" },
    detail: [
      "48 CPF scenarios documented as a printable verification matrix — age bands, PR year-one and year-two rates, rounding edges, ceiling behaviour — for an accountant to sign off row by row.",
      "A five-engine accounting harness independently recomputes every statement: ledger, trial balance, P&L, balance sheet and cash flow must all agree.",
      "51 REST controllers. Multi-currency, multi-tenant, role-based, audit-logged.",
    ],
  },
  {
    id: "ai-copilot",
    sector: "AI implementation",
    market: "Singapore",
    title: "An AI co-pilot that answers from the company's own documents",
    before:
      "A generic chatbot is worthless to an SME knowledge worker: it knows nothing about their role, their sector, or what their organisation has already decided.",
    built:
      "A production co-pilot with four reasoning modes, layered organisational context (sector, org, role, individual), retrieval over the customer's own uploaded documents, and peer-to-peer coordination across departments.",
    metric: { figure: "Live", caption: "production API, paying client" },
    detail: [
      "Multi-LLM routing with an abstraction layer — the default model was switched between providers on the client's instruction without touching product code.",
      "Speech-to-text for meeting capture, with action items extracted into tasks.",
      "Runs on Cloudflare Workers with D1, KV, R2 and Vectorize.",
    ],
  },
  {
    id: "health",
    sector: "Healthcare",
    market: "Indonesia & SEA",
    title: "A health record the patient owns, not the hospital",
    before:
      "Patients moving between Indonesian and Singaporean providers carry their history in paper folders and photographs. Provider systems do not talk to each other, and cross-border data rules make naive integration unlawful.",
    built:
      "A trilingual patient-owned health platform operated from Singapore under Singapore-only data residency. Lifestyle tracking, insurance onboarding and an AI advisor are live; the cross-border vault and clinician portal are in build.",
    metric: { figure: "3", caption: "languages, one codebase" },
    detail: [
      "Custodian model by design: the platform holds patient-owned copies, never claims to be the provider's record system.",
      "Data residency decided at architecture time, not retrofitted after a compliance review.",
      "Insurer panel and hospital directory data curated across Singapore, Malaysia and Indonesia.",
    ],
  },
];

function CaseCard({ study, index }: { study: CaseStudy; index: number }) {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`group relative border-t border-st-border pt-8 transition-all duration-700 ${
        isInView ? "reveal visible" : "reveal"
      }`}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      {/* Sector / market line */}
      <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-medium tracking-[0.18em] uppercase text-st-text-muted">
        <span className="text-st-blue-light">{study.sector}</span>
        <span className="h-2.5 w-px bg-st-text-muted/30" />
        <span>{study.market}</span>
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
        <div>
          <h3 className="font-display text-2xl leading-[1.25] tracking-[-0.02em] text-st-text md:text-3xl">
            {study.title}
          </h3>

          <div className="mt-6 space-y-5">
            <div>
              <div className="mb-1.5 text-[10px] font-medium tracking-[0.16em] uppercase text-st-gold/80">
                Before
              </div>
              <p className="text-sm font-normal leading-[1.75] text-st-text-muted">
                {study.before}
              </p>
            </div>
            <div>
              <div className="mb-1.5 text-[10px] font-medium tracking-[0.16em] uppercase text-st-blue-light/80">
                What we built
              </div>
              <p className="text-sm font-normal leading-[1.75] text-st-text-muted">
                {study.built}
              </p>
            </div>
          </div>
        </div>

        {/* Right rail: the number, then the checkable details */}
        <div className="lg:pt-1">
          <div className="rounded-xl border border-st-border bg-st-surface p-5">
            <div className="font-display text-4xl leading-none tracking-[-0.02em] text-st-text">
              {study.metric.figure}
            </div>
            <div className="mt-2.5 text-[11px] font-medium leading-snug text-st-text-muted">
              {study.metric.caption}
            </div>
          </div>

          <ul className="mt-5 space-y-3">
            {study.detail.map((d, i) => (
              <li key={i} className="flex gap-2.5">
                <span
                  aria-hidden="true"
                  className="mt-[7px] h-1 w-1 flex-none rounded-full bg-st-text-muted/50"
                />
                <span className="text-[12.5px] font-normal leading-[1.65] text-st-text-muted/90">
                  {d}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function CaseStudies() {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section id="work" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div
          ref={ref}
          className={`mb-16 max-w-2xl transition-all duration-700 ${
            isInView ? "reveal visible" : "reveal"
          }`}
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-st-gold/60" />
            <span className="text-[10px] font-medium tracking-[0.22em] uppercase text-st-text-muted">
              Selected work
            </span>
          </div>
          <h2 className="font-display text-3xl leading-[1.2] tracking-[-0.03em] text-st-text sm:text-4xl md:text-5xl">
            Systems running in production.
          </h2>
          <p className="mt-5 text-base font-normal leading-[1.7] text-st-text-muted">
            Four builds, described the way a business owner would describe them
            &mdash; what the company was actually doing beforehand, and what went
            wrong on the way.
          </p>
        </div>

        <div className="space-y-14">
          {CASES.map((study, i) => (
            <CaseCard key={study.id} study={study} index={i} />
          ))}
        </div>

        <p className="mt-16 max-w-2xl border-t border-st-border pt-8 text-[12.5px] font-normal leading-[1.7] text-st-text-muted/80">
          Client names are withheld where the engagement is covered by
          confidentiality. Figures are drawn from the delivered systems and can
          be walked through in detail on a call.
        </p>
      </div>
    </section>
  );
}
