/**
 * Email send abstraction.
 * In dev, logs to console. In prod, swap to Resend/Postmark by env var.
 */
export async function sendEmail(to: string, subject: string, body: string) {
  if (process.env.RESEND_API_KEY) {
    // Placeholder for real integration — kept minimal to avoid leaking infra.
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
        console.warn("Email send failed", res.status, await res.text());
      }
    } catch (err) {
      console.warn("Email send error", err);
    }
    return;
  }
  // Dev fallback
  console.log("\n[email]", { to, subject });
  console.log(body, "\n");
}

