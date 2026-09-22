import { NextResponse } from "next/server";
import { waitlist, effectivePosition, tierFor, tierLabel } from "@/lib/waitlist";
import { joinSchema } from "@/lib/waitlist/schema";
import { sendEmail } from "@/lib/email";
import { site } from "@/lib/site";
import { clientIp, joinLimiter, withinLimit } from "@/lib/ratelimit";
import { isSameOrigin } from "@/lib/same-origin";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    if (!isSameOrigin(req)) {
      return NextResponse.json({ error: "invalid_origin" }, { status: 403 });
    }

    if (!(await withinLimit(joinLimiter, clientIp(req)))) {
      return NextResponse.json(
        { error: "rate_limited" },
        { status: 429, headers: { "Retry-After": "600" } },
      );
    }

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

    // The token is a secret credential (it alone unlocks the personal
    // waitlist page with the entrant's name, email and referral code), so
    // it is returned only to the request that just created the entry. A
    // repeat submission of someone else's email must not hand back their
    // token, or knowing an email would be enough to read their record.
    if (!created) {
      return NextResponse.json({ ok: true, created: false }, { status: 200 });
    }

    return NextResponse.json(
      {
        ok: true,
        created: true,
        token: entry.token,
        position: effectivePosition(entry),
        tier: tierLabel(tierFor(entry.position)),
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("waitlist.join error", err);
    return NextResponse.json(
      { error: "server_error" },
      { status: 500 },
    );
  }
}
