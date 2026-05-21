"use client";

import { useState } from "react";

export function InvestorRequestForm() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [topError, setTopError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});
    setTopError(null);

    const form = e.currentTarget;
    const fd = new FormData(form);
    try {
      const res = await fetch("/api/investors/request", {
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
      setDone(true);
    } catch {
      setTopError("Network error. Try again.");
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-ink-100 bg-paper-warm p-7">
        <h3 className="font-display text-xl font-medium tracking-tightish text-ink-900">
          Thank you.
        </h3>
        <p className="mt-3 text-base leading-relaxed text-ink-700">
          We received your request. We respond to all serious requests within
          five business days. If it has been longer, please write to investors
          at the email on this page.
        </p>
      </div>
    );
  }

  const labelCls =
    "block text-xs font-medium uppercase tracking-[0.18em] text-ink-500";
  const inputCls =
    "mt-2 w-full rounded-xl border border-ink-200 bg-paper px-4 py-3 text-base text-ink-900 placeholder:text-ink-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {/* Honeypot */}
      <div className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label htmlFor="company">Company website (leave blank)</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>
            Your name *
          </label>
          <input id="name" name="name" type="text" required className={inputCls} />
          {errors.name?.[0] && (
            <p className="mt-1 text-xs text-red-700">{errors.name[0]}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>
            Work email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={inputCls}
            autoComplete="email"
          />
          {errors.email?.[0] && (
            <p className="mt-1 text-xs text-red-700">{errors.email[0]}</p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="firm" className={labelCls}>
            Firm *
          </label>
          <input id="firm" name="firm" type="text" required className={inputCls} />
        </div>
        <div>
          <label htmlFor="role" className={labelCls}>
            Role at firm
          </label>
          <input id="role" name="role" type="text" className={inputCls} />
        </div>
      </div>

      <div>
        <label htmlFor="stage" className={labelCls}>
          Stages you invest at
        </label>
        <select id="stage" name="stage" className={inputCls} defaultValue="">
          <option value="" disabled>
            Select a stage
          </option>
          <option value="pre-seed">Pre-seed</option>
          <option value="seed">Seed</option>
          <option value="series-a">Series A</option>
          <option value="multi">Multi-stage</option>
          <option value="angel">Angel</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="thesis" className={labelCls}>
          What about Vero interests you?
        </label>
        <textarea
          id="thesis"
          name="thesis"
          rows={4}
          className={inputCls}
          placeholder="One or two lines is enough."
        />
      </div>

      <label className="flex items-start gap-3 text-sm text-ink-600">
        <input
          type="checkbox"
          name="nda"
          value="on"
          required
          className="mt-1 h-4 w-4 rounded border-ink-300 text-accent focus:ring-accent"
        />
        <span>
          I agree to keep the materials confidential until any public launch and
          will not redistribute them.
        </span>
      </label>

      {topError && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {topError}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center rounded-full bg-ink-900 px-6 py-3.5 text-base font-medium text-paper transition-colors hover:bg-accent disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Request the deck"}
      </button>

      <p className="text-center text-xs text-ink-500">
        We reply from {`investors@vroelabs.com`}. No automatic download.
      </p>
    </form>
  );
}

