export const siteConfig = {
  name: "Trove",
  legalName: "Vroe Labs",
  tagline: "Your financial operating system.",
  description:
    "Trove is the AI-powered financial operating system for Gen Z professionals, founders, and freelancers. Unify accounts, track subscriptions, get intelligent insights — and finally understand your money.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "https://trove.vroelabs.com",
  ogImage: "/og-image.png",
  email: "hello@trove.vroelabs.com",
  supportEmail: "support@trove.vroelabs.com",
  founder: "Dev Patel",
  twitter: "@trovehq",
  github: "DevPatel128/Trove",
  location: "Remote · Worldwide",
  primaryCta: "Start tracking your money smarter",
  keywords: [
    "personal finance",
    "financial operating system",
    "subscription tracker",
    "spending analytics",
    "AI financial insights",
    "fintech SaaS",
    "budget app",
    "money dashboard",
  ],
  social: {
    twitter: "https://twitter.com/trovehq",
    linkedin: "https://linkedin.com/company/vroelabs",
    github: "https://github.com/DevPatel128/Trove",
    producthunt: "https://producthunt.com/products/trove",
  },
  legal: {
    company: "Vroe Labs",
    address: "Remote",
    dpo: "devpatel1286@gmail.com",
    jurisdiction: "United States",
  },
  pricing: {
    free: { name: "Free", price: 0, planId: null },
    pro: { name: "Pro", priceMonthly: 9, priceYearly: 84, planId: { month: "RAZORPAY_PLAN_ID_PRO_MONTHLY", year: "RAZORPAY_PLAN_ID_PRO_YEARLY" } },
    team: { name: "Team", priceMonthly: 24, priceYearly: 240, planId: { month: "RAZORPAY_PLAN_ID_TEAM_MONTHLY", year: "RAZORPAY_PLAN_ID_TEAM_YEARLY" } },
  },
} as const;

export type SiteConfig = typeof siteConfig;

export const marketingNav = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Integrations", href: "/integrations" },
  { label: "Customers", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Docs", href: "/docs" },
] as const;

export const footerNav = {
  product: [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Integrations", href: "/integrations" },
    { label: "Changelog", href: "/changelog" },
    { label: "Security", href: "/security" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Customers", href: "/case-studies" },
    { label: "Contact", href: "/contact" },
  ],
  resources: [
    { label: "Blog", href: "/blog" },
    { label: "Docs", href: "/docs" },
    { label: "Support", href: "/support" },
    { label: "API", href: "/docs/api" },
  ],
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Cookies", href: "/cookies" },
    { label: "Accessibility", href: "/accessibility" },
  ],
} as const;

export const appNav = [
  { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "Transactions", href: "/transactions", icon: "ArrowLeftRight" },
  { label: "Analytics", href: "/analytics", icon: "TrendingUp" },
  { label: "Subscriptions", href: "/subscriptions", icon: "Repeat" },
  { label: "Budgets", href: "/budgets", icon: "PiggyBank" },
  { label: "Goals", href: "/goals", icon: "Target" },
  { label: "Reports", href: "/reports", icon: "FileBarChart" },
] as const;
