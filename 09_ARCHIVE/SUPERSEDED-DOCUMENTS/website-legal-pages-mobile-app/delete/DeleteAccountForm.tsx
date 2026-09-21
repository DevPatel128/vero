"use client";

import { useState } from "react";

type Phase = "phone" | "otp" | "confirm" | "deleting" | "done" | "error";

// Public Supabase project (anon key) — required to send/verify OTP from the browser.
// Both values are public + safe to ship to the client (anon key is RLS-bound).
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export function DeleteAccountForm() {
  const [phase, setPhase] = useState<Phase>("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [confirmText, setConfirmText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return (
      <p className="text-sm text-ink-2">
        Web deletion is not configured for this environment. Use the in-app option,
        or email <a className="underline" href="mailto:privacy@vero.work">privacy@vero.work</a>.
      </p>
    );
  }

  const normalize = (raw: string) => {
    const digits = raw.replace(/\D/g, "");
    if (digits.length === 12 && digits.startsWith("91")) return `+${digits}`;
    if (digits.length === 10 && /^[6-9]/.test(digits)) return `+91${digits}`;
    return null;
  };

  async function sendOtp() {
    setError(null);
    const e164 = normalize(phone);
    if (!e164) {
      setError("Enter a valid Indian mobile number.");
      return;
    }
    const res = await fetch(`${SUPABASE_URL}/auth/v1/otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
      },
      body: JSON.stringify({ phone: e164 }),
    });
    if (!res.ok) {
      setError("Could not send the code. Try again in a minute.");
      return;
    }
    setPhase("otp");
  }

  async function verifyOtp() {
    setError(null);
    const e164 = normalize(phone)!;
    const res = await fetch(`${SUPABASE_URL}/auth/v1/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
      },
      body: JSON.stringify({ phone: e164, token: code, type: "sms" }),
    });
    if (!res.ok) {
      setError("Incorrect code.");
      return;
    }
    const data = await res.json();
    if (!data.access_token) {
      setError("Verification failed.");
      return;
    }
    setAccessToken(data.access_token);
    setPhase("confirm");
  }

  async function doDelete() {
    if (confirmText.trim() !== "DELETE") {
      setError('You must type "DELETE" to confirm.');
      return;
    }
    setPhase("deleting");
    const res = await fetch(
      `${SUPABASE_URL}/functions/v1/delete_my_account`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    if (!res.ok) {
      setError("Deletion failed. Email privacy@vero.work for manual removal.");
      setPhase("error");
      return;
    }
    setPhase("done");
  }

  if (phase === "done") {
    return (
      <div className="space-y-3">
        <h3 className="font-display text-lg text-ink-0">Account deleted.</h3>
        <p className="text-sm text-ink-1">Your VERO account and personal data have been removed. Allow up to 30 days for backups to clear.</p>
      </div>
    );
  }

  if (phase === "error") {
    return (
      <div className="space-y-3">
        <p className="text-sm text-red-600">{error}</p>
        <button
          className="rounded-lg border border-ink-100 px-4 py-2 text-sm"
          onClick={() => setPhase("phone")}
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <label className="block">
        <span className="block text-sm font-medium text-ink-0">Phone number</span>
        <input
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+91 98765 43210"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={phase !== "phone"}
          className="mt-2 w-full rounded-lg border border-ink-100 bg-white px-3 py-2 text-base text-ink-0 disabled:bg-paper"
        />
      </label>

      {phase === "phone" && (
        <button
          type="button"
          onClick={sendOtp}
          className="w-full rounded-lg bg-ink-0 px-4 py-3 text-sm font-medium text-white hover:opacity-90"
        >
          Send verification code
        </button>
      )}

      {(phase === "otp" || phase === "confirm" || phase === "deleting") && (
        <label className="block">
          <span className="block text-sm font-medium text-ink-0">6-digit code</span>
          <input
            type="text"
            inputMode="numeric"
            pattern="\\d{6}"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            disabled={phase !== "otp"}
            className="mt-2 w-full rounded-lg border border-ink-100 bg-white px-3 py-2 text-base text-ink-0 tracking-widest disabled:bg-paper"
          />
        </label>
      )}

      {phase === "otp" && (
        <button
          type="button"
          onClick={verifyOtp}
          className="w-full rounded-lg bg-ink-0 px-4 py-3 text-sm font-medium text-white hover:opacity-90"
        >
          Verify
        </button>
      )}

      {(phase === "confirm" || phase === "deleting") && (
        <>
          <label className="block">
            <span className="block text-sm font-medium text-ink-0">
              Type <strong>DELETE</strong> to confirm
            </span>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              disabled={phase === "deleting"}
              className="mt-2 w-full rounded-lg border border-ink-100 bg-white px-3 py-2 text-base text-ink-0 disabled:bg-paper"
            />
          </label>
          <button
            type="button"
            onClick={doDelete}
            disabled={
              phase === "deleting" || confirmText.trim() !== "DELETE"
            }
            className="w-full rounded-lg bg-red-600 px-4 py-3 text-sm font-medium text-white hover:opacity-90 disabled:opacity-40"
          >
            {phase === "deleting" ? "Deleting…" : "Permanently delete my account"}
          </button>
        </>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
