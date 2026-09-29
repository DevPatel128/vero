import type { NextConfig } from "next";
import path from "path";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

// Local D1 bindings in `next dev` are opt-in (CF_DEV_BINDINGS=1). By default
// dev and the Playwright suite use the JSON file store.
if (process.env.CF_DEV_BINDINGS === "1") {
  initOpenNextCloudflareForDev();
}

// Report-only: describes the policy this site should be able to run under,
// but nothing is blocked yet. Reflects what the app actually loads today —
// no third-party scripts, styles, fonts or connect targets; next/font
// self-hosts fonts under this origin, and Next's hydration payload and the
// JSON-LD blocks are inline. Promoting this to an enforced
// Content-Security-Policy is a separate decision (see 08_DECISIONS).
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "form-action 'self'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
].join("; ");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  turbopack: {
    root: path.resolve(__dirname),
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "Content-Security-Policy-Report-Only", value: csp },
        ],
      },
    ];
  },
};

export default nextConfig;
