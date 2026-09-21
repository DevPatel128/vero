"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get("next") ?? "/dashboard";
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    const payload = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    startTransition(async () => {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Login failed");
        return;
      }
      router.push(nextUrl);
      router.refresh();
    });
  }

  return (
    <form onSubmit={onSubmit} className="mt-10 space-y-4">
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
          autoComplete="current-password"
          disabled={isPending}
          className="h-11 w-full rounded-input border border-ink-3/30 bg-surface-1 px-3 text-sm text-ink-0 placeholder:text-ink-3 focus:border-accent focus:outline-none disabled:opacity-60"
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-signal" aria-live="polite">
          {error}
        </p>
      )}

      <Button variant="primary" size="lg" className="w-full" type="submit" disabled={isPending}>
        {isPending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
