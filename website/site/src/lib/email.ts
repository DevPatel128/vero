/**
 * Email send abstraction.
 * With RESEND_API_KEY set, sends through Resend. Otherwise logs to console
 * for local development only — see the production guard below.
 */
export async function sendEmail(to: string, subject: string, body: string) {
  if (process.env.RESEND_API_KEY) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.WAITLIST_FROM_EMAIL || "hello@vero.app",
          to: [to],
          subject,
          text: body,
        }),
      });
      if (!res.ok) {
        // Status only. The response body can echo request content or
        // provider-internal detail and must not reach logs.
        console.warn("Email send failed", res.status);
      }
    } catch {
      console.warn("Email send error");
    }
    return;
  }

  if (process.env.NODE_ENV === "production") {
    // No provider configured in production: fail loudly, but never write
    // the recipient, subject or body (the body can carry a personal
    // waitlist token URL) to logs.
    console.error("Email not sent: RESEND_API_KEY is not set in production.");
    return;
  }

  // Local dev fallback only.
  console.log("\n[email]", { to, subject });
  console.log(body, "\n");
}
