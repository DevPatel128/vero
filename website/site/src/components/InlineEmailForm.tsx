"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function InlineEmailForm() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // Redirect to the waitlist page with the email pre-filled
    router.push(`/waitlist?as=professional&email=${encodeURIComponent(email)}`);
  };

  return (
    <div className="mt-9 flex flex-col gap-3">
      <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          placeholder="name@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 w-full flex-1 rounded-full border border-ink-200 bg-paper px-5 text-base text-ink-900 placeholder:text-ink-400 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 shadow-sm"
        />
        <button
          type="submit"
          className="inline-flex h-12 items-center justify-center whitespace-nowrap rounded-full bg-ink-900 px-8 text-base font-medium text-paper transition-all hover:bg-accent hover:shadow-md focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-paper active:scale-95"
        >
          Reserve My Spot
        </button>
      </form>
      <p className="text-xs text-ink-600 pl-4 sm:pl-5">
        Takes 10 seconds. No spam. Free for professionals.
      </p>
    </div>
  );
}
