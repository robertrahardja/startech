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
    ctaAsk: "Ask a question",
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
    disclaimer:
      "Client names are withheld where the engagement is covered by confidentiality. Figures are drawn from the delivered systems and can be walked through in detail on a call.",
  },

  practices: {
    eyebrow: "Practices",
    title: "Four practices, one delivery team",
    sub: "We go deep in four areas rather than wide across twenty. Each one is led personally by the principal and staffed with specialists as the work demands.",
    details: "Details",
  },

  industries: {
    eyebrow: "Industries",
    title: "Domain expertise",
    sub: "Deep understanding of your industry's regulatory, operational, and technical requirements.",
  },

  approach: {
    eyebrow: "Approach",
    title: "Strategy to production in 90 days",
    sub: "A proven process refined across enterprise deployments. We implement, not just advise.",
    deliverable: "Deliverable",
    step: "Go to step",
    previous: "Previous",
    next: "Next",
  },

  objections: {
    eyebrow: "Straight answers",
    title: "Questions worth asking first.",
    sub: "The ones we get asked most, answered plainly — including where the honest answer is that you should wait.",
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
    message: "Message",
    messagePlaceholder: "Tell us about your project...",
    send: "Send message",
    sending: "Sending...",
    success:
      "Thank you for your message. We will come back to you shortly.",
    error: "Something went wrong. Please try again, or email us directly.",
  },

  stickyCta: {
    line: "Thirty minutes on your process, and a clear view of what to build first.",
    action: "Let's talk",
  },

  footer: {
    location: "Singapore",
    rights: "StarTech Innovation Pte. Ltd.",
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
