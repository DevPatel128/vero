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
    { label: "Product", href: "/product" },
    { label: "Why now", href: "/why-now" },
    { label: "For professionals", href: "/for-professionals" },
    { label: "For businesses", href: "/for-businesses" },
    { label: "Manifesto", href: "/manifesto" },
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
      { label: "For businesses", href: "/for-businesses" },
      { label: "For investors", href: "/investors" },
    ],
    company: [
      { label: "Manifesto", href: "/manifesto" },
      { label: "About VROE Labs", href: "/about" },
      { label: "Press", href: "/press" },
      { label: "Contact", href: "/contact" },
    ],
    trust: [
      { label: "Security posture", href: "/security" },
      { label: "Compliance", href: "/legal/privacy/in" },
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
    eyebrow: "01 / The problem",
    headline: "You have done good work. You just cannot prove it.",
    items: [
      {
        title: "Resumes say whatever the person wants.",
        body: "Anyone can write anything on a resume. Most hiring managers know this — yet they have no better option. The result is that good work goes unseen and bad hires keep happening.",
      },
      {
        title: "Gig platforms race to the bottom.",
        body: "Fiverr, Upwork, and their clones push everyone to bid lower and reply faster. The best person for the job rarely wins. The cheapest one does.",
      },
      {
        title: "Portfolios can be faked in an afternoon.",
        body: "Screenshots can be copied. AI can generate a convincing case study in minutes. There is no way to know if the work was really done by the person showing it.",
      },
      {
        title: "Star ratings measure satisfaction, not quality.",
        body: "A 4.8 rating means the client was happy with the price and speed — not that the work was good. They are not the same thing.",
      },
      {
        title: "Your work history disappears when you leave a platform.",
        body: "Three years of great reviews on one app count for nothing when you move to another. You start from zero, every single time.",
      },
    ],
  },
  how: {
    eyebrow: "02 / How VERO works",
    headline: "Five steps. Two signatures. One permanent record.",
    steps: [
      { n: "01", title: "Join and get verified", body: "Workers and businesses verify their identity before anything else. No anonymous accounts, no fake history." },
      { n: "02", title: "Agree on the work", body: "Both sides agree in writing on what needs to be done. For paid work, the money is held in escrow so everyone knows it is real." },
      { n: "03", title: "Do the work", body: "A plumber fixes the tap. A designer delivers the logo. A developer ships the feature. Real work, with real people." },
      { n: "04", title: "Both sides sign", body: "When the job is done, both the worker and the client confirm it. Both signatures are required — neither side can do it alone." },
      { n: "05", title: "The record is yours forever", body: "A permanent, signed record is created. It links to your previous jobs. It cannot be edited, deleted, or taken away from you." },
    ],
  },
  trust: {
    eyebrow: "03 / Why you can trust it",
    headline: "A record that is hard to fake. By design.",
    pillars: [
      { title: "Both sides must sign", body: "Every record requires a signature from the worker and the client. One side cannot create history without the other." },
      { title: "Money held in escrow", body: "For paid work, funds are committed before the job starts. The worker knows the money is real. The client knows it is safe." },
      { title: "Disputes are handled fairly", body: "If something goes wrong, there is a clear path — direct, then mediated, then reviewed. Every step is logged." },
      { title: "History cannot be rewritten", body: "Each record is linked to the one before it. Nothing can be quietly edited after the fact." },
      { title: "Fraud is actively caught", body: "Identity, payment, and behaviour signals are cross-checked continuously. Bad actors are removed." },
      { title: "Reputation has real reasons", body: "Your standing comes from show-up rate, repeat clients, completion record, and dispute history — not just one number." },
    ],
  },
  identity: {
    eyebrow: "04 / Your work record",
    headline: "A history you own. One that goes wherever you go.",
    facets: [
      { label: "Job history", body: "Every verified job you have completed, in order, with both signatures and the original brief." },
      { label: "What you built", body: "What was made, fixed, shipped, or delivered. Linked to the output when both sides agree to share it." },
      { label: "Trust over time", body: "How your standing has grown. The direction matters more than any single number." },
      { label: "Client endorsements", body: "Signed endorsements from people you have worked for. Weighted by their own track record." },
      { label: "Portable credentials", body: "Your record can be exported and shared outside Vero. It belongs to you, not the platform." },
      { label: "Verified specialisations", body: "Marks for specific skills — earned through completed work, not self-selected from a list." },
    ],
  },
  ai: {
    eyebrow: "05 / How AI helps",
    headline: "AI checks the work. It does not replace the worker.",
    intent: "AI inside VERO does one job: verify that what was claimed actually happened. It does not write profiles, manufacture reviews, or influence who gets hired.",
    capabilities: [
      "Checks that completed deliverables match what was agreed at the start",
      "Matches workers to jobs based on their actual record — not just keywords in a bio",
      "Detects fake signatures, duplicate accounts, and coordinated gaming",
      "Turns long project histories into clear, readable summaries",
      "Weighs signals so your reputation reflects real work, not just activity",
    ],
  },
  security: {
    eyebrow: "Trust + Security",
    headline: "Built to protect both sides.",
    items: [
      "All data encrypted, at rest and in transit",
      "SOC 2-ready architecture",
      "India DPDP Act 2023 compliant",
      "GDPR aligned",
      "Dispute logs kept independently",
      "Verification records are permanent",
      "Escrow through licensed clearing partners",
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
