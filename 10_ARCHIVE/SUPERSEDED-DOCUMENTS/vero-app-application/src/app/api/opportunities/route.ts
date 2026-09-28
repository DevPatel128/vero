import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { opportunitySchema } from "@/lib/validations/opportunity";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const careerPath = url.searchParams.get("careerPath");
  const zone = url.searchParams.get("zone");

  const supabase = await createClient();
  let query = supabase
    .from("opportunities")
    .select("id, title, description, career_path, city, zone, pay_type, pay_amount_paise, business_id, created_at")
    .eq("is_open", true)
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .limit(50);

  if (careerPath) query = query.eq("career_path", careerPath);
  if (zone) query = query.eq("zone", zone);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ opportunities: data ?? [] });
}

export async function POST(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const role = user.user_metadata?.role;
  if (role !== "business") {
    return NextResponse.json(
      { error: "Only businesses can post opportunities" },
      { status: 403 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = opportunitySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { data, error } = await supabase
    .from("opportunities")
    .insert({
      business_id: user.id,
      title: parsed.data.title,
      description: parsed.data.description,
      career_path: parsed.data.careerPath,
      city: parsed.data.city,
      zone: parsed.data.zone,
      pay_type: parsed.data.payType,
      pay_amount_paise: parsed.data.payAmount * 100,
      deadline: parsed.data.deadline ?? null,
    })
    .select("id")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ ok: true, opportunityId: data.id });
}
