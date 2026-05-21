import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of use",
  description:
    "Terms governing your use of the Vero pre-launch website and waitlist.",
  alternates: { canonical: "/legal/terms" },
};

const lastUpdated = "19 May 2026";

export default function Page() {
  return (
    <>
      <h1 className="font-display text-4xl font-medium tracking-tighter text-ink-900">
        Terms of use
      </h1>
      <p className="mt-2 text-sm text-ink-500">Last updated: {lastUpdated}</p>

      <p>
        These terms govern your use of this pre-launch website and the {site.name}{" "}
        waitlist (the “Site”). The Site is operated by {site.parent}.
      </p>

      <h2>1. What this is</h2>
      <p>
        The Site is a pre-launch information surface. It allows you to read
        about {site.name}, join the waitlist, and request investor materials.
        It is not the {site.name} product. The product opens in {site.launchCity} in{" "}
        {site.launchWindow} and will be governed by its own terms at that time.
      </p>

      <h2>2. Eligibility</h2>
      <p>
        You must be of working age in your jurisdiction to join the waitlist.
        You agree that the information you provide is accurate and that you are
        the owner of the email address you submit.
      </p>

      <h2>3. Acceptable use</h2>
      <p>
        You agree not to abuse the Site. The full acceptable-use policy is on
        the <a href="/legal/acceptable-use">acceptable use page</a>. In short:
        no scraping at scale, no automated sign-ups, no harassment, no abuse of
        the referral system.
      </p>

      <h2>4. Waitlist + referrals</h2>
      <p>
        Your position is real and reflects the order you joined relative to
        others. We do not move positions to favour individuals. The referral
        system is honest: each genuine new sign-up via your link moves you up a
        fixed number of spots, capped publicly. Accounts that abuse the
        referral system lose any movement gained.
      </p>

      <h2>5. Pre-launch claims</h2>
      <p>
        We are pre-launch. Anything we describe about the product is intended
        to reflect the version planned for {site.launchWindow}. Specific features,
        pricing, and timing may change as we build. Material changes will be
        emailed to waitlist subscribers.
      </p>

      <h2>6. Intellectual property</h2>
      <p>
        The Site’s copy, design, and code are owned by {site.parent}. You may
        link to public pages, quote short passages with attribution, and use
        material on the press page freely. Do not republish the Site in full or
        present it as your own.
      </p>

      <h2>7. Disclaimer</h2>
      <p>
        The Site is provided “as is.” We do our best to keep it accurate and
        available, but we do not warrant that it will be uninterrupted or
        error-free. We will not be liable for indirect or consequential losses
        arising from your use of the Site.
      </p>

      <h2>8. Termination</h2>
      <p>
        We can remove a waitlist entry that is fraudulent, abusive, or in
        breach of these terms. You can unsubscribe at any time using the link
        in any email we send you.
      </p>

      <h2>9. Governing law</h2>
      <p>
        These terms are governed by the laws of India. Disputes will be heard
        in the courts of Bengaluru, Karnataka.
      </p>

      <h2>10. Changes</h2>
      <p>
        We will update these terms when needed. The date at the top always
        reflects the current version. Material changes will be emailed to
        waitlist subscribers.
      </p>

      <h2>11. Contact</h2>
      <p>
        Write to <a href={`mailto:${site.contact.general}`}>{site.contact.general}</a>.
      </p>
    </>
  );
}

