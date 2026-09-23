import { CACHED_DEMO_DATA } from "../demos/cachedDemoData";
import { SOLUTIONS } from "../solutions/solutionsData";
import type { Messages } from "../../i18n/en";

/**
 * One honest, at-a-glance number per demo, read straight out of the same
 * cached sample every DemoShell already shows — never invented copy.
 * `value`/`suffix` feed AnimatedMetric; `labelKey` looks up the caption in
 * the active locale's t.showcase.teasers catalogue, keyed by slug — the
 * caption text itself never lives here, so it is never accidentally
 * hardcoded in English.
 */
interface ShowcaseTeaser {
  value: number;
  prefix?: string;
  suffix?: string;
  labelKey: keyof Messages["showcase"]["teasers"];
}

function teaserFor(slug: string): ShowcaseTeaser {
  const d = CACHED_DEMO_DATA[slug] as Record<string, unknown>;
  switch (slug) {
    case "invoice-scanner":
      return { value: d.total as number, prefix: "SGD ", labelKey: "invoiceScanner" };
    case "customer-chatbot":
      return { value: d.confidence_percent as number, suffix: "%", labelKey: "customerChatbot" };
    case "appointment-booking":
      return { value: (d.duration_minutes as number), suffix: "-min slot", labelKey: "appointmentBooking" };
    case "quotation-generator":
      return { value: d.total as number, prefix: "SGD ", labelKey: "quotationGenerator" };
    case "job-posting-writer":
      return { value: (d.responsibilities as unknown[]).length + (d.requirements as unknown[]).length, labelKey: "jobPostingWriter" };
    case "inventory-tracker":
      return { value: (d.items as { alert_level: string }[]).filter((i) => i.alert_level !== "ok").length, labelKey: "inventoryTracker" };
    case "social-media-manager":
      return { value: (d.posts as unknown[]).length, labelKey: "socialMediaManager" };
    case "document-translator":
      return { value: 2, labelKey: "documentTranslator" };
    case "employee-onboarding":
      return { value: (d.checklist as unknown[]).length, labelKey: "employeeOnboarding" };
    case "sales-assistant":
      return { value: (d.emails as unknown[]).length, labelKey: "salesAssistant" };
    case "compliance-checker":
      return { value: (d.findings as { severity: string }[]).filter((f) => f.severity === "high").length, labelKey: "complianceChecker" };
    case "training-content-generator":
      return { value: (d.modules as unknown[]).length, labelKey: "trainingContentGenerator" };
    case "financial-report-builder":
      return { value: d.net_profit as number, prefix: "SGD ", labelKey: "financialReportBuilder" };
    default:
      return { value: 0, labelKey: "invoiceScanner" };
  }
}

export interface ShowcaseDemo {
  slug: string;
  title: string;
  tagline: string;
  icon: string;
  teaser: ShowcaseTeaser;
}

/** All 13 demos, in SOLUTIONS order, with a teaser stat attached. */
export const SHOWCASE_DEMOS: ShowcaseDemo[] = SOLUTIONS.filter(
  (s) => CACHED_DEMO_DATA[s.slug]
).map((s) => ({
  slug: s.slug,
  title: s.title,
  tagline: s.tagline,
  icon: s.icon,
  teaser: teaserFor(s.slug),
}));
