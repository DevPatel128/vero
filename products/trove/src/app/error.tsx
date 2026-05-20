"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { TroveMark } from "@/components/marketing/trove-mark";

export default function ErrorBoundary({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-5 py-16 text-center">
      <TroveMark className="h-10 w-10 opacity-60" />
      <p className="mt-8 font-mono text-xs uppercase tracking-widest text-trove-danger">Error 500</p>
      <h1 className="mt-3 display-serif text-display-lg">Something broke on our end.</h1>
      <p className="mt-4 max-w-md text-base text-muted-foreground">We've been notified. Try again — and if it keeps happening, email support@trove.vroelabs.com.</p>
      {error.digest && <code className="mt-3 font-mono text-xs text-muted-foreground">ref: {error.digest}</code>}
      <div className="mt-8 flex gap-3">
        <Button onClick={() => reset()}>Try again</Button>
        <Button asChild variant="ghost"><a href="/">Take me home</a></Button>
      </div>
    </div>
  );
}
