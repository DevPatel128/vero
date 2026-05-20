// ─────────────────────────────────────────────────────────
// RIE Email Service
// Transactional email via AWS SES or Resend
// ─────────────────────────────────────────────────────────

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

const FROM_ADDRESS = process.env.EMAIL_FROM || 'noreply@rie.app';
const PROVIDER = process.env.EMAIL_PROVIDER || 'resend'; // 'ses' | 'resend'

// ── Templates ───────────────────────────────────────────

function baseTemplate(content: string): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#050508;font-family:'Inter',-apple-system,sans-serif;">
  <div style="max-width:480px;margin:0 auto;padding:48px 24px;">
    <div style="text-align:center;margin-bottom:32px;">
      <div style="display:inline-block;width:40px;height:40px;border-radius:10px;background:linear-gradient(135deg,#C9A55A,#A8873A);line-height:40px;font-size:18px;font-weight:700;color:#050508;">R</div>
    </div>
    ${content}
    <div style="margin-top:48px;padding-top:24px;border-top:1px solid rgba(255,255,255,0.05);text-align:center;">
      <p style="font-size:11px;color:#48484A;margin:0;">RIE — The Discipline App</p>
      <p style="font-size:11px;color:#48484A;margin:4px 0 0;">End-to-end encrypted · Zero data sharing</p>
    </div>
  </div>
</body>
</html>`;
}

export const EMAIL_TEMPLATES = {
  welcome: (name: string) => ({
    subject: 'Welcome to RIE — Your Discipline Journey Starts Now',
    html: baseTemplate(`
      <h1 style="color:#FFFFFF;font-size:24px;font-weight:500;margin:0 0 16px;">Welcome, ${name}</h1>
      <p style="color:#8A8A8E;font-size:15px;line-height:1.6;margin:0 0 24px;">You've taken the first step. RIE isn't a habit tracker — it's a trust layer for discipline. Every proof you submit, every streak you maintain, builds your reputation.</p>
      <div style="text-align:center;margin:32px 0;">
        <a href="https://rie.app/dashboard" style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#C9A55A,#A8873A);color:#050508;font-weight:600;font-size:15px;text-decoration:none;border-radius:12px;">Open Dashboard</a>
      </div>
      <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.05);border-radius:12px;padding:20px;margin-top:24px;">
        <p style="color:#C9A55A;font-size:13px;font-weight:600;margin:0 0 8px;text-transform:uppercase;letter-spacing:0.04em;">Quick Start</p>
        <p style="color:#8A8A8E;font-size:14px;line-height:1.6;margin:0;">1. Choose your domains<br>2. Connect your devices/accounts<br>3. Submit your first proof<br>4. Build your Discipline Score</p>
      </div>
    `),
  }),

  verification: (code: string) => ({
    subject: `${code} — RIE Verification Code`,
    html: baseTemplate(`
      <h1 style="color:#FFFFFF;font-size:24px;font-weight:500;margin:0 0 16px;">Verification Code</h1>
      <p style="color:#8A8A8E;font-size:15px;margin:0 0 24px;">Enter this code to verify your identity:</p>
      <div style="text-align:center;margin:32px 0;">
        <span style="font-size:36px;font-weight:300;letter-spacing:0.3em;color:#C9A55A;">${code}</span>
      </div>
      <p style="color:#48484A;font-size:13px;margin:0;text-align:center;">This code expires in 10 minutes. If you didn't request this, ignore this email.</p>
    `),
  }),

  streakWarning: (streak: number, domain: string) => ({
    subject: `Your ${streak}-day streak is at risk — RIE`,
    html: baseTemplate(`
      <h1 style="color:#FFFFFF;font-size:24px;font-weight:500;margin:0 0 16px;">🔥 Streak at risk</h1>
      <p style="color:#8A8A8E;font-size:15px;line-height:1.6;margin:0 0 24px;">Your <strong style="color:#C9A55A;">${streak}-day</strong> streak in <strong>${domain}</strong> will break if you don't submit today.</p>
      <div style="text-align:center;margin:32px 0;">
        <a href="https://rie.app/dashboard/submit" style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#C9A55A,#A8873A);color:#050508;font-weight:600;font-size:15px;text-decoration:none;border-radius:12px;">Submit Now</a>
      </div>
    `),
  }),

  passwordReset: (resetUrl: string) => ({
    subject: 'Reset your RIE password',
    html: baseTemplate(`
      <h1 style="color:#FFFFFF;font-size:24px;font-weight:500;margin:0 0 16px;">Password Reset</h1>
      <p style="color:#8A8A8E;font-size:15px;line-height:1.6;margin:0 0 24px;">Click the button below to reset your password. This link expires in 1 hour.</p>
      <div style="text-align:center;margin:32px 0;">
        <a href="${resetUrl}" style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#C9A55A,#A8873A);color:#050508;font-weight:600;font-size:15px;text-decoration:none;border-radius:12px;">Reset Password</a>
      </div>
      <p style="color:#48484A;font-size:13px;margin:0;text-align:center;">If you didn't request this, your account is safe — no action needed.</p>
    `),
  }),

  tierChange: (newTier: string, score: number) => ({
    subject: `You've reached ${newTier} — RIE`,
    html: baseTemplate(`
      <div style="text-align:center;">
        <h1 style="color:#FFFFFF;font-size:24px;font-weight:500;margin:0 0 8px;">Tier Promotion 🎉</h1>
        <p style="color:#8A8A8E;font-size:15px;margin:0 0 32px;">Your discipline speaks for itself.</p>
        <div style="font-size:48px;font-weight:300;color:#C9A55A;margin:16px 0;">${score}</div>
        <span style="display:inline-block;padding:4px 16px;border:1px solid #C9A55A;border-radius:9999px;color:#C9A55A;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;">${newTier}</span>
      </div>
    `),
  }),
};

// ── Send Function ───────────────────────────────────────

export class EmailService {
  async send(options: EmailOptions): Promise<void> {
    if (PROVIDER === 'resend') {
      await this.sendViaResend(options);
    } else {
      await this.sendViaSES(options);
    }
  }

  private async sendViaResend(options: EmailOptions): Promise<void> {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) throw new Error('RESEND_API_KEY is not set');

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: FROM_ADDRESS, to: options.to, subject: options.subject, html: options.html, text: options.text }),
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Resend API error ${res.status}: ${body}`);
    }
  }

  private async sendViaSES(options: EmailOptions): Promise<void> {
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    const region = process.env.AWS_REGION || 'us-east-1';

    if (!accessKeyId || !secretAccessKey) {
      throw new Error('AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY must be set for SES');
    }

    // SES SendEmail via AWS Signature V4 over HTTPS (no SDK dependency)
    const endpoint = `https://email.${region}.amazonaws.com/`;
    const now = new Date();
    const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '').slice(0, 15) + 'Z';
    const dateStamp = amzDate.slice(0, 8);

    const bodyParams = new URLSearchParams({
      Action: 'SendEmail',
      Version: '2010-12-01',
      Source: FROM_ADDRESS,
      'Destination.ToAddresses.member.1': options.to,
      'Message.Subject.Data': options.subject,
      'Message.Subject.Charset': 'UTF-8',
      'Message.Body.Html.Data': options.html,
      'Message.Body.Html.Charset': 'UTF-8',
      ...(options.text ? { 'Message.Body.Text.Data': options.text, 'Message.Body.Text.Charset': 'UTF-8' } : {}),
    });

    const requestBody = bodyParams.toString();

    // Build canonical request for AWS SigV4
    const { createHmac, createHash } = await import('crypto');

    const canonicalHeaders = `content-type:application/x-www-form-urlencoded\nhost:email.${region}.amazonaws.com\nx-amz-date:${amzDate}\n`;
    const signedHeaders = 'content-type;host;x-amz-date';
    const payloadHash = createHash('sha256').update(requestBody).digest('hex');
    const canonicalRequest = ['POST', '/', '', canonicalHeaders, signedHeaders, payloadHash].join('\n');

    const credentialScope = `${dateStamp}/${region}/ses/aws4_request`;
    const stringToSign = ['AWS4-HMAC-SHA256', amzDate, credentialScope, createHash('sha256').update(canonicalRequest).digest('hex')].join('\n');

    const hmacSign = (key: Buffer | string, data: string) => createHmac('sha256', key).update(data).digest();
    const signingKey = hmacSign(hmacSign(hmacSign(hmacSign(`AWS4${secretAccessKey}`, dateStamp), region), 'ses'), 'aws4_request');
    const signature = createHmac('sha256', signingKey).update(stringToSign).digest('hex');

    const authHeader = `AWS4-HMAC-SHA256 Credential=${accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Amz-Date': amzDate,
        Authorization: authHeader,
      },
      body: requestBody,
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`SES API error ${res.status}: ${body}`);
    }
  }
}

export const emailService = new EmailService();
