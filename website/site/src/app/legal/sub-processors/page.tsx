import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sub-processors",
  description:
    "Vero sub-processors list. Production vendors will be listed before any user data flows to them.",
  alternates: { canonical: "/legal/sub-processors" },
};

export default function Page() {
  return (
    <div className="max-w-prose">
      <h1 className="font-display text-4xl font-medium tracking-tighter text-ink-900">
        Sub-processors
      </h1>
      <p>
        Vero is pre-launch. Before production user data flows to any third-party
        processor, this page will list the vendor name, purpose, country, data
        categories, and transfer mechanism.
      </p>
      <h2>Current status</h2>
      <p>No production sub-processors are listed for public launch yet.</p>
      <h2>Update commitment</h2>
      <p>
        Material changes will be posted here before they take effect where law or
        contract requires advance notice.
      </p>
    </div>
  );
}
