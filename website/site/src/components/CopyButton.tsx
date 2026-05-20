"use client";

import { useState } from "react";

export function CopyButton({
  text,
  label = "Copy",
}: {
  text: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: select text in a temp input
      const el = document.createElement("input");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      } catch {
        /* ignore */
      }
      document.body.removeChild(el);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="rounded-full bg-ink-900 px-4 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent"
      aria-live="polite"
    >
      {copied ? "Copied ✓" : label}
    </button>
  );
}
