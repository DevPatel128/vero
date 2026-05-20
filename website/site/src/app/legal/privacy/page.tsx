import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy notice",
  description:
    "How Vero (a VROE Labs product) collects, uses, and protects personal data. India's DPDP Act 2023. Region-aware updates added as we expand.",
  alternates: { canonical: "/legal/privacy" },
};

const lastUpdated = "19 May 2026";

export default function Page() {
  return (
    <>
      <h1 className="font-display text-4xl font-medium tracking-tighter text-ink-900">
        Privacy notice
      </h1>
      <p className="mt-2 text-sm text-ink-500">Last updated: {lastUpdated}</p>

      <p>
        This notice explains how {site.parent} (“we”) collects, uses, and
        protects personal data through the {site.name} pre-launch website and
        waitlist. We treat privacy as a serious responsibility, not a checkbox.
      </p>

      <h2>1. Who we are</h2>
      <p>
        {site.parent}. India. We can be reached at{" "}
        <a href={`mailto:${site.contact.general}`}>{site.contact.general}</a>.
        Our statutory grievance contact for Indian users is on the{" "}
        <a href="/legal/grievance">grievance officer</a> page.
      </p>

      <h2>2. The data we collect on this website</h2>
      <ul>
        <li>
          <strong>Waitlist sign-ups.</strong> Email address (required) and the
          optional fields you fill in (name, city, intended use case, how you
          heard about us, referral code).
        </li>
        <li>
          <strong>Investor requests.</strong> Name, work email, firm, role, and
          any short note you provide.
        </li>
        <li>
          <strong>Server logs.</strong> Standard logs (IP, user-agent, timestamp)
          retained for up to 30 days for security and abuse prevention.
        </li>
        <li>
          <strong>Cookies.</strong> Strictly-necessary cookies only on this
          pre-launch site (session, CSRF). We do not run advertising trackers.
        </li>
      </ul>

      <h2>3. Why we use it</h2>
      <ul>
        <li>To send your waitlist confirmation and launch updates.</li>
        <li>To move you up the queue when you refer others.</li>
        <li>
          To respond to investor inquiries with appropriate materials.
        </li>
        <li>To keep the service secure and prevent abuse.</li>
        <li>
          To comply with applicable law — primarily India’s{" "}
          <strong>Digital Personal Data Protection Act 2023 (DPDP)</strong>.
        </li>
      </ul>

      <h2>4. Lawful basis</h2>
      <p>
        Under the DPDP Act, we rely on your <em>consent</em> (the checkbox you
        ticked at sign-up) for waitlist communications, and on{" "}
        <em>legitimate use</em> for security logging. You may withdraw consent
        at any time using the unsubscribe link or by writing to us.
      </p>

      <h2>5. How long we keep it</h2>
      <ul>
        <li>Waitlist email: until you unsubscribe or until launch + 1 year.</li>
        <li>Investor request: 2 years from last contact.</li>
        <li>Server logs: up to 30 days.</li>
      </ul>

      <h2>6. Your rights</h2>
      <p>You can ask us to:</p>
      <ul>
        <li>Confirm what data we hold about you.</li>
        <li>Correct it if it is wrong.</li>
        <li>Delete it (we retain anonymised counts only).</li>
        <li>Withdraw consent.</li>
        <li>Nominate someone to act on your behalf in the event of incapacity.</li>
      </ul>
      <p>
        Write to <a href={`mailto:${site.contact.general}`}>{site.contact.general}</a>{" "}
        or to our <a href="/legal/grievance">grievance officer</a>. We respond
        within 15 days under the DPDP Act.
      </p>

      <h2>7. Who we share it with</h2>
      <ul>
        <li>
          <strong>Email delivery provider.</strong> We use a reputable
          transactional email provider to deliver confirmations and updates.
          They process the email address on our behalf and do not use it for
          their own purposes.
        </li>
        <li>
          <strong>Hosting + analytics.</strong> Standard infrastructure
          providers (server hosting, error monitoring). PII is minimised before
          it reaches these systems.
        </li>
        <li>
          We do <strong>not</strong> sell personal data, ever.
        </li>
      </ul>
      <p>
        A full sub-processor list will be published before public launch and
        updated within thirty days of any change.
      </p>

      <h2>8. International transfers</h2>
      <p>
        Some of our infrastructure providers operate outside India. Where
        cross-border transfers occur, we rely on standard contractual
        safeguards and the Central Government’s rules under Section 16 of the
        DPDP Act. We will publish a region-aware notice (e.g., for EU/UK users)
        before opening any region outside India.
      </p>

      <h2>9. Security</h2>
      <p>
        We encrypt data in transit (TLS 1.3) and at rest. Access to user data
        is restricted to a small number of people who need it to do their job.
        See the <a href="/security">security page</a> for our overall posture.
      </p>

      <h2>10. Children</h2>
      <p>
        Vero is not intended for users under 18. The waitlist requires you to
        be of working age in your jurisdiction. We do not knowingly collect
        data from children.
      </p>

      <h2>11. Changes to this notice</h2>
      <p>
        We update this notice as we expand or as the law changes. Material
        updates will be emailed to waitlist subscribers. The date at the top
        always reflects the current version.
      </p>

      <h2>12. Contact</h2>
      <p>
        Privacy enquiries:{" "}
        <a href={`mailto:${site.contact.general}`}>{site.contact.general}</a>.
        Grievance officer (India): see the{" "}
        <a href="/legal/grievance">grievance officer page</a>.
      </p>
    </>
  );
}
