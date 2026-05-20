import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TroveMark } from "@/components/marketing/trove-mark";

export default function NotFound() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-5 py-16 text-center">
      <TroveMark className="h-10 w-10 opacity-60" />
      <p className="mt-8 font-mono text-xs uppercase tracking-widest text-trove-goldDeep">Error 404</p>
      <h1 className="mt-3 display-serif text-display-lg">This page wandered off.</h1>
      <p className="mt-4 max-w-md text-base text-muted-foreground">
        We couldn't find what you're looking for. Try one of the links below.
      </p>
      <div className="mt-8 flex gap-3">
        <Button asChild><Link href="/">Take me home</Link></Button>
        <Button asChild variant="ghost"><Link href="/dashboard">My dashboard</Link></Button>
      </div>
    </div>
  );
}
