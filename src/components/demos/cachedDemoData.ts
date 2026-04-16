/**
 * Pre-cached demo results for instant preview mode.
 * Each key matches a slug from demoRegistry.ts.
 * Each value matches the exact shape the corresponding renderer expects.
 * All company names, products, and people are fictional.
 */
export const CACHED_DEMO_DATA: Record<string, Record<string, unknown>> = {
  "invoice-scanner": {
    vendor: "Sample Café (Downtown)",
    date: "15 January 2026",
    currency: "SGD",
    items: [
      { description: "Flat White (Large)", quantity: 2, unit_price: 7.50, amount: 15.00 },
      { description: "Iced Matcha Latte", quantity: 1, unit_price: 8.90, amount: 8.90 },
      { description: "Almond Croissant", quantity: 2, unit_price: 5.90, amount: 11.80 },
      { description: "Grilled Chicken Panini", quantity: 1, unit_price: 14.50, amount: 14.50 },
      { description: "Sparkling Water (500ml)", quantity: 2, unit_price: 4.50, amount: 9.00 },
      { description: "Chocolate Brownie", quantity: 1, unit_price: 6.80, amount: 6.80 },
    ],
    subtotal: 66.00,
    gst: 5.94,
    total: 71.94,
  },

  "customer-chatbot": {
    question: "What membership plans do you offer and can I freeze my membership if I travel?",
    answer: "We offer three membership plans: Basic ($89/month — gym floor access), Premium ($139/month — classes + gym), and VIP ($199/month — everything including personal training sessions). All plans come with a 7-day free trial.\n\nYes, you can freeze your membership for up to 3 months per year at no extra cost. Simply log into your member portal or visit our front desk at least 7 days before your next billing date. Your remaining days will be preserved and resume when you reactivate.",
    confidence_percent: 94,
    suggested_followups: [
      "Do you offer corporate rates?",
      "What are your operating hours?",
      "Can I bring a guest?",
      "Is there parking available?",
    ],
  },

  "appointment-booking": {
    service: "Professional Teeth Whitening",
    confirmed_date: "Wednesday, 22 January 2026",
    confirmed_time: "2:30 PM",
    duration_minutes: 60,
    reminder_message: "Reminder: Your teeth whitening appointment is confirmed for Wed 22 Jan at 2:30 PM. Please arrive 10 minutes early and avoid coffee or tea for 24 hours beforehand. Reply CONFIRM or call us to reschedule.",
    confirmation_text: "Your appointment has been booked with your attending dentist at our clinic. A confirmation email has been sent to your registered address.",
  },

  "quotation-generator": {
    quote_number: "QT-2026-0142",
    date: "16 January 2026",
    client: "Sample Client Pte Ltd",
    items: [
      { description: "Website Design & Development (10-page corporate site)", quantity: 1, unit_price: 8500.00, amount: 8500.00 },
      { description: "SEO Setup & On-Page Optimisation", quantity: 1, unit_price: 2400.00, amount: 2400.00 },
      { description: "Content Writing — Service Pages (per page)", quantity: 10, unit_price: 350.00, amount: 3500.00 },
      { description: "Professional Photography — Office & Team", quantity: 1, unit_price: 1800.00, amount: 1800.00 },
      { description: "12-Month Hosting & Maintenance Plan", quantity: 1, unit_price: 1200.00, amount: 1200.00 },
    ],
    subtotal: 17400.00,
    gst: 1566.00,
    total: 18966.00,
    terms: "50% deposit upon acceptance, balance upon project completion. Revisions limited to 3 rounds per deliverable.",
    validity_days: 30,
  },

  "job-posting-writer": {
    title: "Senior Full-Stack Engineer",
    company: "Sample Fintech Pte Ltd",
    location: "Singapore (Hybrid — 3 days in-office)",
    employment_type: "Full-Time, Permanent",
    summary: "Join a Series B fintech startup transforming cross-border payments across Southeast Asia. You'll lead the development of our core payment processing platform serving over 200,000 merchants, working with a world-class engineering team in a fast-paced, high-impact environment.",
    responsibilities: [
      "Architect and build scalable payment processing services handling 10,000+ transactions per minute",
      "Lead technical design reviews and mentor a team of 4 engineers",
      "Design and implement RESTful APIs and real-time event-driven systems using TypeScript and Go",
      "Collaborate with Product and Compliance to deliver features that meet MAS regulatory requirements",
      "Drive adoption of CI/CD best practices, automated testing, and infrastructure-as-code",
      "Participate in on-call rotation and incident response for production systems",
    ],
    requirements: [
      "5+ years of professional software engineering experience",
      "Strong proficiency in TypeScript/Node.js and at least one compiled language (Go, Rust, or Java)",
      "Experience with PostgreSQL, Redis, and message queues",
      "Solid understanding of distributed systems, microservices, and API design",
      "Experience with major cloud platforms",
      "Excellent communication skills and a collaborative mindset",
    ],
    nice_to_have: [
      "Fintech or payments industry experience",
      "Experience with Kubernetes and Docker in production",
      "Familiarity with PCI-DSS compliance requirements",
      "Open source contributions or technical blog posts",
    ],
    benefits: [
      "Competitive salary: SGD 10,000 – 15,000/month + equity options",
      "Flexible hybrid work arrangement",
      "Annual learning budget of SGD 3,000",
      "Comprehensive health insurance for you and dependents",
      "21 days annual leave + birthday leave",
      "Regular team offsites across Southeast Asia",
    ],
    salary_range: "SGD 10,000 – 15,000 per month + equity",
  },

  "inventory-tracker": {
    analysis_date: "16 January 2026",
    items: [
      { name: "A4 Copy Paper (Ream)", current_stock: 12, daily_usage: 3, days_until_empty: 4, restock_date: "20 Jan 2026", alert_level: "critical", recommended_order_qty: 50 },
      { name: "Black Ink Cartridge (Standard)", current_stock: 2, daily_usage: 0.5, days_until_empty: 4, restock_date: "20 Jan 2026", alert_level: "critical", recommended_order_qty: 8 },
      { name: "Disposable Face Masks (Box/50)", current_stock: 8, daily_usage: 1, days_until_empty: 8, restock_date: "24 Jan 2026", alert_level: "warning", recommended_order_qty: 15 },
      { name: "Hand Sanitiser (500ml)", current_stock: 14, daily_usage: 1.5, days_until_empty: 9, restock_date: "25 Jan 2026", alert_level: "warning", recommended_order_qty: 20 },
      { name: "Whiteboard Markers (Pack/4)", current_stock: 25, daily_usage: 0.8, days_until_empty: 31, restock_date: "16 Feb 2026", alert_level: "ok", recommended_order_qty: 10 },
      { name: "Sticky Notes (Pack/12)", current_stock: 40, daily_usage: 1.2, days_until_empty: 33, restock_date: "18 Feb 2026", alert_level: "ok", recommended_order_qty: 12 },
    ],
    summary: "2 items need immediate reorder (A4 paper, ink cartridges). 2 items approaching low stock within 10 days. 2 items are well-stocked. Estimated monthly supply cost: SGD 680.",
  },

  "social-media-manager": {
    topic_summary: "Grand opening of a new artisanal café serving specialty coffee and modern local pastries. Opening week features 1-for-1 coffee and a live pastry-making demo.",
    posts: [
      {
        platform: "LinkedIn",
        content: "Excited to announce the opening of our new café in the heart of the neighbourhood! 🎉\n\nAfter 18 months of planning and recipe development, we're bringing together traditional local coffee culture with modern café experience.\n\nOur mission: preserve heritage flavours while making them accessible to a new generation.\n\n🗓️ Grand opening: 25 January 2026\n☕ Opening week: 1-for-1 on all coffee drinks\n\nWe'd love to welcome you. Drop by and say hello!",
        hashtags: ["#GrandOpening", "#LocalCafe", "#SupportLocal", "#SpecialtyCoffee", "#NeighbourhoodSpot"],
        character_count: 472,
        best_posting_time: "Tuesday 8:00 AM",
      },
      {
        platform: "Instagram",
        content: "The wait is over ☕✨\n\nWe're opening our doors this Saturday!\n\nTraditional coffee meets modern vibes — think artisan brews served in handmade ceramic cups, alongside fresh pastries that melt on your tongue.\n\n🎁 Opening week special: 1-for-1 coffee\n🎂 Live pastry-making demo (Sat 3pm)\n\nTag someone you'd bring for coffee ☕👇",
        hashtags: ["#LocalCafe", "#CoffeeLovers", "#CafeHopping", "#NewOpening", "#ArtisanCoffee", "#SupportLocal"],
        character_count: 368,
        best_posting_time: "Saturday 11:00 AM",
      },
      {
        platform: "Facebook",
        content: "🎉 GRAND OPENING 🎉\n\nWe're thrilled to finally open our doors!\n\nWhat makes us different:\n☕ Specialty coffee brewed with beans from a 3rd-generation roaster\n🍰 Modern pastries made fresh daily\n🎨 A cosy space designed for the neighbourhood\n\nOpening week highlights:\n• 1-for-1 on ALL coffee drinks (25 Jan – 1 Feb)\n• Live pastry-making demo (Sat 3pm)\n• Free tote bag for first 100 customers\n\nBring your family, bring your friends — we can't wait to meet you! 🤗\n\n⏰ Mon–Sat 7am–6pm | Sun 8am–4pm",
        hashtags: ["#GrandOpening", "#LocalCafe", "#NewCafe", "#SupportLocal", "#SingaporeFood"],
        character_count: 542,
        best_posting_time: "Thursday 12:00 PM",
      },
      {
        platform: "X/Twitter",
        content: "Our new café opens this Saturday! ☕\n\nSpecialty coffee × modern pastries × neighbourhood vibes\n\n1-for-1 coffee all opening week 🎁\n\nSee you there 👋",
        hashtags: ["#GrandOpening", "#LocalCafe", "#SGCafe", "#SpecialtyCoffee"],
        character_count: 156,
        best_posting_time: "Saturday 9:00 AM",
      },
    ],
  },

  "document-translator": {
    source_language: "English",
    target_language: "Chinese (Simplified)",
    original_text: "Dear Mr. Lim,\n\nThank you for your interest in our managed IT services. Following our meeting on Monday, I'm pleased to provide a tailored proposal for your company.\n\nOur Standard Support Plan includes 24/7 system monitoring, monthly security patches, and a dedicated account manager. The monthly fee is SGD 2,800 for up to 50 endpoints.\n\nI've attached the full proposal with pricing tiers. Please don't hesitate to reach out if you have any questions.\n\nBest regards,\nBusiness Development Manager",
    translated_text: "尊敬的林先生，\n\n感谢您对我们托管IT服务的关注。根据周一的会议，我很高兴为贵公司提供定制方案。\n\n我们的标准支持计划包括全天候系统监控、每月安全补丁更新以及专属客户经理。月费为新加坡币2,800元，涵盖最多50个终端设备。\n\n完整的方案及价格层级详见附件。如有任何疑问，请随时与我联系。\n\n此致敬礼，\n业务发展经理",
    notes: [
      "\"Pte Ltd\" is commonly kept untranslated in Singapore business correspondence as a legal entity abbreviation.",
      "\"Endpoints\" translated as \"终端设备\" (terminal devices) — the standard IT terminology in Mandarin.",
      "Monetary amounts kept in SGD format as is standard in Singapore bilingual communications.",
    ],
  },

  "employee-onboarding": {
    offer_letter_preview: "OFFER OF EMPLOYMENT\n\nDate: 16 January 2026\n\nDear [Candidate Name],\n\nWe are pleased to offer you the position of Marketing Manager at [Company Name], reporting to the Head of Marketing.\n\nStart Date: 3 February 2026\nMonthly Salary: SGD 7,500\nProbation Period: 3 months\nAnnual Leave: 18 days\nMedical Benefits: Group hospitalisation and outpatient coverage\n\nYour role will involve leading our digital marketing strategy, managing a team of 3 executives, and driving lead generation across Southeast Asia.\n\nPlease sign and return this letter by 23 January 2026 to confirm your acceptance.\n\nWe look forward to having you on board.\n\nYours sincerely,\nManaging Director\n[Company Name]",
    nda_preview: "NON-DISCLOSURE AGREEMENT\n\nThis Agreement is entered into as of 3 February 2026 between [Company Name] (\"Company\") and [Candidate Name] (\"Employee\").\n\n1. CONFIDENTIAL INFORMATION\nThe Employee acknowledges that during the course of employment, they will have access to proprietary information including but not limited to: client lists, pricing strategies, marketing campaigns, financial data, and trade secrets.\n\n2. OBLIGATIONS\nThe Employee agrees to:\n(a) Not disclose any Confidential Information to third parties\n(b) Use Confidential Information solely for Company purposes\n(c) Return all materials containing Confidential Information upon termination\n\n3. DURATION\nThis obligation survives for 2 years after employment ends.\n\n4. REMEDIES\nBreach may result in disciplinary action, termination, and/or legal proceedings.\n\nSigned: _______________\nDate: _______________",
    checklist: [
      { task: "Send signed offer letter to HR", owner: "New Hire", due_by: "23 Jan 2026", category: "Pre-Boarding" },
      { task: "Prepare workstation and laptop", owner: "IT Department", due_by: "31 Jan 2026", category: "Pre-Boarding" },
      { task: "Create email account and system access", owner: "IT Department", due_by: "31 Jan 2026", category: "Pre-Boarding" },
      { task: "Schedule orientation with HR", owner: "HR Manager", due_by: "3 Feb 2026", category: "Day 1" },
      { task: "Complete payroll and CPF registration", owner: "Finance", due_by: "3 Feb 2026", category: "Day 1" },
      { task: "Team introduction and office tour", owner: "Head of Marketing", due_by: "3 Feb 2026", category: "Day 1" },
      { task: "Review marketing strategy deck", owner: "New Hire", due_by: "7 Feb 2026", category: "Week 1" },
      { task: "1-on-1 with each team member", owner: "New Hire", due_by: "14 Feb 2026", category: "Week 1-2" },
      { task: "Complete mandatory compliance training", owner: "New Hire", due_by: "14 Feb 2026", category: "Week 1-2" },
      { task: "30-day check-in with manager", owner: "Head of Marketing", due_by: "5 Mar 2026", category: "Month 1" },
    ],
  },

  "sales-assistant": {
    lead_summary: "COO at a mid-size logistics firm (150 employees, SGD 28M revenue). Interested in warehouse management automation. Currently using spreadsheets for inventory tracking across 3 warehouses. Pain point: frequent stockouts and manual data entry errors costing ~SGD 40K/month in lost efficiency.",
    emails: [
      {
        subject: "Quick question about your warehouse operations",
        body: "Hi,\n\nGreat speaking with you at the Supply Chain Asia conference last week. Your point about the challenges of managing inventory across three warehouses really resonated — it's a problem we've helped several logistics companies solve.\n\nI did some quick research on your company and noticed you've been expanding your cold chain capabilities. Congratulations on the new facility!\n\nI'd love to share how we helped a similar-sized logistics firm cut their stockout rate by 73% and save over SGD 35K/month within 90 days of deployment.\n\nWould you have 20 minutes this Thursday or Friday for a quick call?\n\nBest regards,\n[Your Name]",
        send_day: "Day 1",
        purpose: "Initial outreach — establish rapport and relevance",
      },
      {
        subject: "ROI breakdown: Warehouse automation",
        body: "Hi,\n\nFollowing up on my earlier note. I put together a quick back-of-envelope ROI estimate based on what you shared:\n\n• Current manual data entry: ~40 hours/week across 3 warehouses\n• Estimated error rate: 3–5% (industry average for manual tracking)\n• Projected savings with automation: SGD 38K–45K/month\n• Typical payback period: 4–6 months\n\nI've attached a 2-page case study from a client in the same industry — similar scale, and they went live in just 6 weeks.\n\nHappy to walk through the numbers together if helpful. No pressure at all — just want to make sure you have the information to evaluate.\n\nBest,\n[Your Name]",
        send_day: "Day 4",
        purpose: "Provide value with data and social proof",
      },
      {
        subject: "One last thought on the warehouse challenge",
        body: "Hi,\n\nI know you're busy, so I'll keep this brief.\n\nWe're running a small private workshop next Thursday (30 Jan) for operations leaders in logistics — \"3 Warehouse Automation Wins You Can Implement This Quarter.\" It's 45 minutes on Zoom, very practical, no sales pitch.\n\nGiven the challenges you mentioned at the conference, I thought it might be useful. Here's the registration link: [link]\n\nEither way, I'm happy to be a resource whenever you're ready to explore automation. Feel free to reach out anytime.\n\nCheers,\n[Your Name]",
        send_day: "Day 8",
        purpose: "Soft close with value-add invitation",
      },
    ],
  },

  "compliance-checker": {
    document_type: "Employment Contract",
    findings: [
      {
        clause_excerpt: "The Company may terminate employment at any time without notice during the first 6 months.",
        issue: "No-notice termination clause may violate Employment Act requirements",
        severity: "high" as const,
        regulation: "Employment Act (Singapore), Section 10 — Notice period requirements apply from day one of employment, including probation. Minimum 1 day notice required for employment under 26 weeks.",
        suggestion: "Add a minimum notice period of 1 day during probation (first 26 weeks) and 1 week for employment between 26 weeks and 2 years, as required by the Employment Act.",
      },
      {
        clause_excerpt: "Employee agrees to a non-compete restriction of 3 years within all of Southeast Asia.",
        issue: "Non-compete scope may be unenforceable due to excessive duration and geography",
        severity: "high" as const,
        regulation: "Singapore common law — Restraint of trade clauses must be reasonable in scope, duration, and geography. Courts have consistently struck down clauses exceeding 12 months or covering overly broad geographies.",
        suggestion: "Reduce non-compete duration to 6–12 months and limit geography to Singapore or specific countries where the employee had direct client contact.",
      },
      {
        clause_excerpt: "Overtime compensation shall be calculated at the employee's standard hourly rate.",
        issue: "Overtime rate does not meet statutory minimum of 1.5x",
        severity: "medium" as const,
        regulation: "Employment Act (Singapore), Section 38(4) — Overtime must be paid at not less than 1.5 times the hourly basic rate for employees covered under Part IV.",
        suggestion: "Update overtime clause to specify \"1.5 times the hourly basic rate of pay\" for Part IV employees, or explicitly state if the employee is not covered under Part IV.",
      },
      {
        clause_excerpt: "Annual leave entitlement: 7 days per year for the first 2 years of service.",
        issue: "Leave entitlement meets minimum but consider market competitiveness",
        severity: "low" as const,
        regulation: "Employment Act (Singapore), Section 43 — Minimum 7 days for first year, increasing by 1 day per year up to 14 days. This clause meets the legal minimum.",
        suggestion: "While legally compliant, the market average in Singapore is 14–18 days. Consider increasing to remain competitive in talent acquisition.",
      },
    ],
    risk_score: 7,
    summary: "This employment contract has 2 high-risk issues requiring immediate attention (termination notice and non-compete scope), 1 medium-risk statutory compliance gap (overtime rate), and 1 advisory finding. The contract should not be executed until the high-risk items are resolved.",
  },

  "training-content-generator": {
    course_title: "Workplace Safety & Emergency Response",
    total_duration_hours: 3.5,
    modules: [
      {
        title: "Workplace Hazard Identification",
        duration_minutes: 45,
        objectives: [
          "Identify common workplace hazards in office and warehouse environments",
          "Classify hazards by severity and likelihood using a risk matrix",
          "Report hazards through the correct channels",
        ],
        content_summary: "This module covers the fundamentals of hazard identification across different work environments. Learners will practice identifying physical, chemical, ergonomic, and biological hazards through real-world scenario walkthroughs. The module includes a risk assessment framework (5x5 matrix) used by WSH Council Singapore.",
        quiz: [
          {
            question: "Which of the following is classified as an ergonomic hazard?",
            options: ["Wet floor near entrance", "Prolonged sitting without lumbar support", "Expired fire extinguisher", "Blocked emergency exit"],
            correct_answer_index: 1,
          },
          {
            question: "What is the correct first step when you identify a workplace hazard?",
            options: ["Fix it yourself immediately", "Report it to your supervisor or safety officer", "Ignore it if it seems minor", "Post about it on the company chat"],
            correct_answer_index: 1,
          },
        ],
      },
      {
        title: "Personal Protective Equipment (PPE)",
        duration_minutes: 30,
        objectives: [
          "Select the correct PPE for different tasks and environments",
          "Inspect PPE for damage before use",
          "Understand legal obligations under the WSH Act",
        ],
        content_summary: "Covers selection, use, and maintenance of PPE including hard hats, safety goggles, gloves, ear protection, and respirators. Includes Singapore-specific WSH Act obligations for both employers (to provide) and employees (to use). Features a PPE selection decision tree for common scenarios.",
        quiz: [
          {
            question: "Under the WSH Act, who is responsible for providing PPE?",
            options: ["The employee", "The employer", "The government", "The PPE manufacturer"],
            correct_answer_index: 1,
          },
          {
            question: "How often should safety helmets be replaced, even without visible damage?",
            options: ["Every month", "Every 6 months", "Every 2–3 years or per manufacturer guidelines", "Only when damaged"],
            correct_answer_index: 2,
          },
        ],
      },
      {
        title: "Fire Safety & Evacuation Procedures",
        duration_minutes: 50,
        objectives: [
          "Operate a fire extinguisher using the PASS technique",
          "Execute building evacuation procedures correctly",
          "Identify assembly points and emergency exits",
        ],
        content_summary: "Teaches fire prevention, classification of fires (Class A–D and electrical), proper fire extinguisher selection and the PASS technique (Pull, Aim, Squeeze, Sweep). Includes building-specific evacuation routes, assembly point procedures, and roles of fire wardens. Covers SCDF regulations for commercial buildings.",
        quiz: [
          {
            question: "What does the 'S' in the PASS technique stand for?",
            options: ["Stop", "Spray", "Sweep", "Squeeze"],
            correct_answer_index: 2,
          },
          {
            question: "Which fire extinguisher should be used for an electrical fire?",
            options: ["Water", "Foam", "CO₂ (Carbon Dioxide)", "Wet chemical"],
            correct_answer_index: 2,
          },
        ],
      },
      {
        title: "First Aid & Emergency Response",
        duration_minutes: 45,
        objectives: [
          "Administer basic first aid for common workplace injuries",
          "Perform CPR and use an AED",
          "Activate the emergency response chain correctly",
        ],
        content_summary: "Covers basic first aid for cuts, burns, fractures, and fainting. Includes CPR technique (30:2 compression-to-breath ratio) and AED operation. Teaches the emergency response chain: assess scene safety → call 995 → provide first aid → hand over to paramedics. Includes Singapore-specific Good Samaritan protections.",
        quiz: [
          {
            question: "What is the correct compression-to-breath ratio for adult CPR?",
            options: ["15:1", "15:2", "30:1", "30:2"],
            correct_answer_index: 3,
          },
          {
            question: "What is the emergency number for ambulance services in Singapore?",
            options: ["999", "995", "911", "112"],
            correct_answer_index: 1,
          },
        ],
      },
    ],
  },

  "financial-report-builder": {
    period: "Q4 2025 (Oct – Dec)",
    revenue: 1247000,
    expenses: 891000,
    net_profit: 356000,
    gross_margin_pct: 42.8,
    net_margin_pct: 28.5,
    analysis: "Q4 2025 shows strong performance with revenue up 18% quarter-over-quarter, driven primarily by new enterprise client acquisitions in November. Expenses grew by only 9%, indicating improving operational efficiency. Net margin expanded by 3.2 percentage points from Q3, reflecting successful cost optimisation in cloud infrastructure and vendor renegotiations. The SGD 356K net profit represents the highest quarterly result this fiscal year.",
    key_metrics: [
      { metric: "Revenue Growth (QoQ)", value: "+18.2%", assessment: "positive" as const },
      { metric: "Operating Expenses", value: "SGD 891K", assessment: "neutral" as const },
      { metric: "Net Profit Margin", value: "28.5%", assessment: "positive" as const },
      { metric: "Cash Position", value: "SGD 2.1M", assessment: "positive" as const },
      { metric: "Accounts Receivable (>60 days)", value: "SGD 124K", assessment: "negative" as const },
      { metric: "Customer Acquisition Cost", value: "SGD 3,200", assessment: "neutral" as const },
    ],
    trends: [
      "Revenue has grown for 3 consecutive quarters, with Q4 showing the steepest acceleration",
      "Cloud infrastructure costs reduced by 22% after migration to reserved instances",
      "Enterprise segment now represents 45% of total revenue, up from 31% in Q1",
      "Employee headcount grew from 28 to 34, with 4 engineering hires in November",
      "Accounts receivable aging has increased — 2 enterprise clients have invoices overdue by 60+ days",
    ],
    recommendations: [
      "Implement stricter payment terms for enterprise contracts (net-30 with 2% early payment discount)",
      "Continue investing in enterprise sales — the segment shows 3x higher LTV than SMB",
      "Consider hiring a dedicated collections specialist to address the AR aging trend",
      "Lock in current cloud pricing with a 1-year reserved instance commitment to protect Q1 margins",
      "Allocate SGD 50K budget for Q1 marketing campaigns targeting the enterprise pipeline",
    ],
  },
};
