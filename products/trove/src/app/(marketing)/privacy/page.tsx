import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Trove collects, uses, stores, and deletes your information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <article className="container-prose py-16 md:py-20 prose prose-stone max-w-none prose-headings:font-serif">
      <p className="eyebrow">Legal</p>
      <h1 className="display-serif text-display-md mt-2">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground">Effective: 2026-05-14 · Last updated: 2026-05-15</p>

      <h2>1. Who we are</h2>
      <p>Trove (the "Service") is operated by Vroe Labs ("we", "us"). Contact: <a href="mailto:hello@trove.vroelabs.com">hello@trove.vroelabs.com</a>.</p>

      <h2>2. What we collect</h2>
      <ul>
        <li><strong>Account data</strong> — email, name, profile photo.</li>
        <li><strong>Financial data</strong> — account balances, transaction history, categorization. Read-only via Plaid where you've connected accounts, or as you've imported.</li>
        <li><strong>Usage data</strong> — pages visited, features used, error reports. Via PostHog and Sentry.</li>
        <li><strong>Device data</strong> — browser, OS, screen size, IP (anonymized after 30 days).</li>
      </ul>

      <h2>3. Why we collect it</h2>
      <ul>
        <li>To run the product you signed up for.</li>
        <li>To generate insights and analytics on your behalf.</li>
        <li>To detect abuse, fraud, or security incidents.</li>
        <li>To improve the product (aggregated, never identifiable).</li>
      </ul>

      <h2>4. What we never do</h2>
      <ul>
        <li>We never sell your data.</li>
        <li>We never share your data with advertisers.</li>
        <li>We never train models on your personal financial data.</li>
        <li>We never move money on your behalf.</li>
      </ul>

      <h2>5. How long we keep it</h2>
      <p>While your account is active, plus 30 days after deletion. Backups roll off in 90 days.</p>

      <h2>6. Sub-processors</h2>
      <ul>
        <li><strong>Supabase</strong> — PostgreSQL + auth hosting (US/EU).</li>
        <li><strong>Vercel</strong> — application hosting.</li>
        <li><strong>Stripe</strong> — billing.</li>
        <li><strong>Resend</strong> — transactional email.</li>
        <li><strong>PostHog</strong> — product analytics (PII-masked).</li>
        <li><strong>Sentry</strong> — error tracking.</li>
        <li><strong>Plaid</strong> — bank connectivity (when you opt in).</li>
        <li><strong>Google Gemini</strong> — AI inference (no training on your data).</li>
      </ul>

      <h2>7. Your rights</h2>
      <p>Under GDPR and CCPA you have the right to: access, correction, deletion, portability, and objection. Email us at <a href="mailto:hello@trove.vroelabs.com">hello@trove.vroelabs.com</a> or use the in-app controls at <a href="/settings">/settings</a>.</p>

      <h2>8. Cookies</h2>
      <p>We use essential cookies for authentication and session state, and optional analytics cookies you can disable at any time.</p>

      <h2>9. Children</h2>
      <p>Trove is not directed at children under 13. We do not knowingly collect data from minors.</p>

      <h2>10. Changes</h2>
      <p>If we make material changes, we'll notify you by email and post the updated date above.</p>
    </article>
  );
}
