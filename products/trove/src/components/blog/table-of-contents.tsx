"use client";

import * as React from "react";

interface Heading { id: string; text: string; level: number }

export function TableOfContents() {
  const [headings, setHeadings] = React.useState<Heading[]>([]);
  const [active, setActive] = React.useState<string>("");

  React.useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("article h2, article h3"));
    setHeadings(nodes.map((n) => ({ id: n.id, text: n.textContent ?? "", level: Number(n.tagName.slice(1)) })));

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting && e.target.id) setActive(e.target.id); });
    }, { rootMargin: "-25% 0px -65% 0px" });
    nodes.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents">
      <p className="eyebrow mb-4">On this page</p>
      <ul className="space-y-2 border-l border-border pl-4 text-sm">
        {headings.map((h) => (
          <li key={h.id} style={{ paddingLeft: (h.level - 2) * 12 }}>
            <a
              href={`#${h.id}`}
              className={`block transition-colors ${active === h.id ? "text-trove-ink font-medium" : "text-muted-foreground hover:text-trove-ink"}`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
