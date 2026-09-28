import type { Metadata } from "next";
import { LegalDoc, LegalH2 } from "@/components/LegalDoc";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms governing your use of the VERO mobile app and related services, provided by VROE Labs Private Limited.",
  alternates: { canonical: "/terms" },
};

export default function Page() {
  return (
    <LegalDoc
      title="Terms of Service"
      effective="2026-05-25"
      version="1.0.0"
      intro="These Terms govern your use of the VERO mobile application and related services, provided by VROE Labs Private Limited. By creating an account or using VERO, you agree to these Terms."
    >
      <LegalH2>1. Eligibility</LegalH2>
      <ul>
        <li>You must be at least <strong>18 years old</strong>.</li>
        <li>You must provide a valid Indian mobile number for sign-in.</li>
        <li>You must use your real identity. Impersonation is grounds for immediate removal.</li>
      </ul>

      <LegalH2>2. Your account</LegalH2>
      <ul>
        <li>One person, one account. You are responsible for everything that happens under your account.</li>
        <li>Keep your phone secure. Notify us at <a href="mailto:hello@vero.work">hello@vero.work</a> immediately if you lose access.</li>
        <li>You may delete your account from Profile → Settings → Delete account, or at <a href="/delete">vero.work/delete</a>.</li>
      </ul>

      <LegalH2>3. What VERO is — and what it is not</LegalH2>
      <p>VERO is a <strong>proof-of-work identity platform</strong>. We help workers, apprentices, students, and clients in India build verified work identities, discover opportunities, and coordinate via messages.</p>
      <p>VERO is <strong>not</strong>:</p>
      <ul>
        <li>An employer. Bookings are between you and the other party.</li>
        <li>A payment processor. Payments happen between users (and, in future, via a regulated provider).</li>
        <li>A guarantor. Trust signals are directional — not character certification.</li>
        <li>A government identity service. Trust score is not a substitute for government ID, KYC, police verification, or background checks.</li>
      </ul>

      <LegalH2>4. Acceptable use — what you must not do</LegalH2>
      <p>You agree <strong>not</strong> to:</p>
      <ol>
        <li><strong>Impersonate</strong> another person, business, or government official.</li>
        <li>Post or send <strong>harassment, hate speech, threats, sexual content, or illegal content</strong>.</li>
        <li>Post content that <strong>infringes intellectual property</strong>.</li>
        <li>Run <strong>scams</strong>, fraudulent listings, MLM, pyramid schemes, or anything designed to mislead.</li>
        <li>Solicit <strong>child labour</strong> or work prohibited by Indian law.</li>
        <li>Use VERO to <strong>collect personal data</strong> of other users beyond completing a booking.</li>
        <li><strong>Spam</strong> users with unsolicited messages, including referral chains.</li>
        <li><strong>Reverse engineer</strong>, scrape, or rate-limit-abuse the service.</li>
        <li><strong>Game the trust system</strong> — fake bookings, paid reviews, sybil accounts. We detect and act.</li>
        <li>Use VERO for activities the Indian government has banned in your sector.</li>
      </ol>
      <p>We reserve the right to remove content and <strong>suspend or permanently remove accounts</strong> for violations at our sole discretion.</p>

      <LegalH2>5. User-generated content</LegalH2>
      <p>You retain ownership of content you post. By posting, you grant us a worldwide, royalty-free licence to host, display, and transmit it for the purpose of operating VERO.</p>
      <p>We do not pre-screen content but we do moderate. You can:</p>
      <ul>
        <li><strong>Report</strong> any opportunity, message, or user from the overflow menu in the app.</li>
        <li><strong>Block</strong> any user from your settings.</li>
        <li>Email serious concerns to <a href="mailto:hello@vero.work">hello@vero.work</a>.</li>
      </ul>
      <p>We aim to review reports within <strong>48 hours</strong>.</p>

      <LegalH2>6. Trust score</LegalH2>
      <p>
        The VERO trust score is computed server-side from signals (verified contacts, completed bookings, peer attestations, time on platform). It is <strong>directional</strong>, not authoritative. We make no representation that any user is suitable for any specific job. Always do your own due diligence before agreeing to work, paying money, or sharing sensitive information.
      </p>

      <LegalH2>7. Bookings</LegalH2>
      <p>Bookings are contracts between you and the other party, <strong>not</strong> with VERO. You are responsible for scope, pay, timelines, performance, tax, and dispute resolution. VERO may offer mediation but is not legally bound to.</p>

      <LegalH2>8. Disclaimers</LegalH2>
      <p>VERO is provided <strong>"as is"</strong>. To the maximum extent permitted by Indian law, we disclaim all warranties — including merchantability, fitness for purpose, and uninterrupted availability.</p>

      <LegalH2>9. Limitation of liability</LegalH2>
      <p>Our total liability is limited to the greater of <strong>₹500</strong> or the fees you paid us in the 12 months before the claim (currently ₹0; VERO is free during pilot). We are not liable for indirect, incidental, consequential, or punitive damages.</p>

      <LegalH2>10. Termination</LegalH2>
      <p>We may suspend or terminate your account with or without notice if we believe you have violated these Terms. You may stop using VERO at any time. Deletion is governed by the <a href="/privacy">Privacy Policy</a>.</p>

      <LegalH2>11. Changes</LegalH2>
      <p>Material changes are announced in-app at least <strong>14 days</strong> before they take effect. Continued use after the effective date means you accept the new Terms.</p>

      <LegalH2>12. Governing law + jurisdiction</LegalH2>
      <p>These Terms are governed by the laws of <strong>India</strong>. Disputes are subject to the exclusive jurisdiction of the courts at <strong>Bengaluru, Karnataka</strong>.</p>

      <LegalH2>13. Contact</LegalH2>
      <ul>
        <li>General: <a href="mailto:hello@vero.work">hello@vero.work</a></li>
        <li>Grievance Officer: <a href="mailto:grievance@vero.work">grievance@vero.work</a></li>
        <li>Postal: VROE Labs Private Limited, Bengaluru, Karnataka, India</li>
      </ul>
    </LegalDoc>
  );
}
