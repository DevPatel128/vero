import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getProfile } from "@/lib/auth";
import { getInitials } from "@/lib/utils";

export const metadata: Metadata = { title: "Profile", robots: { index: false, follow: false } };

export default async function ProfilePage() {
  const profile = await getProfile();
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="font-serif text-xl">Profile</h2>
        <p className="mt-1 text-sm text-muted-foreground">How you appear inside Trove.</p>
        <form action="/api/profile" method="post" className="mt-6 space-y-5">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={profile?.avatar_url ?? undefined} alt={profile?.full_name ?? ""} />
              <AvatarFallback>{getInitials(profile?.full_name ?? profile?.email ?? "")}</AvatarFallback>
            </Avatar>
            <Button type="button" variant="outline" size="sm">Change photo</Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="full_name">Full name</Label>
            <Input id="full_name" name="full_name" defaultValue={profile?.full_name ?? ""} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" defaultValue={profile?.email ?? ""} disabled />
            <p className="text-xs text-muted-foreground">Email changes require re-verification.</p>
          </div>

          <Button type="submit">Save</Button>
        </form>
      </Card>
    </div>
  );
}
