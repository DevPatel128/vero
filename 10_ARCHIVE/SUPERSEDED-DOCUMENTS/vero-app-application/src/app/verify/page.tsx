import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Verify your email",
};

export default function VerifyPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm text-center">
        <Link
          href="/"
          className="font-mono text-xs uppercase tracking-[0.2em] text-ink-2 hover:text-ink-1"
        >
          ← VERO
        </Link>

        <div className="mx-auto mt-12 size-12 rounded-pill bg-surface-1 flex items-center justify-center">
          <div className="size-3 rounded-pill bg-accent" />
        </div>

        <h1 className="mt-8 text-3xl font-semibold tracking-tight">
          Check your email
        </h1>
        <p className="mt-3 text-sm text-ink-2">
          We sent you a verification link. Click it to confirm your account, then
          sign in.
        </p>

        <div className="mt-10">
          <Link href="/login">
            <Button variant="secondary" size="lg" className="w-full">
              Back to sign in
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
