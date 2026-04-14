import { lazy } from "react";

export const DEMO_REGISTRY: Record<string, React.LazyExoticComponent<React.ComponentType<{
  onSubmit: (input: Record<string, string>) => void;
  isLoading: boolean;
  result: Record<string, unknown> | null;
  error: string | null;
  clearResult: () => void;
}>>> = {
  "invoice-scanner": lazy(() => import("./renderers/InvoiceScannerDemo")),
  "customer-chatbot": lazy(() => import("./renderers/CustomerChatbotDemo")),
  "appointment-booking": lazy(() => import("./renderers/AppointmentBookingDemo")),
  "quotation-generator": lazy(() => import("./renderers/QuotationGeneratorDemo")),
  "job-posting-writer": lazy(() => import("./renderers/JobPostingWriterDemo")),
  "inventory-tracker": lazy(() => import("./renderers/InventoryTrackerDemo")),
  "social-media-manager": lazy(() => import("./renderers/SocialMediaManagerDemo")),
  "document-translator": lazy(() => import("./renderers/DocumentTranslatorDemo")),
  "employee-onboarding": lazy(() => import("./renderers/EmployeeOnboardingDemo")),
  "sales-assistant": lazy(() => import("./renderers/SalesAssistantDemo")),
  "compliance-checker": lazy(() => import("./renderers/ComplianceCheckerDemo")),
  "training-content-generator": lazy(() => import("./renderers/TrainingContentDemo")),
  "financial-report-builder": lazy(() => import("./renderers/FinancialReportDemo")),
};
