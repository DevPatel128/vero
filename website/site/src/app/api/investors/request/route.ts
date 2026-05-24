import { NextResponse } from "next/server";
import { z } from "zod";
import { sendEmail } from "@/lib/email";
import { site } from "@/lib/site";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().email().max(255),
  firm: z.string().trim().min(2).max(160),
  role: z.string().trim().max(120).optional().or(z.literal("")),
  stage: z.string().trim().max(60).optional().or(z.literal("")),
  thesis: z.string().trim().max(1500).optional().or(z.literal("")),
  nda: z
    .union([z.boolean(), z.string()])
    .refine((v) => v === true || v === "on" || v === "true"),
  company: z.string().max(0).optional().or(z.literal("")),
});

export async function POST(req: Request) {
  try {
    const fd = await req.formData();
    const raw: Record<string, unknown> = {};
    fd.forEach((v, k) => (raw[k] = typeof v === "string" ? v : ""));

    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "invalid_input", details: parsed.error.flatten().fieldErrors },
        { status: 422 },
      );
    }
    const data = parsed.data;

    if (data.company && data.company.length > 0) {
      // Honeypot — silent accept
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const inbox = process.env.INVESTOR_INBOX || site.contact.investors;
    const body = [
      `Investor materials request — ${site.name}`,
      ``,
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Firm: ${data.firm}`,
      `Role: ${data.role || "—"}`,
      `Stage: ${data.stage || "—"}`,
      `NDA agreed: yes`,
      ``,
      `Thesis / interest:`,
      data.thesis || "—",
    ].join("\n");

    await sendEmail(inbox, `[Investor] ${data.name} · ${data.firm}`, body);
    await sendEmail(
      data.email,
      `We received your request`,
      `Thank you for your interest in ${site.name}.\n\nWe respond to serious requests within five business days. If you do not hear from us, please reply to this email or write directly to ${site.contact.investors}.\n\n— ${site.parent}`,
    );

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("investors.request error", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
