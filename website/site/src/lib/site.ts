export const site = {
  name: "Vero",
  parent: "VROE Labs",
  protocol: "ALVED",
  tagline: "Proof of work, not posts about work.",
  description:
    "Vero turns each job you complete into a verified record, signed by you and the person who hired you. Bengaluru-first. Launching 2027 - exact date to be announced.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://vero.app",
  launchCity: "Bengaluru",
  launchWindow: "2027",
  launchStatus: "To be announced soon · follow our socials",
  launchAreas: [
    "Whitefield",
    "HSR Layout",
    "Koramangala",
    "Sarjapur",
    "Electronic City",
  ],
  contact: {
    general: "hello@vero.app",
    press: "press@vero.app",
    investors: "investors@vroelabs.com",
    security: "security@vero.app",
    grievance: "grievance@vero.app",
    support: "support@vero.app",
  },
  social: {
    x: "https://x.com/vroelabs",
    linkedin: "https://www.linkedin.com/company/vroe-labs",
    instagram: "https://www.instagram.com/vroe.labs",
    youtube: "https://www.youtube.com/@vroelabs",
  },
  legal: {
    company: "VROE Labs",
    jurisdiction: "India",
  },
} as const;

export const nav = {
  primary: [
    { label: "Product", href: "/how-it-works" },
    { label: "Professionals", href: "/for-professionals" },
    { label: "Businesses", href: "/for-businesses" },
    { label: "Trust", href: "/trust" },
  ],
  footer: {
    product: [
      { label: "How it works", href: "/how-it-works" },
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Trust", href: "/trust" },
      { label: "Security", href: "/security" },
    ],
    company: [
      { label: "About", href: "/about" },
      { label: "Manifesto", href: "/manifesto" },
      { label: "Why now", href: "/why-now" },
      { label: "Press", href: "/press" },
      { label: "Contact", href: "/contact" },
    ],
    ecosystem: [
      { label: "The ecosystem", href: "/ecosystem" },
      { label: "VROE Labs", href: "/ecosystem" },
    ],
    legal: [
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
      { label: "Cookies", href: "/legal/cookies" },
      { label: "Refund policy", href: "/legal/refund" },
      { label: "Acceptable use", href: "/legal/acceptable-use" },
      { label: "Accessibility", href: "/legal/accessibility" },
      { label: "Grievance officer", href: "/legal/grievance" },
      { label: "Responsible disclosure", href: "/legal/responsible-disclosure" },
    ],
  },
};

