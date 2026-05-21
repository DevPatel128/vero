import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Grievance officer",
  description:
    "Statutory grievance contact for Indian users under the IT Rules 2021 and the DPDP Act 2023.",
  alternates: { canonical: "/legal/grievance" },
};

const lastUpdated = "19 May 2026";

export default function Page() {
  return (
    <>
      <h1 className="font-display text-4xl font-medium tracking-tighter text-ink-900">
        Grievance officer
      </h1>
      <p className="mt-2 text-sm text-ink-500">Last updated: {lastUpdated}</p>

      <p>
        Under the Information Technology (Intermediary Guidelines and Digital
        Media Ethics Code) Rules 2021, and the Digital Personal Data Protection
        Act 2023, we designate a grievance officer for Indian users.
      </p>

      <div className="not-prose mt-8 rounded-2xl border border-ink-200 bg-paper-warm p-7">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
          Grievance officer — India
        </p>
        <dl className="mt-5 grid gap-3 text-sm">
          <div className="grid grid-cols-3 gap-3">
            <dt className="text-ink-500">Name</dt>
            <dd className="col-span-2 text-ink-900">To be designated before public launch</dd>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <dt className="text-ink-500">Email</dt>
            <dd className="col-span-2 text-ink-900">
              <a
                className="underline decoration-accent underline-offset-4"
                href={`mailto:${site.contact.grievance}`}
              >
                {site.contact.grievance}
              </a>
            </dd>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <dt className="text-ink-500">Postal address</dt>
            <dd className="col-span-2 text-ink-900">
              To be published with the public launch address in {site.launchCity}.
            </dd>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <dt className="text-ink-500">Response SLA</dt>
            <dd className="col-span-2 text-ink-900">
              We acknowledge within 24 hours and resolve within 15 days, as
              required by law.
            </dd>
          </div>
        </dl>
      </div>

      <h2 className="mt-10">What you can write to us about</h2>
      <ul>
        <li>Privacy and data-protection grievances under the DPDP Act.</li>
        <li>Content or moderation grievances under the IT Rules 2021.</li>
        <li>Disagreement with a decision affecting your account or records.</li>
      </ul>

      <h2>Process</h2>
      <ol>
        <li>Email the grievance officer with a clear description and any evidence.</li>
        <li>We acknowledge within 24 hours.</li>
        <li>We investigate and reply with a decision and reasons within 15 days.</li>
        <li>
          If you remain dissatisfied, you may escalate to the relevant Indian
          regulator (the Data Protection Board of India, once constituted) or
          to the appropriate appellate authority.
        </li>
      </ol>

      <p>
        We treat grievances as serious. We will not retaliate against you for
        raising one.
      </p>
    </>
  );
}

