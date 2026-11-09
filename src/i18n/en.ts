/**
 * English — the source of truth.
 *
 * Every other locale mirrors this shape exactly, so `Messages` below is the
 * contract: a missing key in another language is a TypeScript error rather
 * than a blank on the page.
 *
 * Keys are named for where the string appears, not for what it says, so
 * rewording the copy never means renaming a key.
 */
export const en = {
  nav: {
    work: "Work",
    practices: "Practices",
    solutions: "Solutions",
    industries: "Industries",
    approach: "How we work",
    contact: "Contact",
    letsTalk: "Let's talk",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
    ask: "Ask us",
  },

  hero: {
    eyebrowShort: "Singapore · Working worldwide",
    eyebrowFull: "Singapore · Since 2021 · Working worldwide",
    headlineLead: "We speak",
    headlineBusiness: "business",
    headlineAnd: "and",
    headlineTech: "tech",
    sub: "We build the custom software that secures your competitive advantage.",
    ctaPrimary: "Let's talk",
    ctaWork: "See the work",
    ctaDeck: "Download the deck",
    ctaAsk: "Ask a question",
    languagesAvailable: "Also reading in:",
    readInLanguage: "Read this page in {language}",
    note: "Free, and no brief document required — bring the process that costs you the most time. If software isn't the answer, we'll say so.",
    proof: {
      yearsFigure: "20+",
      yearsLabel: "years, both sides",
      testsFigure: "7,060",
      testsLabel: "tests in our internal ERP build, not deployed",
      jurisdictionsFigure: "2",
      jurisdictionsLabel: "jurisdictions",
      languagesFigure: "7",
      languagesLabel: "languages on this site",
    },
    card: {
      role: "Managing Director",
      tagline: "Business. Finance. Tech.",
      country: "Singapore",
      uen: "UEN 202110461R",
      workingIn: "Working in",
    },
  },

  qualify: {
    eyebrow: "What we take on",
    title: "Where we do our best work.",
    sub: "Most of our work starts in one of these. If yours looks different, it is still worth a call — the shape of the problem matters more than the industry it sits in.",
    fits: [
      {
        headline: "Your operation runs on spreadsheets and messages",
        body: "Inventory in one place, payments in another, decisions in a chat thread. It worked at ten people and it is now the thing holding you back.",
      },
      {
        headline: "A vendor already tried and it did not work",
        body: "You paid for a system your team will not use. You are wary of starting again, and you want to know what will be different this time.",
      },
      {
        headline: "You operate across borders",
        body: "A Japanese exporter shipping worldwide. A European or American company with an Asian entity. A Singapore business hiring in Indonesia. Different currencies, tax regimes and filing calendars in one system — and no single supplier who understands both ends without being taught.",
      },
      {
        headline: "The numbers have to be right, not roughly right",
        body: "Invoices, payments, stock — the places where close enough is not good enough, and being wrong costs more than being late.",
      },
    ],
    // One sentence each, for Singapore firms with operations next door.
    regions: [
      "Running operations in Johor or the JS-SEZ? We build systems that work across a border, like the export system live with our client in Japan.",
      "From Singapore we can work with teams in any country, by email and video call.",
    ],
    // Points Japanese-affiliated firms in Singapore to the Japanese-first
    // site. Only en and ja set it; null hides the line in other locales.
    japanSite:
      "Working for a Japanese-affiliated company? The full showcases in Japanese are on our Japan site:" as
        | string
        | null,
    pricing:
      "On price: you will get a range on the first call and a firm number after discovery, not a figure invented from an email. And if an off-the-shelf tool already does the job, we will tell you which one — that is a cheaper answer than anything we could build you.",
    pricingLead: "On price:",
  },

  // Two client systems and one internal build, nothing more. Re-check these
  // against docs/COMPANY.md ("Claims to keep honest") whenever an engagement
  // starts or ends.
  work: {
    eyebrow: "Selected work",
    title: "Two client systems, and one internal build.",
    sub: "Described the way a business owner would describe them: what the company was actually doing beforehand, and what went wrong on the way. The third is our own build, tested but not deployed.",
    before: "Before",
    built: "What we built",
    result: "Result",
    details: "Details",
    demosLine:
      "Want to see something run rather than read about it? {count} working demos run in your browser on sample data.",
    demosLink: "Try the working demos",
    disclaimer:
      "Client names are withheld where the engagement is covered by confidentiality. Figures are drawn from the systems themselves and can be walked through in detail on a call.",
    cases: [
  {
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
    sector: "AI implementation",
    market: "Singapore",
    title: "An AI co-pilot that answers from the company's own documents",
    before:
      "A generic chatbot is worthless to an SME knowledge worker: it knows nothing about their role, their sector, or what their organisation has already decided.",
    built:
      "A co-pilot with four reasoning modes, layered organisational context (sector, org, role, individual), retrieval over the customer's own uploaded documents, and peer-to-peer coordination across departments.",
    metric: { figure: "2026", caption: "delivered to the client; the engagement completed that year" },
    detail: [
      "Multi-LLM routing with an abstraction layer — the default model was switched between providers on the client's instruction without touching product code.",
      "Speech-to-text for meeting capture, with action items extracted into tasks.",
      "Built on Cloudflare Workers with D1, KV, R2 and Vectorize.",
    ],
  },
  {
    sector: "Internal build",
    market: "Tested, not deployed",
    title: "An ERP we build in-house, to show how we test",
    before:
      "Software that calculates money is easy to demo and hard to trust: most of it is checked by spot tests, if at all. We wanted a large build of our own that proves how we test, before any client relies on our code.",
    built:
      "A multi-tenant ERP backend in Java 21 and Spring Boot. It is an internal build: tested, but not deployed for any client.",
    metric: { figure: "7,060", caption: "automated tests across 484 calculation classes" },
    detail: [
      "The test figures are from the August 2026 run and cover all 484 calculation classes in the build.",
      "115 REST controllers. Multi-currency, multi-tenant, role-based, audit-logged.",
      "Shown as evidence of how we build and test complex systems. It is not a deployed client system, and we make no accuracy claim for it.",
    ],
  },
    ],
  },

  showcase: {
    eyebrow: "Try it yourself",
    title: "Thirteen builds. Pick one, see it run.",
    sub: "Every card below is a working demo, not a mockup. Open one to see a sample result instantly.",
    sampleBadge: "Sample",
    tryIt: "Try it",
    seeAll: "See every solution",
    disclaimer:
      "Each sample uses fictional data. To see one working on your own process, send us one spreadsheet. It's free.",
    teasers: {
      invoiceScanner: "scanned & itemised in seconds",
      customerChatbot: "answer confidence",
      appointmentBooking: "booked and confirmed automatically",
      quotationGenerator: "quote drafted, GST included",
      jobPostingWriter: "role requirements written out",
      inventoryTracker: "items flagged for reorder",
      socialMediaManager: "platform posts drafted at once",
      documentTranslator: "languages, one click",
      employeeOnboarding: "onboarding tasks scheduled",
      salesAssistant: "follow-up emails sequenced",
      complianceChecker: "high-risk clauses caught",
      trainingContentGenerator: "training modules built",
      financialReportBuilder: "quarterly net profit, explained",
    },
  },

  practices: {
    eyebrow: "Practices",
    title: "Four practices, one delivery team",
    sub: "We go deep in four areas rather than wide across twenty. Each one is led personally by the principal and staffed with specialists as the work demands.",
    details: "Details",
    items: [
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
  },
  {
    title: "Business Systems",
    description:
      "Operations platforms, CRM, inventory, documents and workflow that replace spreadsheets and disconnected tools — built to be audited, not just demoed.",
    details: [
      "Inventory, deals, documents and payments in one system, in place of spreadsheets and chat threads",
      "Multi-tenant, multi-currency, role-based access, audit-ready logging",
      "Starts from the spreadsheets you already run on, with import and export to Excel and Google Sheets",
      "Deployed on your own cloud account, database and repository",
    ],
  },
  {
    title: "Finance Workflows",
    description:
      "Invoicing, bank-statement import, reconciliation and document generation, with an audit trail your accountant can follow.",
    details: [
      "Automated reconciliation across accounts and currencies, with deterministic dedupe",
      "Bank statement ingestion — including formats that carry no transfer identifier",
      "Proforma invoices, commercial invoices and shipping documents generated from the same records",
      "InvoiceNow e-invoices from the system or spreadsheet you invoice from, through an accredited access point",
    ],
  },
  {
    title: "Cross-border Operations",
    description:
      "Multi-currency, multi-language systems for companies trading between Singapore, Japan and the region, where each country's rules come first.",
    details: [
      "Data residency decided at architecture time, not retrofitted after review",
      "Several currencies, tax regimes and document formats in one system",
      "Screens and documents in English, Japanese, Chinese, Malay or Bahasa Indonesia",
      "Live today for an exporter in Japan: stock, deals, documents and payments",
    ],
  },
    ],
  },

  industries: {
    eyebrow: "Industries",
    title: "Where our systems fit",
    sub: "What we build for each sector. Our delivered client work so far is an export system and an AI co-pilot; for the other sectors we show working demos, not past projects.",
    items: [
  {
    name: "Trading & Logistics",
    description:
      "Stock, deals, shipping documents and payments for trading, wholesale and logistics firms that have outgrown their spreadsheets.",
    details: [
      "Stock and deals in one place, with each role seeing only its own view",
      "Proforma invoices, commercial invoices and shipping instructions generated from the same record",
      "Bank-statement import and reconciliation across currencies",
      "Shipment tracking and buyer portals for customers abroad",
    ],
  },
  {
    name: "Finance & Banking",
    description:
      "Document processing, reconciliation, insurance paperwork and risk checks for finance teams and the firms that serve them.",
    details: [
      "Real-time transaction monitoring and anomaly detection",
      "Statements, policies and claims read by document AI, with the source shown for every figure",
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
    ],
  },

  approach: {
    eyebrow: "Approach",
    title: "From first call to a working system",
    sub: "Five steps, with a written scope and cost before any code. We plan a full build at about twelve weeks. We implement, not just advise.",
    deliverable: "Deliverable",
    step: "Go to step",
    previous: "Previous",
    next: "Next",
    items: [
  {
    week: "Week 1–2",
    title: "Discovery & AI Readiness",
    items: [
      "Business goals and pain point analysis",
      "Current systems and data assessment",
      "Highest-impact AI opportunity identification",
      "Success metrics and KPI definition",
    ],
    deliverable: "AI Opportunity Report & ROI Projections",
  },
  {
    week: "Week 3–4",
    title: "Solution Architecture",
    items: [
      "AI solution architecture design",
      "Model and platform selection",
      "System integration planning",
      "Data pipeline and security protocols",
    ],
    deliverable: "Technical Architecture & Implementation Plan",
  },
  {
    week: "Week 5–8",
    title: "Proof of Concept",
    items: [
      "Working prototype with real data",
      "AI model training and fine-tuning",
      "Core feature implementation",
      "User testing and feedback",
    ],
    deliverable: "Working PoC with Core Capabilities",
  },
  {
    week: "Week 9–11",
    title: "Production Deployment",
    items: [
      "Production-ready system scaling",
      "Security, monitoring, and backup",
      "Load testing and performance tuning",
      "Staff training and documentation",
    ],
    deliverable: "Production System Ready for Users",
  },
  {
    week: "Week 12+",
    title: "Optimisation & Support",
    items: [
      "Performance monitoring and feedback",
      "Continuous model improvement",
      "Feature enhancements",
      "Ongoing technical support",
    ],
    deliverable: "Performance Reports & Recommendations",
  },
    ],
  },

  objections: {
    eyebrow: "Straight answers",
    title: "Questions worth asking first.",
    sub: "The ones we get asked most, answered plainly — including where the honest answer is that you should wait.",
    items: [
  {
    said: "We have paid for this once before and could not use it. What is different?",
    answer:
      "Usually the build was fine and the requirements were wrong — nobody sat with the people doing the work before the code started. So we do discovery first and you own the output whether or not you continue with us. If the previous system is salvageable we will say so; rewriting something that mostly works is a bad use of your money.",
    proof:
      "The vehicle-export rebuild started as a rescue of exactly this kind.",
  },
  {
    said: "What happens to the system if you are unavailable?",
    answer:
      "The principal writes the core and specialists are brought in as the work demands. What protects you is not headcount, it is that the system is documented, tested and deployed on infrastructure you own — your Cloudflare account, your database, your repository. Another engineer can pick it up because the tests describe what it is supposed to do.",
    proof: "7,060 automated tests across 484 calculation classes, in our internal ERP build.",
  },
  {
    said: "What does something like this usually cost?",
    answer:
      "You get a range on the first call and a firm number after discovery. We will say the real figure early rather than late, then cut scope together until it fits — a smaller system that ships beats a large one that stalls. Singapore SMEs may qualify for support under the EDGE Grant, which replaced PSG; we help you check whether your project qualifies and prepare our vendor documents at no charge.",
    proof: "Enterprise Singapore decides EDGE support, and StarTech is not a pre-approved EDGE vendor.",
  },
  {
    said: "Is there a cost to waiting a quarter or two?",
    answer:
      "Sometimes none, and we will say so. We would rather you called when the problem is urgent than commit while it is not. Worth knowing: the cost of waiting is usually not the software, it is the manual reconciliation and the mistakes in between. If you want, we will quantify that on the call and you can decide with a number in front of you.",
  },
  {
    said: "How much will we have to explain about how our business works?",
    answer:
      "That is the entire reason this firm exists. You will not be explaining what a trial balance is, what goes on a tax invoice, or why a payment reconciles the way it does. Brief us the way you would brief your accountant.",
    proof: "20+ years in both business and technology.",
  },
    ],
  },

  capabilityDeck: {
    eyebrow: "Take it with you",
    title: "The whole pitch, in one document.",
    sub: "Every practice, every proof point, every number on this page.",
    cta: "Download the capability deck",
  },

  contact: {
    eyebrow: "Contact",
    title: "Thirty minutes, and an honest answer",
    sub: "Tell us what the process costs you today, and we will come back with what is worth building.",
    email: "Email",
    phone: "Phone",
    reassurance:
      "No commitment, and the discovery output is yours whether or not you continue with us.",
    name: "Name",
    company: "Company",
    message: "Message",
    messagePlaceholder: "Tell us about your project...",
    send: "Send message",
    sending: "Sending...",
    success:
      "Thank you for your message. We will come back to you shortly.",
    error: "Something went wrong. Please try again, or email us directly.",
    country: "Country",
    staff: "Staff",
    staffPick: "How many people",
    staffOptions: ["Under 10", "10 to 50", "51 to 200", "Over 200"],
    spreadsheet: "Your spreadsheet (optional)",
    spreadsheetHint:
      "Excel, CSV or Numbers, up to 10 MB. Remove anything confidential; a sample of rows is enough.",
    fileTooLarge: "That file is over 10 MB. Send a smaller extract.",
  },

  // The digital flyer at /flyer. Claims are the capability deck's and nothing
  // more; see docs/COMPANY.md, "Claims to keep honest".
  flyer: {
    eyebrow: "Singapore · Japan · Working worldwide",
    headline: "From spreadsheet to system.",
    who: "For companies of 10 to 200 people that run on spreadsheets, or on a system a vendor never finished. We build the software your operation actually runs on, and you own every part of it.",
    ctaOffer: "Send us one spreadsheet",
    ctaDeck: "Download the deck",
    proofEyebrow: "Three things that are true",
    proof: [
      {
        lead: "Live in Japan",
        detail:
          "A used-car exporter runs on a system we built: inventory, CRM, invoices, shipping documents and payments. In production, with the client, today.",
      },
      {
        lead: "7,060 tests",
        detail:
          "Automated tests across 484 calculators in our ERP build, from the August 2026 run. An internal build, not yet deployed, with no accuracy claim.",
      },
      {
        lead: "You own it",
        detail:
          "The founder writes the code. The cloud account, the database and the repository are in your name from the first week, so no vendor can hold your business.",
      },
    ],
    demosEyebrow: "Try before you commit",
    demosTitle: "Working demos, not slides",
    demosSub: "{count} small systems you can run in the browser with sample data. These three are the most universal.",
    demoOpen: "Open the demo",
    demosAll: "See all {count} demos",
    invoiceNowLink: "InvoiceNow: see a sample e-invoice built from a spreadsheet",
    offerEyebrow: "The offer",
    offerTitle: "Send us one spreadsheet and we will show it working as a system.",
    offerBody:
      "Pick the sheet that runs your business: quotes, stock, jobs, deliveries, anything. Within two weeks you see it as a working system, with your rows in it, and a straight answer on what a full build would cost.",
    offerPoints: ["No cost, no commitment", "3 to 5 companies a month", "What we build in the demo is yours to keep"],
    formEyebrow: "Start here",
    formTitle: "One spreadsheet, one form",
    formSub: "Tell us what the sheet does for you today. We reply within two working days.",
    formReassurance:
      "Your file is stored privately, read by one person, and deleted on request. Nothing is shared and nothing is sold.",
    formSend: "Send the spreadsheet",
    messagePlaceholder: "What does this spreadsheet do for the business, and where does it break?",
    deckLine: "Download the 8-slide capability deck. No email needed.",
    grantsLabel: "Singapore companies:",
    grantsLine: "we will check whether your project qualifies for EDGE support.",
    backHome: "Back to the main site",
  },

  testimonial: {
    eyebrow: "Testimonial",
    title: "How was working with StarTech?",
    intro: "A sentence or two about the project helps other companies decide whether to work with us. Nothing is published until you have seen and approved the final wording.",
    name: "Your name",
    role: "Your role",
    company: "Company",
    email: "Email",
    quote: "Your testimonial",
    quotePlaceholder: "What did you need, how did the project go, and what changed afterwards?",
    quoteHint: "One to three sentences is plenty.",
    credit: "How may we credit you?",
    creditFull: "Name, role and company",
    creditAnonymous: "Role and industry only, no name",
    creditPrivate: "Feedback only, please do not publish",
    consent: "StarTech may shorten this for length, and will show me the final wording before publishing it.",
    send: "Send testimonial",
    sending: "Sending…",
    thanksTitle: "Thank you!",
    thanksBody: "We have received it and will send you the final wording to approve before anything goes online.",
    errorRequired: "Please fill in this field.",
    errorEmail: "Please enter a valid email address.",
    errorQuoteShort: "Please write at least a sentence (20 characters).",
    errorConsent: "Please tick this box to continue.",
    error: "Something went wrong. Please try again.",
  },
  invoicenow: {
    eyebrow: "InvoiceNow · Singapore",
    headline: "InvoiceNow e-invoices, sent from the system you already use",
    lead: "InvoiceNow is Singapore's e-invoicing network, and IRAS is phasing it in for every GST-registered business. We connect the system or spreadsheet you invoice from to an InvoiceNow access point.",
    ctaDemo: "Try the sample invoice",
    ctaFlyer: "Send us one spreadsheet",
    whatEyebrow: "What it is",
    whatTitle: "InvoiceNow in plain words",
    what: [
      {
        title: "A data file, not a PDF",
        body: "An InvoiceNow invoice is a structured file (Peppol PINT SG, written in XML) that the buyer's system reads directly. Nobody retypes it.",
      },
      {
        title: "Sent over the Peppol network",
        body: "Your invoice goes to an access point, which finds the buyer by their Peppol ID (built from their UEN) and delivers it to the buyer's access point.",
      },
      {
        title: "A copy goes to IRAS",
        body: "For GST-registered businesses, the access point also sends the invoice data to IRAS. Seller, buyer and their two access points are four corners; IRAS is the fifth.",
      },
    ],
    whoEyebrow: "Who must use it, and when",
    whoTitle: "IRAS is phasing it in for every GST-registered business",
    whoIntro: "According to IRAS, GST-registered businesses must send invoice data to IRAS through InvoiceNow, starting on these dates:",
    phases: [
      { date: "1 Nov 2025", text: "Companies that register for GST voluntarily within 6 months of incorporation." },
      { date: "1 Apr 2026", text: "Any business applying to register for GST voluntarily from this date." },
      { date: "1 Apr 2028", text: "Businesses applying for compulsory GST registration from this date, and existing GST-registered businesses with annual supplies up to S$200,000." },
      { date: "1 Apr 2029", text: "Existing GST-registered businesses with annual supplies up to S$1 million." },
      { date: "1 Apr 2030", text: "Existing GST-registered businesses with annual supplies up to S$4 million." },
      { date: "1 Apr 2031", text: "Existing GST-registered businesses with annual supplies above S$4 million." },
    ],
    whoNote: "IRAS sets the bands from the supplies reported for 2025 and is notifying existing businesses of their date. Check the IRAS page for your own case.",
    whoSource: "IRAS: GST InvoiceNow Requirement (page last updated 8 October 2026)",
    accountant: "We do software integration only. Whether InvoiceNow applies to you, and the GST treatment of each invoice line, should be confirmed with your accountant or IRAS.",
    offerEyebrow: "What we do",
    offerTitle: "We connect the system or spreadsheet you invoice from to an InvoiceNow access point.",
    offerBody: "If you invoice from an in-house system, an older ERP or a spreadsheet, IRAS's route is to connect through an accredited access point. We build that connection: your invoice data mapped to PINT SG, sent through the access point's API, and the delivery status brought back to where you work.",
    offerPoints: [
      "Your invoice data mapped to PINT SG",
      "Sent through the access point's API",
      "Delivery status and errors shown where you work",
    ],
    offerHonest: "StarTech is not an access point provider and is not IMDA-accredited. A real connection goes through an IMDA-accredited access point that we choose together with you.",
    demoEyebrow: "Try it",
    demoTitle: "Turn a sample invoice into PINT SG XML",
    demoIntro: "Fill in the invoice or upload the CSV template. Your browser builds the XML and checks it against a set of PINT SG rules. Nothing is sent anywhere.",
    sampleBadge: "Sample data, not a valid tax invoice",
    csvTitle: "Start from a spreadsheet",
    csvHint: "One row per invoice line, with the invoice and buyer details repeated on each row. The seller details stay in the form below.",
    csvDownload: "Download the CSV template",
    csvUpload: "Upload a CSV file",
    csvLoaded: "Loaded {count} lines from the file.",
    csvSkipped: "The file has {count} more invoice numbers; only the first invoice was loaded.",
    csvErrorEmpty: "That file is empty.",
    csvErrorColumns: "These columns are missing from the file: {columns}",
    csvErrorRows: "The file has a header row but no invoice lines.",
    csvErrorRead: "That file could not be read.",
    loadValid: "Fill with a valid sample",
    loadBroken: "Fill with a broken sample",
    invoiceSection: "Invoice details",
    sellerSection: "Seller (your business)",
    buyerSection: "Buyer",
    linesSection: "Invoice lines",
    fields: {
      invoiceNumber: "Invoice number",
      issueDate: "Issue date",
      dueDate: "Due date",
      buyerReference: "Buyer reference or PO number",
      paymentTerms: "Payment terms",
      name: "Registered name",
      uen: "UEN (Unique Entity Number)",
      gstRegNo: "GST registration number",
      street: "Street address",
      postalCode: "Postal code",
      description: "Description",
      quantity: "Quantity",
      unit: "Unit",
      unitPrice: "Unit price (S$)",
      gstCategory: "GST category",
      lineAmount: "Line amount",
    },
    units: {
      H87: "Piece",
      HUR: "Hour",
      DAY: "Day",
      MON: "Month",
    },
    categories: {
      SR: "SR · Standard-rated, 9%",
      ZR: "ZR · Zero-rated",
      ES33: "ES33 · Exempt, regulation 33",
      ESN33: "ESN33 · Exempt, other",
      OS: "OS · Out of scope",
      NG: "NG · Seller not GST-registered",
    },
    categoryNote: "Category codes come from the PINT SG code list. Which one applies to a line is a question for your accountant.",
    addLine: "Add a line",
    removeLine: "Remove line {n}",
    lineLabel: "Line {n}",
    errorNumber: "Enter a number such as 12.50, with up to 4 decimals.",
    errorQuantity: "Enter a quantity above zero, with up to 4 decimals.",
    errorDate: "Enter a date as YYYY-MM-DD.",
    generate: "Generate XML and run the checks",
    generating: "Generating…",
    resultEyebrow: "Result",
    totalsTitle: "Totals",
    totals: {
      net: "Total before GST",
      gst: "GST amount",
      payable: "Amount payable",
    },
    checksTitle: "Checks",
    checksSummary: "{passed} of {total} checks passed",
    pass: "Pass",
    fail: "Fail",
    demoCheck: "StarTech demo check, not a PINT SG rule",
    checksSource: "Rule IDs are from the PINT SG Billing v1.4.1 schematron, released 25 May 2026. This is a subset run in your browser; an access point runs the full validation before anything is sent.",
    checks: {
      specIds: "Specification and business process identifiers are PINT SG billing",
      invoiceNumber: "The invoice has a number",
      issueDate: "Issue date is present and every date is YYYY-MM-DD",
      dueOrTerms: "An amount is due, so a due date or payment terms are given",
      buyerReference: "A buyer reference or purchase order number is given",
      currency: "Invoice currency is SGD, with no separate tax currency",
      sellerName: "The seller's registered name is given",
      buyerName: "The buyer's registered name is given",
      sellerEndpoint: "The seller has a Peppol address (scheme 0195, from the UEN)",
      buyerEndpoint: "The buyer has a Peppol address (scheme 0195, from the UEN)",
      sellerLegalId: "The seller's UEN is given as its legal registration",
      sellerGstId: "GST is charged, so the seller's GST registration number is given",
      sellerAddress: "The seller's street address and postal code are given",
      buyerAddress: "The buyer's street address and postal code are given",
      countries: "Seller and buyer addresses carry a country code",
      uuid: "The invoice has a correctly formatted unique ID (UUID)",
      linesNamed: "There is at least one line, and every line has a description",
      lineCategories: "Every line has a valid Singapore GST category code",
      lineAmounts: "Each line amount equals quantity × unit price",
      netTotals: "Total before GST equals the sum of the line amounts",
      gstAmounts: "GST per category equals taxable amount × rate, and adds up to the GST total",
      payable: "Total with GST and amount payable add up",
      decimals: "No amount has more than 2 decimals",
      noGst: "A not-GST-registered (NG) line is not mixed with GST lines",
      noGstNumber: "An invoice with an NG line does not carry a seller GST number",
      uenFormat: "Both UENs have a valid UEN shape",
    },
    xmlTitle: "The generated XML",
    download: "Download the XML",
    nextEyebrow: "What happens next",
    nextTitle: "How this file would actually be sent",
    next: [
      {
        title: "Your system builds the file",
        body: "In a real connection, the XML is produced from your own invoice data each time you issue an invoice. Nobody types it in.",
      },
      {
        title: "It goes to an access point",
        body: "Your system sends it to an IMDA-accredited access point through that provider's API. The access point runs the full PINT SG validation.",
      },
      {
        title: "The buyer receives it",
        body: "The access point finds the buyer's access point through the Peppol directory and delivers the invoice into the buyer's system.",
      },
      {
        title: "IRAS receives a copy",
        body: "Once the submission feature is switched on, the access point also sends the invoice data to IRAS. That is the fifth corner.",
      },
    ],
    nextNote: "This page does not connect to any access point. A real connection uses an IMDA-accredited access point chosen with you.",
    ctaTitle: "Do you invoice from a spreadsheet today?",
    ctaBody: "Send us the spreadsheet you invoice from. We will show you how it maps to InvoiceNow and give you a straight answer on what a connection would involve. No cost, no commitment.",
    ctaButton: "Send one spreadsheet",
    sourcesTitle: "Sources",
    sourceIras: "IRAS: GST InvoiceNow Requirement",
    sourcePint: "Peppol: PINT SG Billing v1.4.1 specification",
    sourceImda: "IMDA: InvoiceNow",
    backHome: "Back to the main site",
  },

  // The Singpass FAPI 2.0 page at /singpass. StarTech has not yet done a
  // Singpass migration for a client and is not a Singpass or GovTech
  // partner; the copy must never say otherwise. Deadlines are Singpass's and
  // Corppass's own, linked on the page.
  singpass: {
    eyebrow: "Singpass upgrade · FAPI 2.0",
    title: "Singpass logins must move to FAPI 2.0 by 31 December 2026",
    intro:
      "If your website or app has a “Log in with Singpass” button, or fills in forms from Myinfo, it has to move to Singpass's new security standard before the end of 2026.",
    source: "The deadline, as Singpass publishes it",
    ctaCheck: "Ask us to check your integration",
    ctaDemo: "Run the demo",
    changesEyebrow: "What changes",
    changesTitle: "Five changes to how the login works",
    changes: [
      {
        lead: "The request is sent ahead",
        detail:
          "Your server sends the login request to Singpass first (PAR), and the user's browser only carries a short reference. Nothing in the address bar can be altered.",
      },
      {
        lead: "A one-time proof per login",
        detail:
          "Your server proves it started the login (PKCE), so an intercepted login code is useless to anyone else.",
      },
      {
        lead: "Tokens tied to your key",
        detail:
          "Each code and token only works together with a key your server holds (DPoP). A leaked token cannot be reused.",
      },
      {
        lead: "Identity is encrypted",
        detail:
          "Every ID token is now encrypted to your key, and the NRIC moved to a new field. Code that reads the old format stops working.",
      },
      {
        lead: "Stricter redirects and errors",
        detail:
          "Custom app links are no longer accepted, Login apps must state what each login is for, and Singpass now sends errors back to your site, which has to handle them.",
      },
    ],
    migrationLink: "Singpass's migration guide for Login and Myinfo (v5) apps",
    whoEyebrow: "Who is affected",
    whoTitle: "Any site or app that uses Singpass to log people in or fill in their details",
    who: [
      "Websites, portals and mobile apps with “Log in with Singpass”",
      "Forms that prefill a person's details from Myinfo",
      "Integrations set up before February 2026; apps registered since then already had to use FAPI 2.0",
      "Myinfo v3 and v4 integrations, which Singpass asked to move to Myinfo v5 by the end of September 2026",
    ],
    corppass: "Corppass logins have their own, later deadline: 31 March 2027.",
    corppassLink: "Corppass timeline",
    riskEyebrow: "If you do not migrate",
    riskTitle: "Plan for the old login to stop working",
    riskBody:
      "Singpass requires every integration to be on FAPI 2.0 by 31 December 2026, and retired the documentation for the old flow on 14 July 2026. An integration still on the old flow should expect Singpass login or Myinfo prefill to fail after the deadline: people who cannot sign in, and forms they cannot complete.",
    demoEyebrow: "Working reference demo",
    demoTitle: "The whole FAPI 2.0 flow, running in your browser",
    demoIntro:
      "This runs the real protocol steps against a mock Singpass server we built for the demo. The keys are created fresh in your browser, the person is a sample, and nothing is sent to Singpass. Every request and response is shown, with tokens shortened.",
    demoNotice:
      "Mock server: not Singpass, and not connected to Singpass or GovTech. The same client code also runs against Singpass's own staging service: try it with the button below.",
    appType: "App type",
    appLogin: "Singpass Login",
    appMyinfo: "Myinfo (v5)",
    run: "Run the flow",
    runAgain: "Run it again",
    running: "Running the flow…",
    allPassed:
      "Every step passed. The details below arrived encrypted and signed, through a code and tokens bound to this browser's key.",
    failed: "A step failed. Its request and response are below.",
    cancelled:
      "Login cancelled. Singpass sends an error back to your site, and your site shows its own message, never Singpass's error text.",
    details: "Request and response",
    status: {
      pending: "Not started",
      running: "Running",
      waiting: "Waiting for you",
      done: "Passed",
      error: "Failed",
    },
    steps: {
      register: {
        title: "Register the app",
        body: "Your browser creates a signing key and an encryption key, and registers the public halves with the mock server, as you would on the Singpass Developer Portal.",
      },
      discovery: {
        title: "Read the server's configuration",
        body: "Endpoints and algorithms come from the OpenID configuration, not from hard-coded addresses.",
      },
      session: {
        title: "Create this login's secrets",
        body: "A fresh state, nonce, PKCE verifier (S256) and DPoP key, used for this one login and then thrown away.",
      },
      par: {
        title: "Send the request ahead (PAR)",
        body: "The login request goes to the server first, with a signed client assertion (private_key_jwt) and a DPoP proof. The server answers with a short-lived request_uri.",
      },
      authorize: {
        title: "Send the person to Singpass",
        body: "The address carries only client_id and request_uri. On the real service the person now approves the login in the Singpass app.",
      },
      redirect: {
        title: "Handle the way back",
        body: "Check state and iss before trusting the code.",
      },
      token: {
        title: "Swap the code for tokens",
        body: "Sends the code, the PKCE verifier, a new client assertion and a new DPoP proof. The tokens come back bound to the DPoP key.",
      },
      idToken: {
        title: "Decrypt and verify the ID token",
        body: "Decrypt with your encryption key, check the signature against the server's published keys (JWKS), then check iss, aud, exp and nonce.",
      },
      userinfo: {
        title: "Fetch the Myinfo data",
        body: "Authorization: DPoP, with a proof bound to the access token (ath). The answer is encrypted and signed as well, and nested in person_info.",
      },
      replay: {
        title: "Try a stolen code",
        body: "Someone who copied the code and the PKCE verifier tries them from another device, with their own key. The server must refuse.",
        refused: "Refused, as it should be: the code only works with the key that asked for it.",
        accepted: "The server accepted a stolen code. That is a bug.",
      },
    },
    loginTitle: "Mock Singpass login",
    loginBody:
      "On Singpass the person would now scan a QR code with the Singpass app. Here you decide for the sample person.",
    loginRequested: "Data requested",
    loginPurpose: "Purpose",
    approve: "Log in as the sample person",
    cancel: "Cancel the login",
    sample: "Sample person, not real",
    resultTitle: "What your site receives",
    errorGeneric: "Something went wrong. Please run the flow again in a minute.",
    offerEyebrow: "What we offer",
    offerTitle: "We check and upgrade your Singpass integration",
    offerSteps: [
      {
        lead: "Check",
        detail:
          "We read your current Singpass or Myinfo code and tell you in writing what has to change and how long it will take.",
      },
      {
        lead: "Upgrade",
        detail:
          "We build PAR, PKCE, DPoP and encrypted ID tokens into your codebase, and test against Singpass staging under your organisation's own app.",
      },
      {
        lead: "Go live",
        detail:
          "We switch production over before the deadline. Singpass lets the old and new flows run side by side, so the change can be staged.",
      },
    ],
    honesty:
      "To be plain: this demo is our reference implementation against a mock server. We have not yet completed a Singpass migration for a client, and we are not a Singpass or GovTech partner. Your Singpass app stays registered to your organisation.",
    otherWork: "See what else we build",
    formEyebrow: "Singpass check",
    formTitle: "Ask us to check your Singpass login",
    formSub: "Tell us which website or app has the Singpass login. We reply within two working days with what the FAPI 2.0 change means for it.",
    formPlaceholder: "Which site or app has the Singpass login, who built it, and does it use Myinfo or Corppass?",
    formSend: "Ask for a Singpass check",
    flyerLine: "Singpass must move to FAPI 2.0 by 31 December 2026. See our working demo of the new login flow.",
    stagingTitle: "Try it against Singpass staging",
    stagingBody: "This button runs the same client against Singpass's own staging service, under StarTech's staging app. Only Singpass staging test accounts can log in; real Singpass accounts cannot.",
    stagingButton: "Log in with Singpass (staging)",
    stagingResult: "Singpass staging returned this ID token, decrypted and verified",
    stagingCancelled: "The staging login was cancelled.",
    stagingFailed: "The staging login did not complete. Please try again later.",
  },

  stickyCta: {
    line: "Thirty minutes on your process, and a clear view of what to build first.",
    action: "Let's talk",
  },

  footer: {
    location: "Singapore",
    rights: "StarTech Innovation Pte. Ltd.",
  },

  demos: {
    signIn: {
      title: "Customize {title}",
      subtitle: "Sign in with Google to generate custom results with your own data.",
      notConfigured: "Sign-in isn't set up yet — check back soon.",
      signedInAs: "Signed in as",
      backToSample: "← Back to sample",
    },
  },
};

/**
 * The shape every locale must satisfy.
 *
 * Deliberately not `as const`: with literal types every translation would have
 * to equal the English string, which is the opposite of the point. This keeps
 * the key structure enforced while leaving the values free.
 */
export type Messages = typeof en;
