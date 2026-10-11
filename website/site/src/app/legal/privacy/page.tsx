import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy notice",
  description:
    "How Vero (a VROE Labs product) collects, uses, and protects personal data. India's DPDP Act 2023. Region-aware updates added as we expand.",
  alternates: { canonical: "/legal/privacy" },
};

const lastUpdated = "11 October 2026";

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
        {site.parent}, India, a trading name of Dev Patel (not yet a
        registered company). We can be reached at{" "}
        <a href={`mailto:${site.contact.general}`}>{site.contact.general}</a>.
        Our statutory grievance contact for Indian users is on the{" "}
        <a href="/legal/grievance">grievance officer</a> page.
      </p>

      <h2>2. The data we collect on this website</h2>
      <ul>
        <li>
          <strong>Waitlist sign-ups.</strong> Email address and whether you are
          joining as a worker or a business (required), and the optional fields
          you fill in (name, city, intended use case, how you heard about us,
          referral code). We also store your queue position, your referral
          code, how many people you referred, when you joined, and a private
          link token for your personal waitlist page.
        </li>
        <li>
          <strong>Investor requests.</strong> Name, work email, firm, role,
          stage, and any short note you provide. This website does not store
          them: the request is emailed to our inbox, and a confirmation is
          emailed to you.
        </li>
        <li>
          <strong>Server logs.</strong> Our host, Cloudflare, records standard
          request logs (IP address, user agent, time) for security and
          debugging. They are kept for Cloudflare’s standard log retention
          period; we do not copy them elsewhere.
        </li>
        <li>
          <strong>Rate-limit counters.</strong> To stop abuse, we count form
          submissions per IP address and, for investor requests, per email
          address. These counters are deleted automatically about two days
          after they expire.
        </li>
        <li>
          <strong>Cookies.</strong> This site sets no cookies. Your light or
          dark theme choice is saved in your browser’s local storage, and an
          email you type into a short sign-up box is held in session storage
          only until the full waitlist form reads it. Neither is sent to us. We
          do not run analytics or advertising trackers. See the{" "}
          <a href="/legal/cookies">cookie notice</a>.
        </li>
      </ul>

      <h2>3. Why we use it</h2>
      <ul>
        <li>
          To send your waitlist confirmation, and to tell you about launch.
        </li>
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
        at any time by writing to us. There is no unsubscribe link yet.
      </p>

      <h2>5. How long we keep it</h2>
      <ul>
        <li>
          Waitlist entry: until you ask us to delete it. There is no automatic
          deletion yet.
        </li>
        <li>
          Investor request: not stored by this website. The email in our inbox
          is kept as ordinary correspondence until it is deleted.
        </li>
        <li>Rate-limit counters: about two days after their window ends.</li>
        <li>Server logs: Cloudflare’s standard log retention period.</li>
      </ul>

      <h2>6. Your rights</h2>
      <p>You can ask us to:</p>
      <ul>
        <li>Confirm what data we hold about you.</li>
        <li>Correct it if it is wrong.</li>
        <li>Delete it.</li>
        <li>Withdraw consent.</li>
        <li>Nominate someone to act on your behalf in the event of incapacity.</li>
      </ul>
      <p>
        Write to <a href={`mailto:${site.contact.general}`}>{site.contact.general}</a>{" "}
        or to our <a href="/legal/grievance">grievance officer</a>. Requests are
        handled by hand; there is no self-serve tool yet. We respond within 15
        days under the DPDP Act.
      </p>

      <h2>7. Who we share it with</h2>
      <ul>
        <li>
          <strong>Email delivery.</strong> Resend sends the waitlist
          confirmation and the investor-request emails, when email sending is
          switched on. It receives the recipient address and the message.
        </li>
        <li>
          <strong>Hosting and database.</strong> Cloudflare hosts the site and
          stores waitlist entries and rate-limit counters in its D1 database.
          We use no analytics or error-monitoring service.
        </li>
        <li>
          We do <strong>not</strong> sell personal data, ever.
        </li>
      </ul>
      <p>
        The current list is on the{" "}
        <a href="/legal/sub-processors">sub-processors</a> page.
      </p>

      <h2>8. International transfers</h2>
      <p>
        Cloudflare and Resend are US companies, so your data may be processed
        outside India. Supplementary notices for the{" "}
        <a href="/legal/privacy/eu">EU</a>,{" "}
        <a href="/legal/privacy/in">India</a> and the{" "}
        <a href="/legal/privacy/us">US</a> are published.
      </p>

      <h2>9. Security</h2>
      <p>
        The site is served over HTTPS and tells browsers to use HTTPS only.
        Waitlist data is stored in Cloudflare D1, which Cloudflare encrypts at
        rest; access is limited to the {site.parent} Cloudflare account. Forms
        reject submissions sent from other websites and are rate-limited.
      </p>

      <h2>10. Children</h2>
      <p>
        Vero is not intended for users under 18. Our terms ask that you be of
        working age in your jurisdiction to join the waitlist; we do not check
        age at sign-up. We do not knowingly collect data from children. If you
        think a child has signed up, write to us and we will delete the entry.
      </p>

      <h2>11. Changes to this notice</h2>
      <p>
        We update this notice as we expand or as the law changes. Changes are
        posted on this page, and the date at the top always reflects the
        current version.
      </p>

      <h2>12. Contact</h2>
      <p>
        Privacy enquiries:{" "}
        <a href={`mailto:${site.contact.general}`}>{site.contact.general}</a>.
        Grievance officer (India): see the{" "}
        <a href="/legal/grievance">grievance officer page</a>.
      </p>

      <p className="mt-10 text-sm text-ink-500">{site.legal.status}</p>
    </>
  );
}
