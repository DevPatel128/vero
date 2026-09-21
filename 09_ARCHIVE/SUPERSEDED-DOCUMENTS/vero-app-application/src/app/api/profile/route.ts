import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { profileSchema } from "@/lib/validations/profile";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  return NextResponse.json({ profile: data });
}

export async function PUT(req: Request) {
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

  const parsed = profileSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const fullName =
    (user.user_metadata?.full_name as string | undefined) ?? user.email ?? "User";

  const { error } = await supabase.from("profiles").upsert(
    {
      user_id: user.id,
      full_name: fullName,
      display_name: parsed.data.displayName || null,
      bio: parsed.data.bio || null,
      career_path: parsed.data.careerPath,
      skills: parsed.data.skills,
      city: parsed.data.city,
      zone: parsed.data.zone,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" },
  );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
