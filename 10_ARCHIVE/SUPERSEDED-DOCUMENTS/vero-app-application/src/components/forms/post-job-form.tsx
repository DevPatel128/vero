"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Field } from "@/components/ui/field";
import { CAREER_PATHS, ZONES } from "@/lib/career-paths";

export function PostJobForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const amount = Number(fd.get("payAmount"));
    if (!Number.isFinite(amount) || amount < 100) {
      setError("Enter a valid pay amount (minimum ₹100).");
      return;
    }

    const payload = {
      title: fd.get("title"),
      description: fd.get("description"),
      careerPath: fd.get("careerPath"),
      city: "bengaluru" as const,
      zone: fd.get("zone"),
      payType: fd.get("payType"),
      payAmount: amount,
    };

    startTransition(async () => {
      const res = await fetch("/api/opportunities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Could not post job");
        return;
      }
      router.push(`/jobs/${json.opportunityId}`);
      router.refresh();
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 max-w-xl">
      <Field label="Title" htmlFor="title">
        <Input id="title" name="title" required minLength={4} maxLength={120} disabled={isPending} />
      </Field>

      <Field label="Scope" htmlFor="description" hint="What needs to happen, by when, deliverables.">
        <Textarea id="description" name="description" required minLength={20} maxLength={2000} disabled={isPending} />
      </Field>

      <Field label="Career path" htmlFor="careerPath">
        <Select id="careerPath" name="careerPath" required defaultValue="" disabled={isPending}>
          <option value="" disabled>Pick one</option>
          {Object.entries(
            CAREER_PATHS.reduce<Record<string, typeof CAREER_PATHS>>((acc, p) => {
              acc[p.category] = acc[p.category] ?? [];
              acc[p.category].push(p);
              return acc;
            }, {}),
          ).map(([category, paths]) => (
            <optgroup key={category} label={category}>
              {paths.map((p) => (
                <option key={p.slug} value={p.slug}>{p.label}</option>
              ))}
            </optgroup>
          ))}
        </Select>
      </Field>

      <Field label="Zone" htmlFor="zone">
        <Select id="zone" name="zone" required defaultValue="" disabled={isPending}>
          <option value="" disabled>Pick a zone</option>
          {ZONES.map((z) => (
            <option key={z.slug} value={z.slug}>{z.label}</option>
          ))}
        </Select>
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Pay type" htmlFor="payType">
          <Select id="payType" name="payType" required defaultValue="fixed" disabled={isPending}>
            <option value="fixed">Fixed</option>
            <option value="day_rate">Day rate</option>
            <option value="hourly">Hourly</option>
          </Select>
        </Field>
        <Field label="Amount (₹)" htmlFor="payAmount" hint="Held in escrow on hire.">
          <Input id="payAmount" name="payAmount" type="number" min={100} max={1000000} required disabled={isPending} />
        </Field>
      </div>

      {error && (
        <p role="alert" className="text-sm text-signal" aria-live="polite">
          {error}
        </p>
      )}

      <Button variant="primary" size="lg" type="submit" disabled={isPending}>
        {isPending ? "Posting…" : "Post opportunity"}
      </Button>
    </form>
  );
}
