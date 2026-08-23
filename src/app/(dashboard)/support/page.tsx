import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PageHeader } from "@/components/dashboard/page-header";

export const metadata: Metadata = { title: "Support" };

export default function SupportPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Help"
        title="Support"
        description="Reach the learning operations team or browse setup guides."
      />
      <Card className="max-w-2xl">
        <CardHeader>
          <div>
            <CardTitle>Nothing here yet</CardTitle>
            <CardDescription>
              Knowledge base articles will appear once your institution publishes
              its first guide.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            In the meantime, email{" "}
            <span className="font-mono text-[13px] text-foreground">
              ops@edulink.io
            </span>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
