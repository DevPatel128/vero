import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { signupSchema } from "@/lib/validations/auth";
import { signupRateLimit } from "@/lib/ratelimit";

export async function POST(req: Request) {
  const hdrs = await headers();
  const ip =
    hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    hdrs.get("x-real-ip") ??
    "anonymous";

  if (signupRateLimit) {
    const { success } = await signupRateLimit.limit(ip);
    if (!success) {
      return NextResponse.json(
        { error: "Too many signup attempts. Please try again later." },
        { status: 429 },
      );
    }
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = signupSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { email, password, fullName, role, consent } = parsed.data;

  const supabase = await createClient();
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName, role },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/verify`,
    },
  });

  if (signUpError) {
    return NextResponse.json(
      { error: signUpError.message },
      { status: 400 },
    );
  }

  if (signUpData.user && consent) {
    const admin = createAdminClient();
    await admin.from("user_consents").insert({
      user_id: signUpData.user.id,
      consent_type: "terms_and_privacy",
      version: "v1",
      granted: true,
      ip_address: ip === "anonymous" ? null : ip,
    });
    await admin.from("audit_logs").insert({
      user_id: signUpData.user.id,
      actor_id: signUpData.user.id,
      action: "user.signup",
      resource_type: "user",
      resource_id: signUpData.user.id,
      ip_address: ip === "anonymous" ? null : ip,
      user_agent: hdrs.get("user-agent"),
    });
  }

  return NextResponse.json({
    ok: true,
    message: "Check your email to verify your account.",
  });
}
