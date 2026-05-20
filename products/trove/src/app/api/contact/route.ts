import { type NextRequest } from "next/server";
import { z } from "zod";
import { jsonError, validate, withRateLimit } from "@/lib/api";
import { sendEmail } from "@/lib/resend";

const schema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  topic: z.enum(["general", "sales", "support", "press", "security"]),
  message: z.string().min(20).max(2000),
});

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "anonymous";
  const rl = await withRateLimit("email", ip);
  if (rl) return rl;

  const parsed = await validate(schema, req);
  if ("error" in parsed) return parsed.error;
  const { name, email, topic, message } = parsed.data;

  try {
    await sendEmail({
      to: process.env.RESEND_FROM_EMAIL?.match(/<(.+)>/)?.[1] ?? "hello@trove.vroelabs.com",
      subject: `[${topic}] ${name} — Trove`,
      html: `<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
<p><strong>Topic:</strong> ${topic}</p>
<hr>
<pre style="font-family:Georgia,serif;white-space:pre-wrap">${escapeHtml(message)}</pre>`,
    });
  } catch (err) {
    console.error("[contact] email send failed", err);
    return jsonError("send_failed", "Couldn't send your message. Email hello@trove.vroelabs.com directly.", 500);
  }

  return Response.json({ ok: true });
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}
