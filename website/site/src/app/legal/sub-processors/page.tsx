import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sub-processors",
  description:
    "The third-party vendors that process data on Vero's behalf today, what they do, and what data they handle.",
  alternates: { canonical: "/legal/sub-processors" },
};

const processors = [
  {
    name: "Cloudflare, Inc.",
    purpose: "Website hosting and delivery (Workers), and the D1 database that stores waitlist entries and rate-limit counters.",
    data: "Request metadata such as IP address and user agent; waitlist sign-ups: email address, role, and the optional name, city, use case, how you heard about us, and referral code; and rate-limit counters keyed by IP address or, for investor requests, email address.",
  },
  {
    name: "Resend, Inc.",
    purpose: "Transactional email delivery for waitlist confirmations and investor requests, when email sending is switched on.",
    data: "Recipient email address and the message content: the waitlist confirmation (with your personal waitlist link), or the investor request details and its confirmation.",
  },
];

export default function Page() {
  return (
    <div className="max-w-prose">
      <h1 className="font-display text-4xl font-medium tracking-tighter text-ink-900">
        Sub-processors
      </h1>
      <p>
        Vero is pre-launch. The only personal data we collect today comes from
        the waitlist and investor enquiry forms. These vendors process it on our
        behalf.
      </p>
      <h2>Current sub-processors</h2>
      <ul>
        {processors.map((p) => (
          <li key={p.name}>
            <strong>{p.name}</strong>. {p.purpose} <em>Data:</em> {p.data}
          </li>
        ))}
      </ul>
      <p>
        Both are US companies, so data may be processed outside your country.
        We have no separate transfer agreement with either provider yet. We use
        no analytics or error-monitoring service.
      </p>
      <h2>Update commitment</h2>
      <p>
        Material changes will be posted here before they take effect where law or
        contract requires advance notice.
      </p>
    </div>
  );
}
