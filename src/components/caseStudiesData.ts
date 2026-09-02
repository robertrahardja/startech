/**
 * The four production builds shown on the homepage.
 *
 * Content lives here, apart from the presentation in CaseStudies.tsx, so that
 * editing a case study — or adding a fifth — does not touch the component,
 * and restyling the component does not risk the copy.
 *
 * Every figure must be checkable. If a number cannot be walked through on a
 * call, it does not belong in `metric`.
 */
export interface CaseStudy {
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

export const CASES: CaseStudy[] = [
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
