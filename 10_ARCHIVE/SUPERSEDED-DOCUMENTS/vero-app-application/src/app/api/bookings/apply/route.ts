import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { applySchema } from "@/lib/validations/booking";

export async function POST(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (user.user_metadata?.role !== "worker") {
    return NextResponse.json({ error: "Only workers can apply" }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = applySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { data: opp, error: oppErr } = await supabase
    .from("opportunities")
    .select("id, business_id, title, pay_amount_paise, is_open, deleted_at")
    .eq("id", parsed.data.opportunityId)
    .maybeSingle();

  if (oppErr || !opp || opp.deleted_at || !opp.is_open) {
    return NextResponse.json({ error: "Opportunity not open" }, { status: 404 });
  }

  const { data: existing } = await supabase
    .from("bookings")
    .select("id")
    .eq("opportunity_id", opp.id)
    .eq("worker_id", user.id)
    .maybeSingle();

  if (existing) {
    return NextResponse.json({ ok: true, bookingId: existing.id, already: true });
  }

  const { data: booking, error: bErr } = await supabase
    .from("bookings")
    .insert({
      opportunity_id: opp.id,
      worker_id: user.id,
      business_id: opp.business_id,
      scope: opp.title,
      pay_amount_paise: opp.pay_amount_paise,
      status: "pending",
    })
    .select("id")
    .single();

  if (bErr) return NextResponse.json({ error: bErr.message }, { status: 400 });

  if (parsed.data.message) {
    await supabase.from("messages").insert({
      booking_id: booking.id,
      author_id: user.id,
      body: parsed.data.message,
    });
  }

  return NextResponse.json({ ok: true, bookingId: booking.id });
}
