import { NextResponse } from "next/server";
import { waitlist, effectivePosition, tierFor, tierLabel } from "@/lib/waitlist";
import { joinSchema } from "@/lib/waitlist/schema";
import { sendEmail } from "@/lib/email";
import { site } from "@/lib/site";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const ct = req.headers.get("content-type") || "";
    let raw: Record<string, unknown> = {};

    if (ct.includes("application/json")) {
      raw = await req.json();
    } else if (
      ct.includes("application/x-www-form-urlencoded") ||
      ct.includes("multipart/form-data")
    ) {
      const fd = await req.formData();
      fd.forEach((v, k) => {
        raw[k] = typeof v === "string" ? v : "";
      });
    } else {
      return NextResponse.json(
        { error: "Unsupported content type." },
        { status: 415 },
      );
    }

    const parsed = joinSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "invalid_input",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 422 },
      );
    }

    const data = parsed.data;

    // Honeypot
    if (data.website && data.website.length > 0) {
      // Silent accept to avoid signalling
      return NextResponse.json({ ok: true, position: null }, { status: 200 });
    }

    const { entry, created } = await waitlist.add({
      email: data.email,
      name: data.name ? String(data.name) : null,
      role: data.role,
      city: data.city ? String(data.city) : null,
      useCase: data.useCase ? String(data.useCase) : null,
      source: data.source ? String(data.source) : null,
      referredBy: data.referredBy ? String(data.referredBy) : null,
    });

    if (created) {
      const tier = tierLabel(tierFor(entry.position));
      const shown = effectivePosition(entry);
      const myUrl = `${site.url}/waitlist/${entry.token}`;

      await sendEmail(
        entry.email,
        `You’re in. Position #${shown}.`,
        [
          `Welcome to the ${site.name} waitlist.`,
          ``,
          `You’re position #${shown}. You’re a ${tier.toLowerCase()}.`,
          ``,
          `Your personal page (queue position, referral link, share copy):`,
          myUrl,
          ``,
          `Your referral code: ${entry.referralCode}`,
          `Share this URL with friends — each referral moves you up 5 spots:`,
          `${site.url}/waitlist?ref=${entry.referralCode}`,
          ``,
          `Bengaluru opens in ${site.launchWindow}. We’ll be in touch.`,
          ``,
          `— ${site.parent}`,
        ].join("\n"),
      );
    }

    return NextResponse.json(
      {
        ok: true,
        created,
        token: entry.token,
        position: effectivePosition(entry),
        tier: tierLabel(tierFor(entry.position)),
      },
      { status: created ? 201 : 200 },
    );
  } catch (err) {
    console.error("waitlist.join error", err);
    return NextResponse.json(
      { error: "server_error" },
      { status: 500 },
    );
  }
}
