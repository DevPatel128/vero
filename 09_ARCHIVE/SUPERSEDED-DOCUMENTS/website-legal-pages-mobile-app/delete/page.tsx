import type { Metadata } from "next";
import { LegalDoc, LegalH2, LegalTable } from "@/components/LegalDoc";
import { DeleteAccountForm } from "./DeleteAccountForm";

export const metadata: Metadata = {
  title: "Delete your VERO account",
  description:
    "Delete your VERO account and all associated data. Required by Google Play account-deletion policy. Works even if you uninstalled the app.",
  alternates: { canonical: "/delete" },
};

export default function Page() {
  return (
    <LegalDoc
      title="Delete your VERO account"
      effective="2026-05-25"
      version="1.0.0"
      intro="You can delete your VERO account in two ways: from inside the app, or here on the web. This page also explains exactly what gets removed, what is retained, and why."
    >
      <LegalH2>Option A — From inside the app (recommended)</LegalH2>
      <ol>
        <li>Open VERO on your phone.</li>
        <li>Go to <strong>Profile → Settings → Delete account</strong>.</li>
        <li>Type <strong>DELETE</strong> to confirm.</li>
        <li>Tap <strong>Delete my account</strong>.</li>
      </ol>
      <p>You will be signed out immediately, and the cascade wipe begins.</p>

      <LegalH2>Option B — From this page</LegalH2>
      <p>If you have uninstalled VERO or cannot reach the in-app option, use the form below. We will text a one-time code to your phone to verify ownership before deleting.</p>
      <div className="my-8 rounded-2xl border border-ink-100 bg-paper p-7 shadow-card">
        <DeleteAccountForm />
      </div>

      <LegalH2>What gets deleted</LegalH2>
      <p><strong>Within 24 hours of your request:</strong></p>
      <ul>
        <li>Your profile (name, handle, bio, avatar, skills, city, role)</li>
        <li>Your authentication record (phone, email, password)</li>
        <li>Your trust score and trust records</li>
        <li>Your push notification tokens</li>
        <li>Your messages where you are the sender</li>
        <li>Your blocks and reports</li>
      </ul>
      <p><strong>Within 7 days:</strong></p>
      <ul>
        <li>Background fan-out: cached references in derived tables, analytics, search indexes</li>
        <li>Cancellation of any pending bookings you initiated</li>
      </ul>

      <LegalH2>What is retained — and why</LegalH2>
      <LegalTable
        cols={["Data", "Retained for", "Why"]}
        rows={[
          ["Audit log of your deletion", "2 years", "Security + dispute history"],
          ["Financial records on completed paid bookings", "6 years", "Income Tax Act + GST Act"],
          ["Records under active legal hold", "Until released", "Court order or law enforcement"],
          ["Aggregate, anonymised stats", "Indefinitely", "Cannot be traced back to you"],
        ]}
      />

      <LegalH2>What others see after you delete</LegalH2>
      <p>Other VERO users who had completed bookings with you will see "Former VERO user" instead of your name. Message history with them remains on their device unless they also delete.</p>

      <LegalH2>How long does it take?</LegalH2>
      <p>Most deletions complete within 1 hour. Maximum window: <strong>30 days</strong>, after which the only remaining records are the legally required financial entries above.</p>

      <LegalH2>Can I undo it?</LegalH2>
      <p><strong>No.</strong> Deletion is final. If you sign up again with the same phone number you start fresh — previous reputation is gone.</p>
      <p>If you only want a break, sign out instead (Profile → Settings → Sign out). Your account stays intact.</p>

      <LegalH2>Questions</LegalH2>
      <p>Email <a href="mailto:privacy@vero.work">privacy@vero.work</a>. We respond within 7 days.</p>
    </LegalDoc>
  );
}
