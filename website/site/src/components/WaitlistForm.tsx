"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type FieldErrors = Partial<Record<string, string[]>>;

export function WaitlistForm({
  defaultRole = "worker",
}: {
  defaultRole?: "worker" | "business";
}) {
  const router = useRouter();
  const sp = useSearchParams();
  const refFromUrl = sp.get("ref") || "";
  const roleFromUrl = (sp.get("as") as "worker" | "business" | null) || defaultRole;

  const [role, setRole] = useState<"worker" | "business">(roleFromUrl);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [topError, setTopError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});
    setTopError(null);

    const form = e.currentTarget;
    const fd = new FormData(form);
    fd.set("role", role);
    if (refFromUrl) fd.set("referredBy", refFromUrl);
    if (!fd.get("consent")) fd.set("consent", "");

    try {
      const res = await fetch("/api/waitlist/join", {
        method: "POST",
        body: fd,
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (json?.details) setErrors(json.details);
        setTopError(
          json?.error === "invalid_input"
            ? "Please check the highlighted fields."
            : "Something went wrong. Try again in a moment.",
        );
        setSubmitting(false);
        return;
      }

      if (json?.token) {
        router.push(`/waitlist/${json.token}`);
        return;
      }

      // Honeypot or unknown — treat as silent success
      router.push("/waitlist/thanks");
    } catch {
      setTopError("Network error. Try again.");
      setSubmitting(false);
    }
  }

  const labelCls =
    "block text-xs font-medium uppercase tracking-[0.18em] text-ink-500";
  const inputCls =
    "mt-2 w-full rounded-xl border border-ink-200 bg-paper px-4 py-3 text-base text-ink-900 placeholder:text-ink-400 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      {/* Honeypot — hidden from humans */}
      <div className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website (leave blank)</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Role toggle */}
      <fieldset>
        <legend className={labelCls}>I am joining as</legend>
        <div className="mt-3 grid grid-cols-2 gap-2 rounded-full bg-paper-warm p-1">
          {(["worker", "business"] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                role === r
                  ? "bg-ink-900 text-paper shadow-card"
                  : "text-ink-600 hover:text-ink-900"
              }`}
              aria-pressed={role === r}
            >
              {r === "worker" ? "Worker" : "Business"}
            </button>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="email" className={labelCls}>
          Email <span className="text-accent">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          className={inputCls}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email?.[0] && (
          <p id="email-error" className="mt-1.5 text-xs text-red-700">
            {errors.email[0]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="name" className={labelCls}>
          Name <span className="text-ink-400">(optional)</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          className={inputCls}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="city" className={labelCls}>
            City <span className="text-ink-400">(optional)</span>
          </label>
          <input
            id="city"
            name="city"
            type="text"
            placeholder="Bengaluru"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="source" className={labelCls}>
            How did you hear about us?
          </label>
          <input
            id="source"
            name="source"
            type="text"
            placeholder="Friend, Twitter, search…"
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label htmlFor="useCase" className={labelCls}>
          {role === "worker"
            ? "What kind of work would you take on first?"
            : "What kind of role would you hire for first?"}{" "}
          <span className="text-ink-400">(optional)</span>
        </label>
        <textarea
          id="useCase"
          name="useCase"
          rows={3}
          className={inputCls}
          placeholder={
            role === "worker"
              ? "Apprenticeships, café shifts, design briefs…"
              : "Café shifts, delivery, repair, design work…"
          }
        />
      </div>

      {refFromUrl && (
        <div className="rounded-xl bg-paper-warm px-4 py-3 text-xs text-ink-600">
          Referred via code{" "}
          <span className="font-mono text-ink-900">{refFromUrl}</span>. You will
          help that person move up the list.
        </div>
      )}

      <label className="flex items-start gap-3 text-sm text-ink-600">
        <input
          type="checkbox"
          name="consent"
          value="on"
          required
          className="mt-1 h-4 w-4 rounded border-ink-300 text-accent focus:ring-accent"
        />
        <span>
          I agree to receive launch updates by email. Vero will use my email
          only for waitlist and launch communications. I can unsubscribe at any
          time. See{" "}
          <a
            href="/legal/privacy"
            className="underline decoration-accent underline-offset-4"
          >
            privacy notice
          </a>
          .
        </span>
      </label>
      {errors.consent?.[0] && (
        <p className="text-xs text-red-700">{errors.consent[0]}</p>
      )}

      {topError && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {topError}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink-900 px-6 py-3.5 text-base font-medium text-paper transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent disabled:opacity-60"
      >
        {submitting ? "Joining…" : `Join the waitlist as a ${role}`}
      </button>

      <p className="text-center text-xs text-ink-500">
        We send one confirmation email immediately. No spam. Workers are
        always free.
      </p>
    </form>
  );
}

