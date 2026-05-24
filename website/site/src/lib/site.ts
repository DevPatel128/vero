export const site = {
  name: "VERO",
  parent: "VROE Labs",
  protocol: "ALVED",
  tagline: "Proof-of-work infrastructure for the next workforce.",
  description:
    "VERO Freelance is a verified proof-of-work freelance and apprenticeship network. Operators build a portable execution record. Clients hire by proof, not presentation.",
  shortDescription: "LinkedIn shows claims. VERO shows proof.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://vero.work",
  launchStatus: "Pre-launch · early access",
  cohort: "First cohort opens Q3 2026",
  contact: {
    general: "hello@vero.work",
    press: "press@vero.work",
    investors: "investors@vroelabs.com",
    security: "security@vero.work",
    grievance: "grievance@vero.work",
    support: "support@vero.work",
  },
  social: {
    x: "https://x.com/vroelabs",
    linkedin: "https://www.linkedin.com/company/vroe-labs",
    instagram: "https://www.instagram.com/vroe.labs",
    youtube: "https://www.youtube.com/@vroelabs",
  },
  legal: {
    company: "VROE Labs",
    jurisdiction: "India · GDPR · DPDP",
  },
  // Legacy fields — kept so pre-pivot pages still compile during Phase 1
  launchCity: "Bengaluru",
  launchWindow: "Q3 2026",
  launchAreas: [
    "Whitefield",
    "HSR Layout",
    "Koramangala",
    "Sarjapur",
    "Electronic City",
  ],
} as const;

export const positioning = {
  primary: "LinkedIn shows claims. VERO shows proof.",
  alternates: [
    "Execution reveals people.",
    "Talent is common. Verified execution is rare.",
    "Work becomes identity.",
    "Proof matters more than presentation.",
  ],
  not: [
    "a Fiverr clone",
    "an Upwork clone",
    "a bidding-war marketplace",
    "a cheap gig platform",
    "a vanity portfolio network",
    "social media for freelancers",
  ],
  is: [
    "a proof-of-work economy",
    "a verified execution network",
    "a reputation infrastructure system",
    "a trust-first work marketplace",
    "a high-agency talent network",
    "an apprenticeship + freelance hybrid",
    "a credibility engine for ambitious people",
  ],
} as const;

export const paths = [
  { slug: "developers", label: "Developers" },
  { slug: "designers", label: "Designers" },
  { slug: "editors", label: "Video editors" },
  { slug: "operators", label: "Operators" },
  { slug: "creators", label: "Creators" },
  { slug: "marketing", label: "Marketing assistants" },
  { slug: "startup", label: "Startup support" },
  { slug: "ai", label: "AI workflows" },
  { slug: "research", label: "Research assistants" },
  { slug: "growth", label: "Growth operators" },
] as const;

export const nav = {
  primary: [
    { label: "How it works", href: "/#how-it-works" },
    { label: "Trust", href: "/#trust" },
    { label: "Paths", href: "/#paths" },
    { label: "Businesses", href: "/businesses" },
    { label: "Investors", href: "/investors" },
    { label: "Manifesto", href: "/manifesto" },
    { label: "Research", href: "/research" },
  ],
  // Legacy menu groups for pre-pivot pages that still mount the old IA
  menus: [
    {
      label: "Product",
      items: [
        { label: "How it works", href: "/#how-it-works", desc: "Six steps. Each one signed." },
        { label: "Trust system", href: "/#trust", desc: "Why VERO is difficult to fake." },
        { label: "Paths", href: "/#paths", desc: "Reputation ladders by category." },
        { label: "Identity", href: "/#identity", desc: "The portable execution record." },
      ],
    },
    {
      label: "Audiences",
      items: [
        { label: "For businesses", href: "/businesses", desc: "Hire from signed history." },
        { label: "For investors", href: "/investors", desc: "Infrastructure, not marketplace." },
      ],
    },
    {
      label: "Company",
      items: [
        { label: "Manifesto", href: "/manifesto", desc: "The founding argument." },
        { label: "Research", href: "/research", desc: "Essays on the new workforce." },
      ],
    },
  ],
  footer: {
    product: [
      { label: "How it works", href: "/#how-it-works" },
      { label: "Trust system", href: "/#trust" },
      { label: "Proof-of-work identity", href: "/#identity" },
      { label: "Paths", href: "/#paths" },
      { label: "AI layer", href: "/#ai" },
    ],
    audiences: [
      { label: "For operators", href: "/#apply" },
      { label: "For businesses", href: "/businesses" },
      { label: "For investors", href: "/investors" },
    ],
    company: [
      { label: "Manifesto", href: "/manifesto" },
      { label: "Research", href: "/research" },
      { label: "About VROE Labs", href: "/about" },
      { label: "Press", href: "/press" },
      { label: "Contact", href: "/contact" },
    ],
    trust: [
      { label: "Security posture", href: "/security" },
      { label: "Compliance", href: "/compliance" },
      { label: "Status", href: "/status" },
      { label: "Responsible disclosure", href: "/legal/responsible-disclosure" },
    ],
    legal: [
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
      { label: "Acceptable use", href: "/legal/acceptable-use" },
      { label: "Cookies", href: "/legal/cookies" },
      { label: "Accessibility", href: "/legal/accessibility" },
    ],
    // legacy footer columns
    resources: [
      { label: "Manifesto", href: "/manifesto" },
      { label: "Research", href: "/research" },
      { label: "Help", href: "/help" },
      { label: "Status", href: "/status" },
    ],
    ecosystem: [
      { label: "ALVED protocol", href: "/ecosystem" },
      { label: "VROE Labs", href: "/about" },
    ],
  },
};

export const sections = {
  problem: {
    eyebrow: "01 / Why the current systems fail",
    headline: "Hiring runs on claims. Claims do not survive contact with work.",
    items: [
      {
        title: "Resumes are weak proof.",
        body: "A document the candidate wrote about themselves. Cross-referenced rarely. Verified almost never.",
      },
      {
        title: "Freelance platforms reward bidding wars.",
        body: "Race to the lowest price. Race to the fastest reply. Quality of work is not the variable being optimized.",
      },
      {
        title: "Portfolios are easy to fake.",
        body: "Anyone can paste anyone else's screenshots. Provenance is not visible. Authorship is not signed.",
      },
      {
        title: "Social platforms optimize attention, not credibility.",
        body: "Followers are not coworkers. Engagement is not execution. The metric being measured is not the one that matters.",
      },
      {
        title: "Most systems cannot verify execution quality.",
        body: "Stars rate the transaction, not the work. The signal is not graded by anyone qualified to grade it.",
      },
    ],
  },
  how: {
    eyebrow: "02 / How VERO works",
    headline: "Six steps. Each one signed. Each one chained.",
    steps: [
      { n: "01", title: "Apply", body: "Selective entry. Operators and clients vetted on intent, history, and demonstrated agency." },
      { n: "02", title: "Get verified", body: "Identity, work history, and prior contributions are signed and indexed before the first project." },
      { n: "03", title: "Work on real projects", body: "Scoped briefs. Real budgets. Real deliverables. No bidding war, no race to the bottom." },
      { n: "04", title: "Build proof-of-work", body: "Each completed engagement is signed by both parties and chained to the operator's record." },
      { n: "05", title: "Compound trust", body: "Reputation accrues across categories. Repeat clients, dispute-free history, and peer endorsements compound." },
      { n: "06", title: "Unlock better opportunities", body: "Higher-trust operators access higher-trust briefs. Access is earned, not bought." },
    ],
  },
  trust: {
    eyebrow: "03 / Trust and verification",
    headline: "Execution that is difficult to fake. By design.",
    pillars: [
      { title: "Dual-sided verification", body: "Both client and operator sign every record. Neither side can mint history alone." },
      { title: "Escrow as default", body: "Funds are committed before scope begins. Release is on the record. No release, no proof." },
      { title: "Dispute resolution", body: "Three-tier system. Direct, mediated, arbitrated. Every step is logged and visible to both parties." },
      { title: "Chained record logs", body: "Each engagement references the previous. History cannot be quietly rewritten." },
      { title: "Anti-fraud surface", body: "Identity, payment, and behavioral signals are cross-checked. Repeat manipulators are removed." },
      { title: "Trust-weighted reputation", body: "Standing is computed from many signals — completion, punctuality, repeat clients, peer quality." },
    ],
  },
  identity: {
    eyebrow: "04 / Proof-of-work identity",
    headline: "Profiles you can not buy. Records you can carry.",
    facets: [
      { label: "Execution timeline", body: "Every verified engagement, in order, with both signatures and the brief that scoped it." },
      { label: "Contribution summary", body: "What was built, shipped, or operated. Linked to the artifact when permissible." },
      { label: "Reputation progression", body: "Trust score over time. Direction matters more than the number." },
      { label: "Endorsement layer", body: "Signed endorsements from prior clients. Weighted by their own standing." },
      { label: "Proof snapshots", body: "Exportable, hash-anchored credentials. Portable across platforms speaking the ALVED protocol." },
      { label: "Trust badges", body: "Categorical marks for verified specializations. Earned, not selected." },
    ],
  },
  ai: {
    eyebrow: "06 / AI in the substrate",
    headline: "AI does the verification work. It does not write the resume.",
    intent: "AI inside VERO never represents a person to a client. It indexes proof, detects fraud, and structures contribution histories so humans can decide.",
    capabilities: [
      "Workflow verification — confirms claimed deliverables match committed artifacts",
      "Matching — surfaces operators whose record fits the brief, not the keywords",
      "Fraud detection — flags signature anomalies, identity drift, and coordinated manipulation",
      "Contribution structuring — converts long engagements into auditable summaries",
      "Trust intelligence — weights signals so reputation reflects substance, not volume",
    ],
  },
  security: {
    eyebrow: "Trust + Security",
    headline: "Quiet infrastructure. Strong assumptions.",
    items: [
      "Encrypted at rest and in transit",
      "SOC 2-ready architecture",
      "GDPR + DPDP aligned",
      "Independent dispute logs",
      "Hash-anchored verification records",
      "Escrow with clearing partners",
      "Audit trail for every signature",
      "Responsible-disclosure programme",
    ],
  },
} as const;

export type WaitlistField = {
  name: string;
  label: string;
  type: "text" | "email" | "url" | "textarea";
  required: boolean;
  hint?: string;
};

export const waitlistFields: WaitlistField[] = [
  { name: "name", label: "Full name", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "linkedin", label: "LinkedIn", type: "url", required: false },
  { name: "portfolio", label: "Portfolio / GitHub / X", type: "url", required: false },
  {
    name: "building",
    label: "What are you building or doing right now?",
    type: "textarea",
    required: true,
    hint: "Two sentences. Concrete is better than abstract.",
  },
  {
    name: "why",
    label: "Why should VERO choose you?",
    type: "textarea",
    required: true,
    hint: "One paragraph. Show, don't claim.",
  },
];
