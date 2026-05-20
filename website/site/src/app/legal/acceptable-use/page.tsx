import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Acceptable use",
  description:
    "What is and is not acceptable on Vero — for the pre-launch website and the product at launch.",
  alternates: { canonical: "/legal/acceptable-use" },
};

const lastUpdated = "19 May 2026";

export default function Page() {
  return (
    <>
      <h1 className="font-display text-4xl font-medium tracking-tighter text-ink-900">
        Acceptable use policy
      </h1>
      <p className="mt-2 text-sm text-ink-500">Last updated: {lastUpdated}</p>

      <p>
        This policy describes what is acceptable on this pre-launch website
        and, by extension, on the {site.name} product when it opens.
      </p>

      <h2>You agree not to</h2>
      <ul>
        <li>
          Submit waitlist sign-ups using fake email addresses, automated
          scripts, or someone else’s identity.
        </li>
        <li>
          Abuse the referral system by self-referrals, throwaway accounts, or
          coordinated rings.
        </li>
        <li>
          Scrape the site at a rate or scale that affects other users. A
          reasonable rate for personal research is fine; industrial scraping is
          not.
        </li>
        <li>
          Probe security in a way that affects production users. We welcome
          responsible disclosure — see the{" "}
          <a href="/legal/responsible-disclosure">responsible disclosure</a>{" "}
          page.
        </li>
        <li>
          Use the site to harass, threaten, or impersonate anyone, including
          our team.
        </li>
        <li>
          Misrepresent {site.name}, {site.parent}, or the ALVED protocol in a
          way that could mislead the public or investors.
        </li>
      </ul>

      <h2>If you see something wrong</h2>
      <p>
        Write to <a href={`mailto:${site.contact.support}`}>{site.contact.support}</a>.
        For security issues, please use the{" "}
        <a href="/legal/responsible-disclosure">responsible disclosure</a>{" "}
        process so we can fix the issue safely.
      </p>

      <h2>Consequences</h2>
      <p>
        Accounts found in breach lose any movement gained from the referral
        system and may be permanently removed. We may also share information
        with law enforcement where required by law.
      </p>
    </>
  );
}
