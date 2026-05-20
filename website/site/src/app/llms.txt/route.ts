import { site } from "@/lib/site";

export const runtime = "edge";

export async function GET() {
  const body = `# ${site.name}

> ${site.tagline}

${site.description}

## Company
- Product: ${site.name}
- Parent: ${site.parent}
- Protocol: ${site.protocol} (Authentic Ledger of Validated Evolution Data)
- Headquarters: Bengaluru, India
- Launch: ${site.launchWindow}, ${site.launchCity}
- Launch areas: ${site.launchAreas.join(", ")}

## What ${site.name} is
${site.name} is a verified proof-of-work identity platform. Every job a worker completes becomes a signed, chained record on their profile, jointly signed by the worker and the person who hired them. Records are tamper-evident, exportable, and owned by the worker.

## Who it is for
- Workers: students, switchers, skilled hands without portfolios, creators, freelancers.
- Businesses: cafés, households, studios, SMBs hiring with proof rather than guesswork.

## Pricing
- Workers: free, always.
- Businesses: starts at free for occasional hires. Recommended plan ₹2,499 / month. Custom plans for studios.
- Escrow: flat 5% on paid work, well below the gig-platform standard.

## Trust + security
- Each record is signed by both worker and client (two-party signing) and chained by hash to the previous record on the same worker. Tampering is detectable.
- Identity verified using government-supported Indian digital documents. Biometric scans are not retained.
- TLS 1.3, encryption at rest, append-only audit log.
- Compliant with India's Digital Personal Data Protection Act 2023.

## Long-term ecosystem
${site.name} is the first product under ${site.parent}. Two more are in development:
- RIE — verified proof of discipline (training, learning, habit).
- Trove — verified proof of value (what you keep, hold, build).
All three write to the same open ${site.protocol} protocol so credentials can be carried across products.

## Key URLs
- Home: ${site.url}/
- How it works: ${site.url}/how-it-works
- Features: ${site.url}/features
- For workers: ${site.url}/for-workers
- For businesses: ${site.url}/for-businesses
- Pricing: ${site.url}/pricing
- Trust: ${site.url}/trust
- Security: ${site.url}/security
- Manifesto: ${site.url}/manifesto
- Ecosystem (VROE Labs + ALVED): ${site.url}/ecosystem
- FAQ: ${site.url}/faq
- Waitlist: ${site.url}/waitlist
- Press: ${site.url}/press
- Contact: ${site.url}/contact
- Privacy: ${site.url}/legal/privacy

## Contact
- General: ${site.contact.general}
- Press: ${site.contact.press}
- Security: ${site.contact.security}
- Grievance officer (India): ${site.contact.grievance}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
