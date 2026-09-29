"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function ApplyButton({ opportunityId }: { opportunityId: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function apply() {
    setError(null);
    startTransition(async () => {
      const res = await fetch("/api/bookings/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ opportunityId }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Apply failed");
        return;
      }
      router.refresh();
    });
  }

  return (
    <div>
      <Button variant="primary" size="lg" onClick={apply} disabled={isPending}>
        {isPending ? "Applying…" : "Apply to this opportunity"}
      </Button>
      {error && (
        <p role="alert" className="mt-3 text-sm text-signal" aria-live="polite">
          {error}
        </p>
      )}
    </div>
  );
}
