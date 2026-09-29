import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { signSchema } from "@/lib/validations/booking";

export async function POST(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = signSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { data: booking } = await supabase
    .from("bookings")
    .select("id, worker_id, business_id, status, worker_signed_at, business_signed_at")
    .eq("id", parsed.data.bookingId)
    .maybeSingle();
  if (!booking) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const isWorker = booking.worker_id === user.id && parsed.data.side === "worker";
  const isBusiness = booking.business_id === user.id && parsed.data.side === "business";
  if (!isWorker && !isBusiness) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (!["submitted", "in_progress"].includes(booking.status)) {
    return NextResponse.json({ error: "Not ready to sign" }, { status: 409 });
  }

  const now = new Date().toISOString();
  const patch: Record<string, string> = { updated_at: now };
  if (isWorker) patch.worker_signed_at = now;
  if (isBusiness) patch.business_signed_at = now;

  const willBeBothSigned =
    (isWorker || booking.worker_signed_at) && (isBusiness || booking.business_signed_at);
  if (willBeBothSigned) {
    patch.status = "completed";
    patch.completed_at = now;
  }

  const { error } = await supabase.from("bookings").update(patch).eq("id", booking.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  // Update trust score signed_jobs_count on completion
  if (willBeBothSigned) {
    const admin = createAdminClient();
    await admin.rpc("increment_signed_jobs", { p_user_id: booking.worker_id }).then(
      () => {},
      () => {
        // Fallback: upsert manually if RPC missing
        return admin
          .from("trust_scores")
          .upsert(
            { user_id: booking.worker_id, signed_jobs_count: 1, computed_at: now },
            { onConflict: "user_id" },
          );
      },
    );

    await admin.from("audit_logs").insert([
      {
        user_id: booking.worker_id,
        actor_id: user.id,
        action: "booking.completed",
        resource_type: "booking",
        resource_id: booking.id,
      },
    ]);
  }

  return NextResponse.json({
    ok: true,
    completed: willBeBothSigned,
  });
}
