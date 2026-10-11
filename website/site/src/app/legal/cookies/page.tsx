import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookie notice",
  description:
    "The Vero pre-launch website sets no cookies and runs no analytics. What it keeps in your browser, and why.",
  alternates: { canonical: "/legal/cookies" },
};

const lastUpdated = "11 October 2026";

export default function Page() {
  return (
    <>
      <h1 className="font-display text-4xl font-medium tracking-tighter text-ink-900">
        Cookie notice
      </h1>
      <p className="mt-2 text-sm text-ink-500">Last updated: {lastUpdated}</p>

      <p>
        This pre-launch website sets no cookies. We do not run advertising
        trackers and we do not use analytics of any kind on the marketing site.
      </p>

      <h2>1. What we keep in your browser</h2>
      <p>
        Two small values are kept in your browser’s own storage. Neither is
        sent to us.
      </p>
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
            <td>vero-theme (local storage)</td>
            <td>Remembers whether you chose the light or dark theme.</td>
            <td>Until you clear it</td>
          </tr>
          <tr>
            <td>vero:prefill-email (session storage)</td>
            <td>
              Carries an email you typed into a short sign-up box to the full
              waitlist form, so it does not appear in the page address.
            </td>
            <td>Removed as soon as the form reads it</td>
          </tr>
        </tbody>
      </table>

      <h2>2. Analytics</h2>
      <p>
        None. The site loads no analytics, error-tracking or advertising
        scripts. Our host, Cloudflare, keeps standard request logs; see the{" "}
        <a href="/legal/privacy">privacy notice</a>.
      </p>

      <h2>3. Third-party content</h2>
      <p>
        We do not embed third-party widgets, social-media trackers, or
        advertising pixels on this site. Fonts are served from our own domain.
        Outbound links to platforms like X, LinkedIn, Instagram, YouTube, or WhatsApp are
        plain links and load nothing until you click them.
      </p>

      <h2>4. Your controls</h2>
      <p>
        You can clear site data at any time from your browser settings. Doing
        so only resets your theme choice; your waitlist position and your
        personal waitlist link are not affected.
      </p>

      <h2>5. Contact</h2>
      <p>
        Questions about cookies:{" "}
        <a href={`mailto:${site.contact.general}`}>{site.contact.general}</a>.
      </p>
    </>
  );
}
