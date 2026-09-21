"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Booking {
  id: string;
  status: string;
  worker_signed_at: string | null;
  business_signed_at: string | null;
}

interface BookingActionsProps {
  booking: Booking;
  side: "worker" | "business";
}

export function BookingActions({ booking, side }: BookingActionsProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function call(path: string, body: object) {
    setError(null);
    startTransition(async () => {
      const res = await fetch(path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Action failed");
        return;
      }
      router.refresh();
    });
  }

  const youSigned =
    side === "worker" ? !!booking.worker_signed_at : !!booking.business_signed_at;

  return (
    <div className="space-y-3">
      {/* Business hires from pending applicant */}
      {side === "business" && booking.status === "pending" && (
        <Button
          variant="primary"
          size="lg"
          onClick={() => call("/api/bookings/hire", { bookingId: booking.id })}
          disabled={isPending}
        >
          {isPending ? "…" : "Hire this applicant"}
        </Button>
      )}

      {/* Worker submits work when accepted */}
      {side === "worker" &&
        (booking.status === "accepted" || booking.status === "in_progress") && (
          <Button
            variant="primary"
            size="lg"
            onClick={() => call("/api/bookings/submit", { bookingId: booking.id })}
            disabled={isPending}
          >
            {isPending ? "…" : "Submit completed work"}
          </Button>
        )}

      {/* Both sides sign once submitted */}
      {(booking.status === "submitted" || booking.status === "in_progress") && !youSigned && (
        <Button
          variant="accent"
          size="lg"
          onClick={() => call("/api/bookings/sign", { bookingId: booking.id, side })}
          disabled={isPending}
        >
          {isPending ? "…" : "Sign completion"}
        </Button>
      )}

      {youSigned && booking.status !== "completed" && (
        <p className="text-sm text-ink-2">
          You signed. Waiting for the other side.
        </p>
      )}

      {booking.status === "completed" && (
        <p className="text-sm text-accent">
          Completed and signed by both sides. Record is permanent.
        </p>
      )}

      {error && (
        <p role="alert" className="text-sm text-signal" aria-live="polite">
          {error}
        </p>
      )}
    </div>
  );
}
