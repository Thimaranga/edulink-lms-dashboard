import type { Metadata } from "next";
import { requireUser } from "@/lib/session";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/dashboard/page-header";
import { ROLE_LABEL } from "@/lib/roles";

export const metadata: Metadata = { title: "Settings" };

export default async function SettingsPage() {
  const user = await requireUser();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Account"
        title="Settings"
        description="Update how your name and contact details appear to learners."
      />

      <Card className="max-w-2xl">
        <CardHeader>
          <div>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Visible to everyone in your cohorts.</CardDescription>
          </div>
          <Badge variant="neutral">{ROLE_LABEL[user.role]}</Badge>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" defaultValue={user.name ?? ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="s-email">Email</Label>
            <Input id="s-email" type="email" defaultValue={user.email ?? ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" defaultValue={user.title ?? ""} />
          </div>
          <div className="flex gap-2 pt-1">
            <Button>Save changes</Button>
            <Button variant="ghost">Cancel</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
