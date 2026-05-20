"use client";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", background: "#FAF7F2", color: "#111", padding: 40, textAlign: "center" }}>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: 36 }}>Something went very wrong.</h1>
        <p style={{ marginTop: 12, color: "#595959" }}>The page crashed before we could catch it.</p>
        {error.digest && <code style={{ display: "block", marginTop: 12, fontSize: 12 }}>ref: {error.digest}</code>}
        <button onClick={reset} style={{ marginTop: 24, padding: "10px 18px", background: "#111", color: "#FAF7F2", border: 0, borderRadius: 4 }}>Try again</button>
      </body>
    </html>
  );
}
