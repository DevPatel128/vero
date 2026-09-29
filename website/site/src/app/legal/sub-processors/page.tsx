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
    data: "Request metadata such as IP address and user agent, and waitlist sign-ups: email address, name, role, city, optional free-text note, and referral information.",
  },
  {
    name: "Resend, Inc.",
    purpose: "Transactional email delivery for waitlist confirmations and investor enquiries.",
    data: "Recipient email address and the message content of the confirmation or reply.",
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
        Vendor country and cross-border transfer details will be added here once
        confirmed with each provider.
      </p>
      <h2>Update commitment</h2>
      <p>
        Material changes will be posted here before they take effect where law or
        contract requires advance notice.
      </p>
    </div>
  );
}
