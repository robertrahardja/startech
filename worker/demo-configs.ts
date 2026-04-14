export interface DemoInputField {
  name: string;
  required: boolean;
  maxLength: number;
  label: string;
  type: "text" | "textarea" | "number" | "select";
  placeholder?: string;
  options?: string[];
}

export interface DemoConfig {
  slug: string;
  systemPrompt: string;
  maxTokens: number;
  inputFields: DemoInputField[];
  description: string;
}

const PROMPT_PREFIX = (toolName: string) =>
  `You are an AI demo for StarTech Innovation's ${toolName}. Given the user's input, generate realistic sample output.`;

const PROMPT_SUFFIX =
  "This is a demo — produce realistic but clearly sample data. Use SGD for currency. You MUST respond with valid JSON matching the schema above. Do not include any text outside the JSON. Keep all content professional and relevant to Singapore businesses.";

export const DEMO_CONFIGS: Record<string, DemoConfig> = {
  "invoice-scanner": {
    slug: "invoice-scanner",
    description: "AI-powered invoice and receipt scanner",
    maxTokens: 800,
    inputFields: [
      {
        name: "receipt_text",
        required: true,
        maxLength: 3000,
        label: "Receipt / Invoice Text",
        type: "textarea",
        placeholder: "Paste your receipt or invoice text here...",
      },
    ],
    systemPrompt: `${PROMPT_PREFIX("Invoice Scanner")}

Extract vendor, date, line items (description, qty, unit_price, amount), subtotal, GST (9%), total from the provided receipt or invoice text.

Return JSON matching this schema:
{
  "vendor": string,
  "date": string,
  "currency": string,
  "items": [{ "description": string, "quantity": number, "unit_price": number, "amount": number }],
  "subtotal": number,
  "gst": number,
  "total": number
}

${PROMPT_SUFFIX}`,
  },

  "customer-chatbot": {
    slug: "customer-chatbot",
    description: "AI customer support chatbot",
    maxTokens: 600,
    inputFields: [
      {
        name: "business_description",
        required: true,
        maxLength: 1000,
        label: "Business Description",
        type: "textarea",
        placeholder: "Describe your business...",
      },
      {
        name: "question",
        required: true,
        maxLength: 500,
        label: "Customer Question",
        type: "textarea",
        placeholder: "Sample customer question...",
      },
    ],
    systemPrompt: `${PROMPT_PREFIX("Customer Chatbot")}

Act as a customer support chatbot for the described business. Answer the question professionally.

Return JSON matching this schema:
{
  "question": string,
  "answer": string,
  "confidence_percent": number,
  "suggested_followups": string[]
}

${PROMPT_SUFFIX}`,
  },

  "appointment-booking": {
    slug: "appointment-booking",
    description: "AI appointment booking assistant",
    maxTokens: 600,
    inputFields: [
      {
        name: "business_type",
        required: true,
        maxLength: 200,
        label: "Business Type",
        type: "text",
        placeholder: "e.g. Dental clinic, Hair salon...",
      },
      {
        name: "service",
        required: true,
        maxLength: 200,
        label: "Service",
        type: "text",
        placeholder: "e.g. Teeth cleaning, Haircut...",
      },
      {
        name: "preferred_date",
        required: true,
        maxLength: 50,
        label: "Preferred Date",
        type: "text",
        placeholder: "e.g. Next Monday, 15 Jan 2026...",
      },
      {
        name: "preferred_time",
        required: true,
        maxLength: 50,
        label: "Preferred Time",
        type: "text",
        placeholder: "e.g. Morning, 2pm, After work...",
      },
    ],
    systemPrompt: `${PROMPT_PREFIX("Appointment Booking")}

As a booking AI, confirm an appointment. Generate a realistic confirmed slot, duration, reminder message, and confirmation text.

Return JSON matching this schema:
{
  "service": string,
  "confirmed_date": string,
  "confirmed_time": string,
  "duration_minutes": number,
  "reminder_message": string,
  "confirmation_text": string
}

${PROMPT_SUFFIX}`,
  },

  "quotation-generator": {
    slug: "quotation-generator",
    description: "AI quotation and proposal generator",
    maxTokens: 1000,
    inputFields: [
      {
        name: "client_name",
        required: true,
        maxLength: 200,
        label: "Client Name",
        type: "text",
        placeholder: "Client or company name",
      },
      {
        name: "service_description",
        required: true,
        maxLength: 1000,
        label: "Service Description",
        type: "textarea",
        placeholder: "What services or products to quote...",
      },
      {
        name: "quantity",
        required: true,
        maxLength: 50,
        label: "Quantity",
        type: "text",
        placeholder: "Quantity or scope",
      },
      {
        name: "notes",
        required: false,
        maxLength: 500,
        label: "Notes",
        type: "textarea",
        placeholder: "Special requirements or terms...",
      },
    ],
    systemPrompt: `${PROMPT_PREFIX("Quotation Generator")}

Generate a professional business quotation for a Singapore SME. Include quote number, line items with realistic pricing in SGD, subtotal, GST 9%, total, terms (Net 30), validity (30 days).

Return JSON matching this schema:
{
  "quote_number": string,
  "date": string,
  "client": string,
  "items": [{ "description": string, "quantity": number, "unit_price": number, "amount": number }],
  "subtotal": number,
  "gst": number,
  "total": number,
  "terms": string,
  "validity_days": number
}

${PROMPT_SUFFIX}`,
  },

  "job-posting-writer": {
    slug: "job-posting-writer",
    description: "AI job posting writer",
    maxTokens: 1200,
    inputFields: [
      {
        name: "job_title",
        required: true,
        maxLength: 200,
        label: "Job Title",
        type: "text",
        placeholder: "e.g. Senior Software Engineer",
      },
      {
        name: "company_name",
        required: true,
        maxLength: 200,
        label: "Company Name",
        type: "text",
        placeholder: "Your company name",
      },
      {
        name: "requirements",
        required: true,
        maxLength: 1000,
        label: "Requirements",
        type: "textarea",
        placeholder: "Key skills and experience needed...",
      },
      {
        name: "location",
        required: true,
        maxLength: 200,
        label: "Location",
        type: "text",
        placeholder: "e.g. Singapore, Remote...",
      },
    ],
    systemPrompt: `${PROMPT_PREFIX("Job Posting Writer")}

Generate an optimized job posting for Singapore market. Include engaging summary, responsibilities, requirements, benefits, and salary range in SGD.

Return JSON matching this schema:
{
  "title": string,
  "company": string,
  "location": string,
  "employment_type": string,
  "summary": string,
  "responsibilities": string[],
  "requirements": string[],
  "nice_to_have": string[],
  "benefits": string[],
  "salary_range": string
}

${PROMPT_SUFFIX}`,
  },

  "inventory-tracker": {
    slug: "inventory-tracker",
    description: "AI inventory tracking and restock predictor",
    maxTokens: 1000,
    inputFields: [
      {
        name: "items_text",
        required: true,
        maxLength: 2000,
        label: "Inventory Items",
        type: "textarea",
        placeholder:
          "List items with current stock and daily usage, e.g.:\nA4 Paper - 50 reams - 3/day\nPrinter Ink - 8 cartridges - 1/week",
      },
    ],
    systemPrompt: `${PROMPT_PREFIX("Inventory Tracker")}

Analyze inventory items, predict restock dates, calculate days until empty, assign alert levels (critical/warning/ok).

Return JSON matching this schema:
{
  "analysis_date": string,
  "items": [{
    "name": string,
    "current_stock": number,
    "daily_usage": number,
    "days_until_empty": number,
    "restock_date": string,
    "alert_level": "critical" | "warning" | "ok",
    "recommended_order_qty": number
  }],
  "summary": string
}

${PROMPT_SUFFIX}`,
  },

  "social-media-manager": {
    slug: "social-media-manager",
    description: "AI social media content generator",
    maxTokens: 1200,
    inputFields: [
      {
        name: "topic",
        required: true,
        maxLength: 1000,
        label: "Topic",
        type: "textarea",
        placeholder:
          "Describe your product, service, or topic to promote...",
      },
    ],
    systemPrompt: `${PROMPT_PREFIX("Social Media Manager")}

Generate social media posts for 4 platforms (LinkedIn, Instagram, Facebook, X/Twitter). Each post should be platform-appropriate with hashtags and optimal character count.

Return JSON matching this schema:
{
  "topic_summary": string,
  "posts": [{
    "platform": string,
    "content": string,
    "hashtags": string[],
    "character_count": number,
    "best_posting_time": string
  }]
}

${PROMPT_SUFFIX}`,
  },

  "document-translator": {
    slug: "document-translator",
    description: "AI document translator",
    maxTokens: 1200,
    inputFields: [
      {
        name: "source_text",
        required: true,
        maxLength: 2000,
        label: "Source Text",
        type: "textarea",
        placeholder: "Paste the text to translate...",
      },
      {
        name: "target_language",
        required: true,
        maxLength: 50,
        label: "Target Language",
        type: "select",
        options: [
          "Chinese (Simplified)",
          "Chinese (Traditional)",
          "Malay",
          "Indonesian",
          "Tamil",
          "Japanese",
          "Korean",
        ],
      },
    ],
    systemPrompt: `${PROMPT_PREFIX("Document Translator")}

Translate the text professionally, preserving formatting and business terminology.

Return JSON matching this schema:
{
  "source_language": string,
  "target_language": string,
  "original_text": string,
  "translated_text": string,
  "notes": string[]
}

${PROMPT_SUFFIX}`,
  },

  "employee-onboarding": {
    slug: "employee-onboarding",
    description: "AI employee onboarding document generator",
    maxTokens: 1500,
    inputFields: [
      {
        name: "employee_name",
        required: true,
        maxLength: 200,
        label: "Employee Name",
        type: "text",
        placeholder: "Full name",
      },
      {
        name: "job_title",
        required: true,
        maxLength: 200,
        label: "Job Title",
        type: "text",
        placeholder: "Job title",
      },
      {
        name: "department",
        required: true,
        maxLength: 200,
        label: "Department",
        type: "text",
        placeholder: "Department",
      },
      {
        name: "start_date",
        required: true,
        maxLength: 50,
        label: "Start Date",
        type: "text",
        placeholder: "Start date",
      },
      {
        name: "salary",
        required: true,
        maxLength: 50,
        label: "Monthly Salary",
        type: "text",
        placeholder: "Monthly salary in SGD",
      },
    ],
    systemPrompt: `${PROMPT_PREFIX("Employee Onboarding")}

Generate Singapore-compliant onboarding documents: offer letter preview (include CPF, probation period, notice period), NDA preview, and first-week onboarding checklist.

Return JSON matching this schema:
{
  "offer_letter_preview": string,
  "nda_preview": string,
  "checklist": [{
    "task": string,
    "owner": string,
    "due_by": string,
    "category": string
  }]
}

${PROMPT_SUFFIX}`,
  },

  "sales-assistant": {
    slug: "sales-assistant",
    description: "AI B2B sales follow-up assistant",
    maxTokens: 1500,
    inputFields: [
      {
        name: "lead_name",
        required: true,
        maxLength: 200,
        label: "Lead Name",
        type: "text",
        placeholder: "Contact name",
      },
      {
        name: "company",
        required: true,
        maxLength: 200,
        label: "Company",
        type: "text",
        placeholder: "Company name",
      },
      {
        name: "product_interest",
        required: true,
        maxLength: 500,
        label: "Product Interest",
        type: "textarea",
        placeholder: "What they're interested in...",
      },
      {
        name: "context",
        required: false,
        maxLength: 500,
        label: "Context",
        type: "textarea",
        placeholder:
          "Any context — how you met, their pain points...",
      },
    ],
    systemPrompt: `${PROMPT_PREFIX("Sales Assistant")}

Generate a 3-email follow-up sequence for B2B sales in Singapore. Emails should progress from intro to value prop to soft close.

Return JSON matching this schema:
{
  "lead_summary": string,
  "emails": [{
    "subject": string,
    "body": string,
    "send_day": number,
    "purpose": string
  }]
}

${PROMPT_SUFFIX}`,
  },

  "compliance-checker": {
    slug: "compliance-checker",
    description: "AI compliance and contract checker",
    maxTokens: 1500,
    inputFields: [
      {
        name: "contract_text",
        required: true,
        maxLength: 3000,
        label: "Contract / Policy Text",
        type: "textarea",
        placeholder:
          "Paste your contract, policy, or agreement text...",
      },
    ],
    systemPrompt: `${PROMPT_PREFIX("Compliance Checker")}

Analyze the text for compliance issues under Singapore law (Employment Act, PDPA, Companies Act, etc.). Flag issues with severity.

Return JSON matching this schema:
{
  "document_type": string,
  "findings": [{
    "clause_excerpt": string,
    "issue": string,
    "severity": string,
    "regulation": string,
    "suggestion": string
  }],
  "risk_score": number,
  "summary": string
}

${PROMPT_SUFFIX}`,
  },

  "training-content-generator": {
    slug: "training-content-generator",
    description: "AI training content and course generator",
    maxTokens: 1500,
    inputFields: [
      {
        name: "sop_text",
        required: true,
        maxLength: 3000,
        label: "SOP / Process Document",
        type: "textarea",
        placeholder:
          "Paste your SOP, procedure, or process document...",
      },
    ],
    systemPrompt: `${PROMPT_PREFIX("Training Content Generator")}

Transform the SOP into a structured training course. Generate modules with learning objectives, content summary, and quiz questions. Make it SkillsFuture-ready.

Return JSON matching this schema:
{
  "course_title": string,
  "total_duration_hours": number,
  "modules": [{
    "title": string,
    "duration_minutes": number,
    "objectives": string[],
    "content_summary": string,
    "quiz": [{
      "question": string,
      "options": string[],
      "correct_answer_index": number
    }]
  }]
}

${PROMPT_SUFFIX}`,
  },

  "financial-report-builder": {
    slug: "financial-report-builder",
    description: "AI financial report and analysis builder",
    maxTokens: 1200,
    inputFields: [
      {
        name: "period",
        required: true,
        maxLength: 100,
        label: "Period",
        type: "text",
        placeholder: "e.g. Q1 2026, January 2026...",
      },
      {
        name: "revenue",
        required: true,
        maxLength: 50,
        label: "Revenue",
        type: "text",
        placeholder: "Total revenue in SGD",
      },
      {
        name: "expenses",
        required: true,
        maxLength: 50,
        label: "Expenses",
        type: "text",
        placeholder: "Total expenses in SGD",
      },
      {
        name: "breakdown",
        required: false,
        maxLength: 1000,
        label: "Breakdown",
        type: "textarea",
        placeholder: "Revenue/expense breakdown if available...",
      },
    ],
    systemPrompt: `${PROMPT_PREFIX("Financial Report Builder")}

Generate a financial analysis report for a Singapore SME. Include P&L summary, margin analysis, trends, and actionable recommendations.

Return JSON matching this schema:
{
  "period": string,
  "revenue": number,
  "expenses": number,
  "net_profit": number,
  "gross_margin_pct": number,
  "net_margin_pct": number,
  "analysis": string,
  "key_metrics": [{
    "metric": string,
    "value": string,
    "assessment": string
  }],
  "trends": string[],
  "recommendations": string[]
}

${PROMPT_SUFFIX}`,
  },
};
