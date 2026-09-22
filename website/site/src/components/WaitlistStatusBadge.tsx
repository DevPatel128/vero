"use client";

import { useEffect, useState } from "react";

type Health = "checking" | "operational" | "degraded";

/**
 * Live replacement for a hard-coded "Waitlist: Operational" claim. Calls
 * GET /api/health, which reports only whether the waitlist store is
 * reachable — no user data.
 */
export function WaitlistStatusBadge() {
  const [state, setState] = useState<Health>("checking");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/health", { cache: "no-store" })
      .then((res) => {
        if (!cancelled) setState(res.ok ? "operational" : "degraded");
      })
      .catch(() => {
        if (!cancelled) setState("degraded");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const label =
    state === "checking" ? "Checking…" : state === "operational" ? "Operational" : "Degraded";
  const detail =
    state === "checking"
      ? "Checking the waitlist store."
      : state === "operational"
        ? "Sign-ups are flowing. Confirmation emails are delivering."
        : "We are aware of an issue with sign-ups. Try again shortly.";
  const dotColor = state === "degraded" ? "bg-caution" : "bg-trust";
  const textColor = state === "degraded" ? "text-caution" : "text-trust";

  return (
    <div className="rounded-2xl border border-ink-100 bg-paper p-6">
      <span className={`inline-flex items-center gap-2 text-xs font-medium ${textColor}`}>
        <span className={`h-2 w-2 rounded-full ${dotColor}`} aria-hidden />
        Waitlist: {label}
      </span>
      <p className="mt-3 text-sm text-ink-600">{detail}</p>
    </div>
  );
}
