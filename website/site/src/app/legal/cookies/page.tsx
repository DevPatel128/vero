import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookie notice",
  description:
    "Cookies and similar technologies used by the Vero pre-launch website.",
  alternates: { canonical: "/legal/cookies" },
};

const lastUpdated = "19 May 2026";

export default function Page() {
  return (
    <>
      <h1 className="font-display text-4xl font-medium tracking-tighter text-ink-900">
        Cookie notice
      </h1>
      <p className="mt-2 text-sm text-ink-500">Last updated: {lastUpdated}</p>

      <p>
        This pre-launch website uses a minimal set of strictly-necessary
        cookies. We do not run advertising trackers and we do not embed
        third-party analytics tags on the marketing site.
      </p>

      <h2>1. Strictly-necessary cookies</h2>
      <table className="text-sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Purpose</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>__session</td>
            <td>Keeps you signed in to your personal waitlist page.</td>
            <td>Session</td>
          </tr>
          <tr>
            <td>__csrf</td>
            <td>Protects against cross-site request forgery on form submits.</td>
            <td>Session</td>
          </tr>
          <tr>
            <td>__pref-region</td>
            <td>Remembers your region for pricing display.</td>
            <td>180 days</td>
          </tr>
        </tbody>
      </table>

      <h2>2. Analytics</h2>
      <p>
        We use privacy-light, aggregate analytics for the marketing site to
        understand page-level performance. No personal identifiers, no
        cross-site tracking, no advertising IDs. We honour the Global Privacy
        Control (GPC) header — if your browser sends it, we suppress analytics
        for your session.
      </p>

      <h2>3. Third-party content</h2>
      <p>
        We do not embed third-party widgets, social-media trackers, or
        advertising pixels on this site. Outbound links to platforms like X,
        LinkedIn, YouTube, or WhatsApp are loaded only when you click them.
      </p>

      <h2>4. Your controls</h2>
      <p>
        You can clear cookies at any time from your browser settings. Clearing
        them will sign you out of your personal waitlist page; your queue
        position is not affected.
      </p>

      <h2>5. Contact</h2>
      <p>
        Questions about cookies:{" "}
        <a href={`mailto:${site.contact.general}`}>{site.contact.general}</a>.
      </p>
    </>
  );
}

