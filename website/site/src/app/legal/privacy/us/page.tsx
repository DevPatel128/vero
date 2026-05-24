import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "US privacy notice",
  description:
    "US state privacy notice for Vero waitlist and launch communications.",
  alternates: { canonical: "/legal/privacy/us" },
};

export default function Page() {
  return (
    <div className="max-w-prose">
      <h1 className="font-display text-4xl font-medium tracking-tighter text-ink-900">
        US privacy notice
      </h1>
      <p>
        This notice supplements the main privacy notice for people in the United
        States, including state privacy laws where they apply.
      </p>
      <h2>Categories collected</h2>
      <p>
        Waitlist email, optional name, optional city, optional use case, referral
        source, and technical abuse-prevention signals.
      </p>
      <h2>Your choices</h2>
      <p>
        You can opt out of launch emails through any unsubscribe link. You can request
        access or deletion at{" "}
        <a href={`mailto:${site.contact.support}`}>{site.contact.support}</a>.
      </p>
      <h2>Sale or sharing</h2>
      <p>We do not sell waitlist data or share it for cross-context behavioural ads.</p>
    </div>
  );
}
