export type SolutionTier = "quick-win" | "medium" | "premium";

export interface SolutionStep {
  title: string;
  description: string;
}

export interface Solution {
  slug: string;
  title: string;
  tagline: string;
  tier: SolutionTier;
  problem: string;
  steps: SolutionStep[];
  features: string[];
  priceFrom: number;
  pricePsg: number;
  icon: string;
}

export const TIER_META: Record<
  SolutionTier,
  { label: string; color: string; badgeClass: string }
> = {
  "quick-win": {
    label: "Quick Win",
    color: "blue",
    badgeClass:
      "bg-st-blue/10 text-st-blue-light border border-st-blue/20",
  },
  medium: {
    label: "Medium Build",
    color: "purple",
    badgeClass:
      "bg-purple-500/10 text-purple-300 border border-purple-500/20",
  },
  premium: {
    label: "Premium Solution",
    color: "gold",
    badgeClass:
      "bg-st-gold/10 text-st-gold-light border border-st-gold/20",
  },
};

export const SOLUTIONS: Solution[] = [
  // ── Quick Wins ──────────────────────────────────────────────────────────
  {
    slug: "invoice-scanner",
    title: "AI Receipt & Invoice Scanner",
    tagline:
      "Snap a photo, extract every line item, and export to your spreadsheet in seconds.",
    tier: "quick-win",
    problem:
      "SMEs lose hours every week manually keying in receipts and invoices. Data entry errors lead to accounting headaches, delayed reimbursements, and wasted staff time that could be spent growing the business.",
    steps: [
      {
        title: "Snap or Upload",
        description:
          "Take a photo of any receipt or invoice, or upload a PDF from your email.",
      },
      {
        title: "AI Extracts Data",
        description:
          "Our AI reads every field: vendor, date, line items, tax, and totals with 99%+ accuracy.",
      },
      {
        title: "Review & Confirm",
        description:
          "Quickly verify the extracted data in a clean dashboard. Edit anything that needs tweaking.",
      },
      {
        title: "Export Anywhere",
        description:
          "One-click export to Excel, Google Sheets, Xero, or QuickBooks. Done.",
      },
    ],
    features: [
      "Handles receipts, invoices, and delivery orders in any format",
      "Supports English, Chinese, and Malay text on the same document",
      "Automatic GST extraction and categorisation",
      "Batch upload: process dozens of documents at once",
      "Integrates with Xero, QuickBooks, and Google Sheets",
    ],
    priceFrom: 49,
    pricePsg: 25,
    icon: "scan",
  },
  {
    slug: "customer-chatbot",
    title: "AI Customer Support Chatbot",
    tagline:
      "A 24/7 AI agent trained on your FAQ that answers customers instantly on your website.",
    tier: "quick-win",
    problem:
      "Small teams can't staff support around the clock. Customers leave when they can't get answers fast enough, and repetitive queries eat into time that should go toward complex issues.",
    steps: [
      {
        title: "Train on Your Content",
        description:
          "Upload your FAQ, product docs, or website. The AI learns your business in minutes.",
      },
      {
        title: "Embed on Your Site",
        description:
          "Drop a single script tag into your website. Works with any platform.",
      },
      {
        title: "Customers Chat Instantly",
        description:
          "Visitors get accurate, on-brand answers 24/7 without waiting for a human.",
      },
      {
        title: "Escalate When Needed",
        description:
          "Complex queries are routed to your team with full context and chat history.",
      },
    ],
    features: [
      "Trained on your actual business data, not generic answers",
      "Supports English, Chinese, Malay, and Bahasa Indonesia",
      "Seamless handoff to human agents with full chat context",
      "Analytics dashboard showing top questions and resolution rates",
      "Custom branding to match your website design",
      "No-code setup: live in under 30 minutes",
    ],
    priceFrom: 79,
    pricePsg: 40,
    icon: "chat",
  },
  {
    slug: "appointment-booking",
    title: "AI Appointment Booking",
    tagline:
      "Let AI handle scheduling via WhatsApp and web, so you never miss a booking.",
    tier: "quick-win",
    problem:
      "Playing phone tag and juggling calendars wastes hours every week. Double bookings frustrate customers, and after-hours enquiries go unanswered, meaning lost revenue.",
    steps: [
      {
        title: "Connect Your Calendar",
        description:
          "Sync with Google Calendar, Outlook, or any CalDAV calendar in one click.",
      },
      {
        title: "Set Your Rules",
        description:
          "Define available hours, buffer times, service durations, and team members.",
      },
      {
        title: "Customers Book Naturally",
        description:
          "Clients message on WhatsApp or your website and the AI schedules them instantly.",
      },
      {
        title: "Automatic Reminders",
        description:
          "Reduce no-shows with automated WhatsApp and email reminders.",
      },
    ],
    features: [
      "WhatsApp and web booking in natural language",
      "Automatic conflict detection and rescheduling",
      "Customisable booking rules per service type",
      "Automated reminders reduce no-shows by up to 40%",
      "Multi-staff calendar management",
    ],
    priceFrom: 59,
    pricePsg: 30,
    icon: "calendar",
  },
  {
    slug: "quotation-generator",
    title: "AI Quotation Generator",
    tagline:
      "Input the specs, get a professional quote PDF in minutes, not hours.",
    tier: "quick-win",
    problem:
      "Creating quotes manually is slow and error-prone. Inconsistent formatting looks unprofessional, and delays in quoting mean lost deals to faster competitors.",
    steps: [
      {
        title: "Enter Requirements",
        description:
          "Fill in client details, line items, quantities, and any special terms.",
      },
      {
        title: "AI Formats & Calculates",
        description:
          "The system applies your pricing rules, discounts, GST, and generates a polished layout.",
      },
      {
        title: "Review & Customise",
        description:
          "Tweak wording, add terms and conditions, or adjust formatting before sending.",
      },
      {
        title: "Send as PDF",
        description:
          "One-click to generate a branded PDF and email it directly to your client.",
      },
    ],
    features: [
      "Professional branded PDF output with your logo and colours",
      "Automatic GST calculation and discount rules",
      "Template library for different service types",
      "Quote tracking: know when clients open your quote",
      "Convert accepted quotes to invoices in one click",
    ],
    priceFrom: 49,
    pricePsg: 25,
    icon: "document",
  },
  {
    slug: "job-posting-writer",
    title: "AI Job Posting Writer",
    tagline:
      "Input the role details, get an optimised job listing that attracts top talent.",
    tier: "quick-win",
    problem:
      "Writing compelling job postings takes time most SMEs don't have. Generic listings attract the wrong candidates, and poor job descriptions lead to low application quality and wasted interview time.",
    steps: [
      {
        title: "Describe the Role",
        description:
          "Enter job title, key responsibilities, requirements, and company culture notes.",
      },
      {
        title: "AI Crafts the Listing",
        description:
          "Our AI writes an engaging, SEO-optimised posting with the right keywords for your market.",
      },
      {
        title: "Review & Refine",
        description:
          "Edit tone, add specifics, or let the AI suggest improvements based on best practices.",
      },
      {
        title: "Publish Everywhere",
        description:
          "Export to JobStreet, LinkedIn, MyCareersFuture, or any job board.",
      },
    ],
    features: [
      "Optimised for Singapore job boards and search algorithms",
      "Inclusive language checker built in",
      "Salary benchmarking against current market rates",
      "Multiple tone options: corporate, startup, casual",
      "Bulk generation for hiring drives",
    ],
    priceFrom: 29,
    pricePsg: 15,
    icon: "pen",
  },

  // ── Medium Builds ───────────────────────────────────────────────────────
  {
    slug: "inventory-tracker",
    title: "AI Inventory Tracker",
    tagline:
      "Scan items, predict restock needs, and get alerts before you run out.",
    tier: "medium",
    problem:
      "Manual stock counting is unreliable and time-consuming. Running out of popular items means lost sales, while overstocking ties up cash. Most SMEs lack the tools for accurate demand forecasting.",
    steps: [
      {
        title: "Scan & Catalogue",
        description:
          "Barcode or photo scanning to add items. Bulk import from spreadsheets.",
      },
      {
        title: "Track in Real Time",
        description:
          "Every sale, delivery, and adjustment updates inventory automatically.",
      },
      {
        title: "AI Predicts Demand",
        description:
          "Machine learning analyses sales patterns to forecast when you'll need to reorder.",
      },
      {
        title: "Smart Alerts",
        description:
          "Get notified via WhatsApp or email before stock runs low.",
      },
    ],
    features: [
      "Barcode and QR code scanning via mobile",
      "AI demand forecasting based on historical sales data",
      "Low stock alerts via WhatsApp, email, or SMS",
      "Multi-location inventory tracking",
      "Integrates with POS systems and e-commerce platforms",
      "Expiry date tracking for perishable goods",
    ],
    priceFrom: 199,
    pricePsg: 100,
    icon: "box",
  },
  {
    slug: "social-media-manager",
    title: "AI Social Media Manager",
    tagline:
      "Auto-generate posts, schedule across platforms, and respond to comments with AI.",
    tier: "medium",
    problem:
      "Consistent social media presence is crucial but exhausting for small teams. Creating content daily, posting at optimal times, and responding to every comment requires a dedicated hire most SMEs can't afford.",
    steps: [
      {
        title: "Connect Your Accounts",
        description:
          "Link Instagram, Facebook, LinkedIn, TikTok, and more in one dashboard.",
      },
      {
        title: "AI Generates Content",
        description:
          "Describe your topic or product. The AI creates posts, captions, and hashtags.",
      },
      {
        title: "Schedule & Publish",
        description:
          "Review the content calendar and let AI post at peak engagement times.",
      },
      {
        title: "AI Handles Replies",
        description:
          "Routine comments and DMs are answered automatically. Flag complex ones for you.",
      },
    ],
    features: [
      "AI content generation with your brand voice",
      "Optimal posting time recommendations per platform",
      "Automated comment and DM responses",
      "Content calendar with drag-and-drop scheduling",
      "Performance analytics and engagement tracking",
      "Hashtag research and trending topic suggestions",
    ],
    priceFrom: 249,
    pricePsg: 125,
    icon: "share",
  },
  {
    slug: "document-translator",
    title: "AI Document Translator",
    tagline:
      "Translate documents between English, Chinese, Malay, and Indonesian with formatting preserved.",
    tier: "medium",
    problem:
      "Singapore businesses operate across languages daily. Manual translation is expensive and slow. Free online tools butcher formatting and miss industry-specific terminology, leading to embarrassing errors.",
    steps: [
      {
        title: "Upload Your Document",
        description:
          "Drop in PDFs, Word docs, or spreadsheets in any supported language.",
      },
      {
        title: "Select Languages",
        description:
          "Choose source and target languages. Support for English, Chinese (Simplified & Traditional), Malay, and Indonesian.",
      },
      {
        title: "AI Translates",
        description:
          "Context-aware translation preserves meaning, tone, and industry terminology.",
      },
      {
        title: "Download Formatted",
        description:
          "Get your translated document with original formatting, tables, and layout intact.",
      },
    ],
    features: [
      "Preserves document formatting, tables, and images",
      "Industry-specific terminology for legal, finance, and tech",
      "Supports English, Chinese, Malay, and Bahasa Indonesia",
      "Translation memory for consistent terminology across documents",
      "Batch translation for large document sets",
    ],
    priceFrom: 199,
    pricePsg: 100,
    icon: "globe",
  },
  {
    slug: "employee-onboarding",
    title: "AI Employee Onboarding",
    tagline:
      "New hires fill in their details once, and AI generates all the HR documents automatically.",
    tier: "medium",
    problem:
      "Onboarding a new employee means collecting the same information across a dozen forms. HR spends hours on paperwork instead of making new hires feel welcome. Mistakes in employment contracts create compliance risk.",
    steps: [
      {
        title: "New Hire Fills One Form",
        description:
          "A single smart form collects all personal, banking, and tax details.",
      },
      {
        title: "AI Generates Documents",
        description:
          "Employment contract, NDA, IT access requests, and welcome pack are created automatically.",
      },
      {
        title: "E-Signatures",
        description:
          "All parties sign digitally. No printing, scanning, or chasing.",
      },
      {
        title: "Onboarding Checklist",
        description:
          "Automated task list for IT setup, buddy assignment, and training schedule.",
      },
    ],
    features: [
      "Singapore Employment Act compliant contract templates",
      "Automatic CPF, IR8A, and tax form preparation",
      "Digital e-signature workflow",
      "Customisable onboarding checklists per department",
      "Employee self-service portal for document access",
      "Integration with payroll systems",
    ],
    priceFrom: 299,
    pricePsg: 150,
    icon: "users",
  },
  {
    slug: "sales-assistant",
    title: "AI Sales Assistant",
    tagline:
      "A CRM that automatically follows up with leads via email and WhatsApp.",
    tier: "medium",
    problem:
      "Sales teams lose deals because follow-ups fall through the cracks. Manually tracking every lead across email, WhatsApp, and calls is impossible at scale, and most CRMs are too complex for SMEs.",
    steps: [
      {
        title: "Import Your Leads",
        description:
          "Connect your email, import from spreadsheets, or capture from web forms.",
      },
      {
        title: "AI Scores & Prioritises",
        description:
          "Machine learning ranks leads by likelihood to convert, so you focus on the best opportunities.",
      },
      {
        title: "Automated Follow-ups",
        description:
          "AI sends personalised emails and WhatsApp messages on your behalf at optimal times.",
      },
      {
        title: "Close & Track",
        description:
          "Visual pipeline shows every deal's status. AI suggests next best actions.",
      },
    ],
    features: [
      "AI lead scoring based on engagement and behaviour",
      "Automated email and WhatsApp follow-up sequences",
      "Visual deal pipeline with drag-and-drop",
      "Smart reminders: AI tells you who to call and when",
      "Email tracking: opens, clicks, and reply detection",
      "Meeting scheduler built in",
    ],
    priceFrom: 249,
    pricePsg: 125,
    icon: "handshake",
  },

  // ── Premium Solutions ───────────────────────────────────────────────────
  {
    slug: "compliance-checker",
    title: "AI Compliance Checker",
    tagline:
      "Upload a contract or policy, and AI flags issues against Singapore regulations instantly.",
    tier: "premium",
    problem:
      "Singapore's regulatory landscape is complex and constantly evolving. SMEs can't afford full-time legal counsel, and missing a compliance requirement can mean fines, penalties, or losing business licences.",
    steps: [
      {
        title: "Upload Your Document",
        description:
          "Drop in contracts, policies, or terms of service in PDF or Word format.",
      },
      {
        title: "Select Regulation Set",
        description:
          "Choose from Employment Act, PDPA, Companies Act, or industry-specific regulations.",
      },
      {
        title: "AI Analyses & Flags",
        description:
          "The AI cross-references every clause against the selected regulations and highlights risks.",
      },
      {
        title: "Get Actionable Report",
        description:
          "Receive a detailed report with risk levels, specific clause references, and suggested fixes.",
      },
    ],
    features: [
      "Covers Employment Act, PDPA, Companies Act, and GST regulations",
      "Risk-rated findings: critical, high, medium, low",
      "Specific clause-by-clause analysis with regulation references",
      "Suggested remediation language for each finding",
      "Audit trail for compliance documentation",
      "Regular updates as regulations change",
    ],
    priceFrom: 499,
    pricePsg: 250,
    icon: "shield",
  },
  {
    slug: "training-content-generator",
    title: "AI Training Content Generator",
    tagline:
      "Turn your SOPs into SkillsFuture-ready training courses with AI-generated content.",
    tier: "premium",
    problem:
      "Creating training materials is tedious and expensive. Most SMEs have SOPs but lack the resources to convert them into structured courses. Missing out on SkillsFuture funding means paying full training costs.",
    steps: [
      {
        title: "Upload Your SOPs",
        description:
          "Drop in existing SOPs, manuals, or process documents in any format.",
      },
      {
        title: "AI Structures the Course",
        description:
          "Content is organised into modules, lessons, and assessments aligned with competency frameworks.",
      },
      {
        title: "Generate Materials",
        description:
          "AI creates slides, quizzes, video scripts, and learner guides automatically.",
      },
      {
        title: "Publish & Track",
        description:
          "Deploy on your LMS or our hosted platform. Track completions for SkillsFuture reporting.",
      },
    ],
    features: [
      "Aligned with Singapore Workforce Skills Qualifications (WSQ) framework",
      "Auto-generates quizzes, assessments, and certification criteria",
      "Multi-format output: slides, video scripts, PDFs, and SCORM packages",
      "Learner progress tracking and completion certificates",
      "SkillsFuture Enterprise Credit eligible course formatting",
      "Supports bilingual content delivery",
    ],
    priceFrom: 699,
    pricePsg: 350,
    icon: "graduation",
  },
  {
    slug: "financial-report-builder",
    title: "AI Financial Report Builder",
    tagline:
      "Pull data from your spreadsheets and generate professional financial reports automatically.",
    tier: "premium",
    problem:
      "Monthly financial reporting takes days of manual work: pulling data from multiple spreadsheets, formatting tables, writing commentary, and checking numbers. Errors in reports erode stakeholder trust.",
    steps: [
      {
        title: "Connect Data Sources",
        description:
          "Link Google Sheets, Excel files, Xero, QuickBooks, or bank feeds.",
      },
      {
        title: "Choose Report Type",
        description:
          "Select from P&L, balance sheet, cash flow, management report, or custom templates.",
      },
      {
        title: "AI Analyses & Writes",
        description:
          "The AI calculates ratios, identifies trends, and writes executive commentary.",
      },
      {
        title: "Review & Present",
        description:
          "Get a boardroom-ready PDF with charts, tables, and narrative insights.",
      },
    ],
    features: [
      "Connects to Xero, QuickBooks, Google Sheets, and Excel",
      "Auto-generates P&L, balance sheet, and cash flow statements",
      "AI-written executive summary with trend analysis",
      "Variance analysis against budget and prior periods",
      "Professional charts and visualisations",
      "Scheduled reports: auto-generate monthly or quarterly",
    ],
    priceFrom: 499,
    pricePsg: 250,
    icon: "barchart",
  },
];

export function getSolutionBySlug(slug: string): Solution | undefined {
  return SOLUTIONS.find((s) => s.slug === slug);
}

export function getSolutionsByTier(tier: SolutionTier): Solution[] {
  return SOLUTIONS.filter((s) => s.tier === tier);
}
