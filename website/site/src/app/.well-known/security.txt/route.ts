import { site } from "@/lib/site";


export async function GET() {
  const oneYear = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
    .toISOString();
  const body = [
    `Contact: mailto:${site.contact.security}`,
    `Expires: ${oneYear}`,
    `Preferred-Languages: en, hi`,
    `Canonical: ${site.url}/.well-known/security.txt`,
    `Policy: ${site.url}/legal/responsible-disclosure`,
  ].join("\n");

  return new Response(body + "\n", {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
