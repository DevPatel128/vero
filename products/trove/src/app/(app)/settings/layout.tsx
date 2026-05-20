import Link from "next/link";
import { PageHeader } from "@/components/app/page-header";
import { SettingsNav } from "@/components/app/settings-nav";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageHeader eyebrow="Account" title="Settings" description="Tune Trove to your taste. All changes save automatically." />
      <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
        <SettingsNav />
        <div>{children}</div>
      </div>
    </>
  );
}
