import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { hireSchema } from "@/lib/validations/booking";

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

  const parsed = hireSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { data: booking, error: bErr } = await supabase
    .from("bookings")
    .select("id, business_id, status, opportunity_id")
    .eq("id", parsed.data.bookingId)
    .maybeSingle();

  if (bErr || !booking) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }
  if (booking.business_id !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  if (booking.status !== "pending") {
    return NextResponse.json({ error: "Booking not pending" }, { status: 409 });
  }

  const { error: upErr } = await supabase
    .from("bookings")
    .update({ status: "accepted", updated_at: new Date().toISOString() })
    .eq("id", booking.id);
  if (upErr) return NextResponse.json({ error: upErr.message }, { status: 400 });

  // Close opportunity once a worker is hired
  await supabase
    .from("opportunities")
    .update({ is_open: false, updated_at: new Date().toISOString() })
    .eq("id", booking.opportunity_id);

  const admin = createAdminClient();
  await admin.from("audit_logs").insert({
    user_id: booking.business_id,
    actor_id: user.id,
    action: "booking.hire",
    resource_type: "booking",
    resource_id: booking.id,
  });

  return NextResponse.json({ ok: true, bookingId: booking.id });
}
