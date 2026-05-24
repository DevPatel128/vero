import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "EU privacy notice",
  description:
    "EU and EEA privacy notice for Vero under GDPR and ePrivacy rules.",
  alternates: { canonical: "/legal/privacy/eu" },
};

export default function Page() {
  return (
    <div className="max-w-prose">
      <h1 className="font-display text-4xl font-medium tracking-tighter text-ink-900">
        EU privacy notice
      </h1>
      <p>
        This notice supplements the main privacy notice for people in the EU or EEA.
      </p>
      <h2>Legal bases</h2>
      <p>
        Waitlist email is processed on consent. Security logs and abuse prevention are
        processed on legitimate interests, balanced against user rights.
      </p>
      <h2>Your GDPR rights</h2>
      <p>
        You may request access, rectification, erasure, restriction, portability,
        objection, or consent withdrawal by emailing{" "}
        <a href={`mailto:${site.contact.support}`}>{site.contact.support}</a>.
      </p>
      <h2>Transfers</h2>
      <p>
        Cross-border transfers will use adequacy decisions or Standard Contractual
        Clauses with supplementary safeguards where required.
      </p>
    </div>
  );
}
