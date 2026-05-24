import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "India privacy notice",
  description:
    "India-specific Vero privacy notice under the Digital Personal Data Protection Act, 2023.",
  alternates: { canonical: "/legal/privacy/in" },
};

export default function Page() {
  return (
    <div className="max-w-prose">
      <h1 className="font-display text-4xl font-medium tracking-tighter text-ink-900">
        India privacy notice
      </h1>
      <p>
        This India notice supplements the main privacy notice for users in India.
        VROE Labs is the Data Fiduciary for Vero waitlist and launch data.
      </p>
      <h2>Law</h2>
      <p>Digital Personal Data Protection Act, 2023 and applicable IT Rules.</p>
      <h2>Purpose</h2>
      <p>
        We use waitlist data to manage launch access, send updates you requested,
        prevent abuse, and answer support or grievance requests.
      </p>
      <h2>Your rights</h2>
      <p>
        You may request access, correction, erasure, grievance review, or consent
        withdrawal by emailing{" "}
        <a href={`mailto:${site.contact.grievance}`}>{site.contact.grievance}</a>.
      </p>
      <h2>Grievance</h2>
      <p>
        See the grievance page for the current contact channel and response target.
      </p>
    </div>
  );
}
