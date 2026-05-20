import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The agreement between you and Trove.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <article className="container-prose py-16 md:py-20 prose prose-stone max-w-none prose-headings:font-serif">
      <p className="eyebrow">Legal</p>
      <h1 className="display-serif text-display-md mt-2">Terms of Service</h1>
      <p className="text-sm text-muted-foreground">Effective: 2026-05-14</p>

      <h2>1. Acceptance</h2>
      <p>By using Trove you agree to these terms. If you don't, please don't use the service.</p>

      <h2>2. What Trove is</h2>
      <p>Trove is a software service that helps you view and analyze your financial information. Trove is <strong>not</strong> a bank, broker-dealer, investment advisor, lender, or money transmitter. Nothing in Trove constitutes financial advice.</p>

      <h2>3. Your account</h2>
      <p>You're responsible for safeguarding your credentials. Notify us promptly at security@trove.vroelabs.com if you suspect unauthorized access.</p>

      <h2>4. Acceptable use</h2>
      <p>Don't: reverse-engineer the service, scrape data not belonging to you, attempt to disrupt the service, or use Trove for illegal activity.</p>

      <h2>5. Payment</h2>
      <p>Paid plans bill in advance. You can cancel anytime. Refunds available within 7 days of an annual subscription payment.</p>

      <h2>6. Termination</h2>
      <p>You can delete your account at any time. We may suspend accounts that violate these terms, with notice where reasonable.</p>

      <h2>7. Disclaimer of warranties</h2>
      <p>Trove is provided "as is" without warranty of any kind. We don't guarantee uptime, accuracy of categorization, or that AI insights will be correct.</p>

      <h2>8. Limitation of liability</h2>
      <p>To the maximum extent permitted by law, Vroe Labs' total liability is limited to fees you paid in the 12 months before the event giving rise to liability.</p>

      <h2>9. Governing law</h2>
      <p>These terms are governed by the laws of the United States and the State of Delaware. Disputes resolved in Delaware courts.</p>

      <h2>10. Contact</h2>
      <p><a href="mailto:hello@trove.vroelabs.com">hello@trove.vroelabs.com</a></p>
    </article>
  );
}
