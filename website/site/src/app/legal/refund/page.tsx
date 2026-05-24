import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Refund policy",
  description:
    "Vero's refund policy. Workers pay nothing. Businesses get a clear refund window on subscriptions.",
  alternates: { canonical: "/legal/refund" },
};

const lastUpdated = "19 May 2026";

export default function Page() {
  return (
    <>
      <h1 className="font-display text-4xl font-medium tracking-tighter text-ink-900">
        Refund policy
      </h1>
      <p className="mt-2 text-sm text-ink-500">Last updated: {lastUpdated}</p>

      <p>
        This page describes the refund commitments we will operate from launch
        ({site.launchWindow}). We publish them now so they are visible before
        anyone pays anything.
      </p>

      <h2>Workers</h2>
      <p>
        Workers do not pay {site.name} anything. There is therefore nothing to
        refund. If you ever see a {site.name} fee appear on a worker statement,
        write to <a href={`mailto:${site.contact.support}`}>{site.contact.support}</a>{" "}
        immediately.
      </p>

      <h2>Business subscriptions</h2>
      <ul>
        <li>
          <strong>Monthly plans.</strong> You may cancel at any time. Your
          subscription stays active until the end of the current billing
          period. We do not pro-rate a partial month on monthly plans.
        </li>
        <li>
          <strong>Annual plans.</strong> A full refund (minus any escrow fees
          actually used) is available within the first 30 days of the annual
          term. After 30 days, the annual plan is non-refundable but you can
          cancel auto-renewal at any time.
        </li>
        <li>
          <strong>Pro-rated upgrades.</strong> Upgrades within a plan are
          pro-rated to the day. Downgrades take effect at the next billing
          cycle.
        </li>
      </ul>

      <h2>Escrow fees</h2>
      <p>
        The 5% escrow fee applies only when paid work has been delivered and
        the client has released the funds. If a job is cancelled before the
        worker has been engaged, no escrow fee is taken. If a dispute results
        in the client being refunded, the escrow fee is refunded with it.
      </p>

      <h2>How to request a refund</h2>
      <p>
        Write to <a href={`mailto:${site.contact.support}`}>{site.contact.support}</a>{" "}
        from the email on the account, with the invoice number. We respond
        within five business days, and process eligible refunds within ten
        business days via the original payment method.
      </p>

      <h2>Tax</h2>
      <p>
        GST is reversed on refunds in line with Indian tax rules. Refund
        amounts on tax-inclusive invoices include the GST component.
      </p>

      <h2>Disputes</h2>
      <p>
        If you disagree with a refund decision, you can escalate to our{" "}
        <a href="/legal/grievance">grievance officer</a>. We respond within 15
        days, as required.
      </p>
    </>
  );
}
