import { type NextRequest } from "next/server";
import { z } from "zod";
import { jsonError, requireApiUser, validate, withRateLimit } from "@/lib/api";
import { createClient } from "@/lib/supabase/server";
import { audit } from "@/lib/audit";
import { sendEmail } from "@/lib/resend";

const schema = z.object({
  subject: z.string().min(4).max(200),
  body: z.string().min(20).max(4000),
  priority: z.enum(["low", "normal", "high", "urgent"]).default("normal"),
});

export async function POST(req: NextRequest) {
  const user = await requireApiUser();
  if (!user) return jsonError("unauthorized", "Sign in required.", 401);
  const rl = await withRateLimit("api", user.id); if (rl) return rl;
  const parsed = await validate(schema, req); if ("error" in parsed) return parsed.error;

  const supabase = await createClient();
  const { data, error } = await supabase.from("support_tickets").insert({
    user_id: user.id,
    subject: parsed.data.subject,
    body: parsed.data.body,
    priority: parsed.data.priority,
  }).select().single();
  if (error) return jsonError("db_error", error.message, 500);

  await audit({ userId: user.id, action: "ticket.create", resourceType: "support_ticket", resourceId: data.id });

  try {
    await sendEmail({
      to: "support@trove.vroelabs.com",
      subject: `[${parsed.data.priority}] ${parsed.data.subject}`,
      html: `<p>From: ${user.email}</p><p>Ticket: ${data.id}</p><pre>${parsed.data.body}</pre>`,
    });
  } catch (err) { console.warn("[ticket] email failed", err); }

  return Response.json(data, { status: 201 });
}
