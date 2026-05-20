import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description: "Trove's commitment to accessible software.",
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <article className="container-prose py-16 md:py-20 prose prose-stone max-w-none prose-headings:font-serif">
      <p className="eyebrow">Legal</p>
      <h1 className="display-serif text-display-md mt-2">Accessibility Statement</h1>
      <p className="text-sm text-muted-foreground">Effective: 2026-05-14</p>

      <h2>Our commitment</h2>
      <p>Trove is committed to making our product usable by everyone, regardless of ability. We design and build to <strong>WCAG 2.2 AA</strong> and test continuously.</p>

      <h2>What we do</h2>
      <ul>
        <li>Semantic HTML and ARIA where appropriate.</li>
        <li>Keyboard navigation across the entire product surface.</li>
        <li>Color contrast verified against WCAG AA on both light and dark themes.</li>
        <li>Focus rings on every interactive element.</li>
        <li>Skip-to-content link in every page.</li>
        <li>Screen-reader announcements for dynamic updates.</li>
        <li>Reduced-motion preferences respected.</li>
        <li>Automated axe-core tests in CI.</li>
      </ul>

      <h2>Known issues</h2>
      <p>Some chart interactions are mouse-first. We are improving the keyboard story in V2.1 (Q3 2026).</p>

      <h2>Feedback</h2>
      <p>If you encounter a barrier, please email <a href="mailto:a11y@trove.vroelabs.com">a11y@trove.vroelabs.com</a>. We respond within 5 business days.</p>
    </article>
  );
}
