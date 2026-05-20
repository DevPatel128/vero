import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "What cookies Trove uses, why, and how to control them.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <article className="container-prose py-16 md:py-20 prose prose-stone max-w-none prose-headings:font-serif">
      <p className="eyebrow">Legal</p>
      <h1 className="display-serif text-display-md mt-2">Cookie Policy</h1>
      <p className="text-sm text-muted-foreground">Effective: 2026-05-14</p>

      <h2>What is a cookie?</h2>
      <p>A small piece of data stored in your browser to remember preferences and sessions.</p>

      <h2>Cookies we use</h2>
      <table>
        <thead><tr><th>Cookie</th><th>Purpose</th><th>Duration</th></tr></thead>
        <tbody>
          <tr><td><code>sb-access-token</code></td><td>Auth session</td><td>1 hour</td></tr>
          <tr><td><code>sb-refresh-token</code></td><td>Token refresh</td><td>30 days</td></tr>
          <tr><td><code>trove-theme</code></td><td>Dark/light preference</td><td>1 year</td></tr>
          <tr><td><code>ph_*</code></td><td>PostHog analytics (optional)</td><td>1 year</td></tr>
        </tbody>
      </table>

      <h2>Managing cookies</h2>
      <p>Disable optional cookies at <a href="/settings">/settings</a> → Privacy. Essential cookies cannot be disabled without breaking the service.</p>
    </article>
  );
}
