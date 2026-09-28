import type { Metadata } from "next";
import { LegalDoc, LegalH2, LegalH3, LegalTable } from "@/components/LegalDoc";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How VERO (VROE Labs) collects, uses, stores, and shares your personal data. Compliant with India's DPDP Act 2023.",
  alternates: { canonical: "/privacy" },
};

const ENTITY = "VROE Labs Private Limited";
const ADDRESS = "VROE Labs Private Limited, Bengaluru, Karnataka, India";

export default function Page() {
  return (
    <LegalDoc
      title="Privacy Policy"
      effective="2026-05-25"
      version="1.0.0"
      intro={`How ${ENTITY} (operating as VERO) collects, uses, stores, and shares your personal data when you use the VERO mobile app and related services. We are a Data Fiduciary under the Digital Personal Data Protection Act, 2023.`}
    >
      <LegalH2>1. Who we are</LegalH2>
      <ul>
        <li><strong>Data Fiduciary:</strong> {ENTITY}</li>
        <li><strong>Registered address:</strong> {ADDRESS}</li>
        <li><strong>Privacy questions:</strong> <a href="mailto:privacy@vero.work">privacy@vero.work</a></li>
        <li><strong>Grievance Officer:</strong> <a href="mailto:grievance@vero.work">grievance@vero.work</a> (response within 30 days)</li>
      </ul>

      <LegalH2>2. What data we collect</LegalH2>
      <LegalH3>2.1 You give us directly</LegalH3>
      <ul>
        <li><strong>Phone number</strong> — for OTP sign-in + account identity.</li>
        <li><strong>Display name, handle, role, city</strong> — your public profile.</li>
        <li><strong>Bio + skills</strong> (optional) — surfaced on your profile.</li>
        <li><strong>Avatar + portfolio photos</strong> (optional) — uploaded by you, deleted by you.</li>
        <li><strong>Opportunities you post</strong> — title, description, category, city, pay, dates.</li>
        <li><strong>Messages you send</strong> to other VERO users.</li>
        <li><strong>Reports</strong> you submit about content or users.</li>
      </ul>

      <LegalH3>2.2 We collect automatically</LegalH3>
      <ul>
        <li><strong>Device + platform</strong> — Android / iOS, OS version, app version. Debugging only.</li>
        <li><strong>Push notification token</strong> — only if you opt in. Used for booking + message alerts. Never sold.</li>
        <li><strong>App activity</strong> — pages visited + actions inside VERO. Aggregated where possible.</li>
        <li><strong>Crash + error reports</strong> — anonymised, sent to Sentry. Linked only to your VERO user ID.</li>
      </ul>

      <LegalH3>2.3 We do NOT collect</LegalH3>
      <ul>
        <li>Your contacts.</li>
        <li>Your precise location (city only).</li>
        <li>Your biometric data (Face ID / fingerprint stays on your device).</li>
        <li>Microphone or audio.</li>
        <li>Tracking identifiers used to follow you across other apps and websites.</li>
      </ul>

      <LegalH2>3. Why we collect (legal basis under DPDP)</LegalH2>
      <p>
        We process your data on the basis of your <strong>consent</strong>, given at "I Agree" in sign-up, and on
        <strong> legitimate use</strong> where the Act permits (e.g. fraud prevention, legal compliance).
      </p>
      <LegalTable
        cols={["Purpose", "Data used", "Basis"]}
        rows={[
          ["Sign you in", "Phone, OTP", "Consent"],
          ["Show your profile to others", "Profile fields", "Consent"],
          ["Match workers + clients", "Profile, skills, city, opportunities", "Consent"],
          ["Detect abuse + uphold trust", "Reports, blocks, content", "Legitimate use"],
          ["Send transactional alerts", "Push token, account events", "Consent"],
          ["Debug crashes", "Error logs + user ID", "Legitimate use"],
          ["Compliance + law enforcement", "Limited records", "Legal obligation"],
        ]}
      />

      <LegalH2>4. Where your data lives</LegalH2>
      <p>
        All personal data is stored in <strong>India (Mumbai region)</strong> on Supabase infrastructure
        (AWS Asia-Pacific South 1). Backups are encrypted at rest with AES-256. Transit uses TLS 1.3.
      </p>
      <p>
        Crash reports are processed by <strong>Sentry GmbH (Germany)</strong>. Crash payloads contain only
        your VERO user ID — not your phone number, name, or message content.
      </p>
      <p>
        We do not transfer your data outside India except where required to operate crash reporting.
        We do not sell your data to any third party. Ever.
      </p>

      <LegalH2>5. How long we keep it</LegalH2>
      <LegalTable
        cols={["Data", "Retention"]}
        rows={[
          ["Account + profile", "Until you delete your account"],
          ["Bookings", "3 years after completion (tax + dispute window)"],
          ["Messages", "Until deleted by either party; or 2 years after last message"],
          ["Trust records", "Until your account is deleted"],
          ["Reports about you", "3 years (abuse-pattern detection)"],
          ["Push tokens", "Until you sign out or revoke notifications"],
          ["Crash reports", "90 days"],
          ["Audit logs", "2 years"],
        ]}
      />
      <p>
        On account deletion every row above is wiped within <strong>30 days</strong>, except entries we
        are legally required to keep (e.g. financial records). See Section 8.
      </p>

      <LegalH2>6. Who can see your data</LegalH2>
      <ul>
        <li><strong>Other VERO users</strong> see your public profile (name, handle, bio, city, skills, trust level, completed bookings count). They cannot see your phone, email, or private message history.</li>
        <li><strong>Our team</strong> can access support tickets + reports you file. Access is logged.</li>
        <li><strong>Service providers</strong>: Supabase (database, auth, storage), Twilio/MessageBird (OTP), Sentry (crash), Firebase (push). Each is contractually bound.</li>
        <li><strong>Law enforcement</strong> only on a valid Indian legal request. We publish an annual transparency note.</li>
      </ul>
      <p>We do not share, rent, or sell your personal data for advertising.</p>

      <LegalH2>7. Your rights as a Data Principal</LegalH2>
      <ol>
        <li><strong>Access</strong> the personal data we hold about you.</li>
        <li><strong>Correct</strong> inaccurate or incomplete data (Profile → Edit profile).</li>
        <li><strong>Erase</strong> your account and data — in-app or at <a href="/delete">vero.work/delete</a>.</li>
        <li><strong>Withdraw consent</strong> — sign out + delete account.</li>
        <li><strong>Nominate</strong> another person to act on your behalf.</li>
        <li><strong>Grieve</strong> to our Grievance Officer at <a href="mailto:grievance@vero.work">grievance@vero.work</a>.</li>
        <li><strong>Escalate</strong> to the Data Protection Board of India if we do not resolve within 30 days.</li>
      </ol>
      <p>To exercise rights 1, 5, or 6 email <a href="mailto:privacy@vero.work">privacy@vero.work</a> with your VERO handle. We respond within 7 days.</p>

      <LegalH2>8. Account deletion — what gets removed</LegalH2>
      <p><strong>Immediately wiped (within 24h):</strong> profile, avatar, skills, bio, bookings you initiated (counterparty notified), messages you sent, push tokens, trust records.</p>
      <p><strong>Retained briefly (max 30 days):</strong> auth log entries, deletion audit trail.</p>
      <p><strong>Retained longer where required by law:</strong> financial records on completed paid bookings (Income Tax Act + GST: minimum 6 years), records under active legal hold.</p>

      <LegalH2>9. Security</LegalH2>
      <ul>
        <li>Tokens in Apple Keychain / Android EncryptedSharedPreferences. Never plaintext.</li>
        <li>Passwords (when added) use Argon2id. JWTs signed RS256.</li>
        <li>Row Level Security on every table — your data isolated to your auth.uid() server-side.</li>
        <li>Trust columns server-locked. No client can self-promote.</li>
        <li>Input sanitised at every boundary against XSS, HTML injection, prompt injection.</li>
        <li>Cloud backup of secrets disabled on Android.</li>
        <li>Breach notification within 72 hours to affected users + Data Protection Board.</li>
      </ul>

      <LegalH2>10. Children</LegalH2>
      <p>VERO is not directed at children under 18. We do not knowingly collect data from a child. If you believe a child is using VERO, email <a href="mailto:hello@vero.work">hello@vero.work</a>.</p>

      <LegalH2>11. Changes</LegalH2>
      <p>We update the date + version at the top when material changes occur. For substantive changes (new data category, new sharing, new retention), we notify in-app <strong>before</strong> the change takes effect and ask for fresh consent where required.</p>

      <LegalH2>12. Contact</LegalH2>
      <ul>
        <li>Privacy questions: <a href="mailto:privacy@vero.work">privacy@vero.work</a></li>
        <li>Grievance Officer: <a href="mailto:grievance@vero.work">grievance@vero.work</a></li>
        <li>General: <a href="mailto:hello@vero.work">hello@vero.work</a></li>
        <li>Postal: {ADDRESS}</li>
      </ul>
      <p>You may also write to the <strong>Data Protection Board of India</strong> if you believe we have violated your rights under the DPDP Act.</p>
    </LegalDoc>
  );
}
