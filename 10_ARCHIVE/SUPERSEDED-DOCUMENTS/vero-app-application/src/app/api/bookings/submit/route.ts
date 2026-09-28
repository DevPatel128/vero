import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { submitWorkSchema } from "@/lib/validations/booking";

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

  const parsed = submitWorkSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { data: booking } = await supabase
    .from("bookings")
    .select("id, worker_id, business_id, status")
    .eq("id", parsed.data.bookingId)
    .maybeSingle();

  if (!booking || booking.worker_id !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  if (!["accepted", "in_progress"].includes(booking.status)) {
    return NextResponse.json({ error: "Cannot submit in current state" }, { status: 409 });
  }

  const { error } = await supabase
    .from("bookings")
    .update({ status: "submitted", updated_at: new Date().toISOString() })
    .eq("id", booking.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  if (parsed.data.note) {
    await supabase.from("messages").insert({
      booking_id: booking.id,
      author_id: user.id,
      body: `Submitted work: ${parsed.data.note}`,
    });
  }

  return NextResponse.json({ ok: true });
}
