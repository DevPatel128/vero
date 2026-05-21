import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Responsible disclosure",
  description:
    "Vero welcomes security reports. Email security@vero.app. Two-day acknowledgement. Thirty-day fix target for confirmed issues.",
  alternates: { canonical: "/legal/responsible-disclosure" },
};

const lastUpdated = "19 May 2026";

export default function Page() {
  return (
    <>
      <h1 className="font-display text-4xl font-medium tracking-tighter text-ink-900">
        Responsible disclosure
      </h1>
      <p className="mt-2 text-sm text-ink-500">Last updated: {lastUpdated}</p>

      <p>
        If you believe you have found a security vulnerability in {site.name}{" "}
        or the {site.parent} infrastructure, please tell us before telling
        anyone else.
      </p>

      <h2>Where to report</h2>
      <p>
        Email{" "}
        <a
          className="underline decoration-accent underline-offset-4"
          href={`mailto:${site.contact.security}`}
        >
          {site.contact.security}
        </a>
        . If your report contains sensitive details, please request our PGP key
        first; we will respond within one business day.
      </p>

      <h2>What we ask</h2>
      <ul>
        <li>
          Do not access, modify, or delete data that is not yours, beyond what
          is needed to demonstrate the issue.
        </li>
        <li>
          Do not run automated scans against production at a rate that affects
          other users.
        </li>
        <li>
          Do not publicly disclose the issue until we have had a reasonable
          chance to fix it.
        </li>
        <li>
          Comply with applicable law. India’s IT Act 2000 and CERT-In
          directions apply here.
        </li>
      </ul>

      <h2>What we will do</h2>
      <ul>
        <li>Acknowledge your report within two business days.</li>
        <li>Investigate and let you know if we accept the finding.</li>
        <li>
          Aim to ship a fix or mitigation within thirty days for confirmed
          issues. Critical issues are prioritised same-day.
        </li>
        <li>
          Recognise your contribution in a Hall of Fame once the product is
          public (with your consent).
        </li>
      </ul>

      <h2>Scope</h2>
      <p>
        In scope: the {site.name} pre-launch website ({site.url}) and its APIs.
        Out of scope: third-party services that we use (please report to them
        directly), social-engineering tests against our team, denial-of-service
        attacks, and reports about missing security headers without practical
        impact.
      </p>

      <h2>Bug bounty</h2>
      <p>
        We do not yet run a paid bounty program. We plan to set one up after
        public launch via an established platform. Meaningful private reports
        in the interim will be credited and may receive a thoughtful gift at
        our discretion.
      </p>

      <h2>Thank you</h2>
      <p>
        We appreciate every honest report. Security is a community discipline,
        and we treat it that way.
      </p>
    </>
  );
}

