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
      testsLabel: "tests that must pass",
      jurisdictionsFigure: "2",
      jurisdictionsLabel: "jurisdictions",
      languagesFigure: "4",
      languagesLabel: "languages",
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
        body: "Money, payroll, claims — the places where close enough is not good enough, and being wrong costs more than being late.",
      },
    ],
    pricing:
      "On price: you will get a range on the first call and a firm number after discovery, not a figure invented from an email. And if an off-the-shelf tool already does the job, we will tell you which one — that is a cheaper answer than anything we could build you.",
    pricingLead: "On price:",
  },

  work: {
    eyebrow: "Selected work",
    title: "Systems running in production.",
    sub: "Four builds, described the way a business owner would describe them — what the company was actually doing beforehand, and what went wrong on the way.",
    before: "Before",
    built: "What we built",
    result: "Result",
    details: "Details",
    disclaimer:
      "Client names are withheld where the engagement is covered by confidentiality. Figures are drawn from the delivered systems and can be walked through in detail on a call.",
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
    title: "Enterprise Software",
    description:
      "Full ERP and line-of-business systems — financials, HR, inventory, procurement and manufacturing — built to be audited, not just demoed.",
    details: [
      "General ledger, AP, AR, payroll and fixed assets",
      "Multi-tenant, multi-currency, role-based access, audit-ready logging",
      "Singapore payroll compliance engine verified scenario-by-scenario against CPF Board tables",
      "Integrates with Xero, QuickBooks, Sheets and Excel",
    ],
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
  },
    ],
  },

  industries: {
    eyebrow: "Industries",
    title: "Domain expertise",
    sub: "Deep understanding of your industry's regulatory, operational, and technical requirements.",
    items: [
  {
    name: "Healthcare",
    description:
      "Hospital management, patient intake automation, medical record analysis, and AI-powered triage systems.",
    details: [
      "Electronic medical records with HL7 and FHIR compliance",
      "AI triage that prioritises patients by symptom severity",
      "Automated insurance claim submission and tracking",
      "Telemedicine integration with scheduling and billing",
    ],
  },
  {
    name: "Finance & Banking",
    description:
      "Accounting engines, insurance document processing, startup valuation, tax compliance, and fraud detection.",
    details: [
      "Real-time transaction monitoring and anomaly detection",
      "Regulatory reporting — MAS, OJK, and the regime your auditor answers to",
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
    title: "Strategy to production in 90 days",
    sub: "A proven process refined across enterprise deployments. We implement, not just advise.",
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
    proof: "7,060 automated tests across 484 calculator classes.",
  },
  {
    said: "What does something like this usually cost?",
    answer:
      "You get a range on the first call and a firm number after discovery. We will say the real figure early rather than late, then cut scope together until it fits — a smaller system that ships beats a large one that stalls. Singapore SMEs may qualify for support under the EDGE Grant, which replaced PSG; we check your project and prepare the vendor documents at no charge.",
    proof: "Eligibility confirmed against current IMDA criteria, not assumed.",
  },
  {
    said: "Is there a cost to waiting a quarter or two?",
    answer:
      "Sometimes none, and we will say so. We would rather you called when the problem is urgent than commit while it is not. Worth knowing: the cost of waiting is usually not the software, it is the manual reconciliation and the mistakes in between. If you want, we will quantify that on the call and you can decide with a number in front of you.",
  },
  {
    said: "How much will we have to explain about how our business works?",
    answer:
      "That is the entire reason this firm exists. You will not be explaining what a trial balance is, what CPF is owed, or why a claim reconciles the way it does. Brief us the way you would brief your accountant.",
    proof:
      "The payroll engine is verified scenario by scenario against CPF Board tables.",
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
          "Automated tests across 484 calculators in our ERP build, from the August 2026 run. An internal build, not yet deployed, and every number is checked before it ships.",
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
      "Mock server: not Singpass, and not connected to Singpass or GovTech. Once StarTech is registered on the Singpass Developer Portal, the same client code runs against Singpass staging with a configuration change.",
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
