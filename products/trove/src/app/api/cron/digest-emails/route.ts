import { type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { sendEmail } from "@/lib/resend";

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) return new Response("unauthorized", { status: 401 });

  const admin = createAdminClient();
  const { data: profiles = [] } = await admin.from("profiles").select("id, email, full_name").eq("onboarding_complete", true);

  let sent = 0;
  for (const p of profiles ?? []) {
    try {
      await sendEmail({
        to: p.email,
        subject: "Your week with Trove",
        html: `<p>Hi ${p.full_name ?? "there"},</p><p>Here's your week — your dashboard has the full breakdown.</p><p><a href="https://trove.vroelabs.com/dashboard">Open Trove →</a></p>`,
      });
      sent++;
    } catch (err) { console.warn("[digest] failed for", p.email, err); }
  }

  return Response.json({ sent });
}
