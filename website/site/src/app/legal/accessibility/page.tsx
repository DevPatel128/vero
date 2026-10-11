import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Accessibility statement",
  description:
    "Vero targets WCAG 2.2 AA. Known limitations are listed honestly. Tell us if something is hard to use.",
  alternates: { canonical: "/legal/accessibility" },
};

const lastUpdated = "11 October 2026";

export default function Page() {
  return (
    <>
      <h1 className="font-display text-4xl font-medium tracking-tighter text-ink-900">
        Accessibility statement
      </h1>
      <p className="mt-2 text-sm text-ink-500">Last updated: {lastUpdated}</p>

      <p>
        {site.parent} is committed to making {site.name} usable by everyone. We
        target conformance with the{" "}
        <a
          href="https://www.w3.org/TR/WCAG22/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Web Content Accessibility Guidelines 2.2 at level AA
        </a>{" "}
        on the marketing site and in the product when it ships.
      </p>

      <h2>What we already do</h2>
      <ul>
        <li>Semantic HTML throughout. Headings in correct order.</li>
        <li>Keyboard navigation is fully supported. Visible focus rings.</li>
        <li>Skip-to-content link on every page.</li>
        <li>
          We aim for WCAG AA colour contrast for text. Verified marks and
          statuses carry both a shape and a colour, never colour alone.
        </li>
        <li>Forms have associated labels and inline error messages.</li>
        <li>
          Reduced-motion preference is honoured. Animations are minimal and
          functional.
        </li>
        <li>Layouts are designed for small mobile screens.</li>
      </ul>

      <h2>Known limitations (honest)</h2>
      <ul>
        <li>
          The pre-launch site is English-only. Hindi, Kannada, and Tamil
          translations are planned for launch.
        </li>
        <li>
          Video assets (when added) will carry captions and a transcript. The
          current site has no embedded video yet.
        </li>
        <li>
          We have not yet completed a manual screen-reader sweep on every
          single page, and colour contrast has not yet been checked with an
          automated tool. We will list any unresolved issue here as it is
          found.
        </li>
      </ul>

      <h2>Tell us if something is hard to use</h2>
      <p>
        Write to{" "}
        <a href={`mailto:${site.contact.support}`}>{site.contact.support}</a>{" "}
        with the page, the device, and what you tried to do. Accessibility
        reports are prioritised. We aim to acknowledge within two business
        days.
      </p>
    </>
  );
}
