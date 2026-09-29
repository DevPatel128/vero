import Link from "next/link";
import { SignupForm } from "@/components/forms/signup-form";

export const metadata = {
  title: "Create account",
};

export default function SignupPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <Link
          href="/"
          className="font-mono text-xs uppercase tracking-[0.2em] text-ink-2 hover:text-ink-1"
        >
          ← VERO
        </Link>

        <h1 className="mt-8 text-3xl font-semibold tracking-tight">
          Create account
        </h1>
        <p className="mt-2 text-sm text-ink-2">
          Build a verified record of your work. Free for workers, forever.
        </p>

        <SignupForm />

        <p className="mt-8 text-center text-sm text-ink-2">
          Already have an account?{" "}
          <Link href="/login" className="text-ink-0 underline-offset-4 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
