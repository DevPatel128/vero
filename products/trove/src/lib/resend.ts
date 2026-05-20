import "server-only";
import { Resend } from "resend";

let _resend: Resend | null = null;

export function resend(): Resend {
  if (_resend) return _resend;
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY missing");
  _resend = new Resend(key);
  return _resend;
}

export async function sendEmail(opts: { to: string | string[]; subject: string; html: string; text?: string }) {
  const from = process.env.RESEND_FROM_EMAIL ?? "Trove <onboarding@resend.dev>";
  return resend().emails.send({ from, ...opts });
}

export function welcomeEmailHtml(name: string) {
  return `
<!DOCTYPE html>
<html><body style="font-family:Georgia,serif;background:#FAF7F2;color:#111;padding:40px;line-height:1.6">
  <div style="max-width:560px;margin:0 auto">
    <h1 style="font-size:28px;margin:0 0 24px">Welcome to Trove, ${name}.</h1>
    <p>Your account is ready. A few suggestions for the first ten minutes:</p>
    <ol>
      <li>Connect a bank or drop a CSV.</li>
      <li>Audit your subscriptions — most members find ~$80/mo to cancel.</li>
      <li>Set one budget. Any category. Just one.</li>
    </ol>
    <p>If anything looks wrong, just reply. We read every message.</p>
    <p>— Dev<br/><span style="color:#595959">Founder, Vroe Labs</span></p>
  </div>
</body></html>`;
}
