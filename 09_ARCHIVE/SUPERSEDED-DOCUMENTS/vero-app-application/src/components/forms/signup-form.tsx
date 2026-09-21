"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";

export function SignupForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    const formData = new FormData(e.currentTarget);
    const payload = {
      email: formData.get("email"),
      password: formData.get("password"),
      fullName: formData.get("fullName"),
      role: formData.get("role"),
      consent: formData.get("consent") === "on",
    };

    startTransition(async () => {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Signup failed");
        return;
      }
      setSuccess(json.message ?? "Account created. Check your email.");
    });
  }

  return (
    <form onSubmit={onSubmit} className="mt-10 space-y-4">
      <div>
        <label htmlFor="fullName" className="mb-2 block text-xs font-medium text-ink-1">
          Full name
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          required
          autoComplete="name"
          disabled={isPending}
          className="h-11 w-full rounded-input border border-ink-3/30 bg-surface-1 px-3 text-sm text-ink-0 placeholder:text-ink-3 focus:border-accent focus:outline-none disabled:opacity-60"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-xs font-medium text-ink-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          disabled={isPending}
          className="h-11 w-full rounded-input border border-ink-3/30 bg-surface-1 px-3 text-sm text-ink-0 placeholder:text-ink-3 focus:border-accent focus:outline-none disabled:opacity-60"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-2 block text-xs font-medium text-ink-1">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="new-password"
          minLength={12}
          disabled={isPending}
          className="h-11 w-full rounded-input border border-ink-3/30 bg-surface-1 px-3 text-sm text-ink-0 placeholder:text-ink-3 focus:border-accent focus:outline-none disabled:opacity-60"
        />
        <p className="mt-2 text-xs text-ink-3">
          12+ characters. Upper, lower, number, special.
        </p>
      </div>

      <fieldset disabled={isPending}>
        <legend className="mb-2 block text-xs font-medium text-ink-1">I am a</legend>
        <div className="grid grid-cols-2 gap-3">
          <label className="flex cursor-pointer items-center justify-center rounded-input border border-ink-3/30 bg-surface-1 px-4 py-3 text-sm has-checked:border-accent has-checked:bg-surface-2">
            <input type="radio" name="role" value="worker" defaultChecked className="sr-only" />
            Worker
          </label>
          <label className="flex cursor-pointer items-center justify-center rounded-input border border-ink-3/30 bg-surface-1 px-4 py-3 text-sm has-checked:border-accent has-checked:bg-surface-2">
            <input type="radio" name="role" value="business" className="sr-only" />
            Business
          </label>
        </div>
      </fieldset>

      <label className="flex items-start gap-3 pt-2 text-xs text-ink-2">
        <input type="checkbox" name="consent" required disabled={isPending} className="mt-0.5" />
        <span>
          I agree to the Terms and acknowledge the Privacy Policy. My data is processed under DPDP
          Act 2023.
        </span>
      </label>

      {error && (
        <p role="alert" className="text-sm text-signal" aria-live="polite">
          {error}
        </p>
      )}
      {success && (
        <p role="status" className="text-sm text-accent" aria-live="polite">
          {success}
        </p>
      )}

      <Button variant="primary" size="lg" className="w-full" type="submit" disabled={isPending}>
        {isPending ? "Creating account…" : "Create account"}
      </Button>
    </form>
  );
}
