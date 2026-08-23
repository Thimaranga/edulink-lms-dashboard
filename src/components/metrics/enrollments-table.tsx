import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter,
} from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { initials } from "@/lib/utils";
import { getEnrollments, type EnrollmentRow } from "@/lib/data";

const STATUS: Record<
  EnrollmentRow["status"],
  { label: string; variant: "success" | "warning" | "neutral" | "default" }
> = {
  completed: { label: "Completed", variant: "success" },
  "on-track": { label: "On track", variant: "default" },
  "at-risk": { label: "At risk", variant: "warning" },
  "not-started": { label: "Not started", variant: "neutral" },
};

export async function EnrollmentsTable() {
  const rows = await getEnrollments();

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Recent enrolments</CardTitle>
          <CardDescription>
            Learners who joined or changed status this week
          </CardDescription>
        </div>
        <Button variant="outline" size="sm" asChild className="hidden sm:inline-flex">
          <Link href="/dashboard/courses">
            View all
            <ArrowUpRight />
          </Link>
        </Button>
      </CardHeader>

      <CardContent className="px-0 pb-0">
        {/* Table scrolls horizontally on narrow screens rather than being
            crushed — the identity column stays readable at 360px. */}
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-5">Learner</TableHead>
              <TableHead>Course</TableHead>
              <TableHead className="hidden md:table-cell">Cohort</TableHead>
              <TableHead className="w-40">Progress</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden lg:table-cell pr-5 text-right">
                Last active
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => {
              const status = STATUS[row.status];
              return (
                <TableRow key={row.id}>
                  <TableCell className="pl-5">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-8">
                        <AvatarFallback>{initials(row.student)}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="truncate text-[13.5px] font-semibold">
                          {row.student}
                        </p>
                        <p className="truncate text-[12px] text-muted-foreground">
                          {row.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-[13px] whitespace-nowrap">
                    {row.course}
                  </TableCell>
                  <TableCell className="hidden md:table-cell font-mono text-[12px] text-muted-foreground">
                    {row.cohort}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <Progress
                        value={row.progress}
                        className="w-16 sm:w-20"
                        indicatorClassName={
                          row.status === "at-risk"
                            ? "bg-warning"
                            : row.progress === 100
                              ? "bg-jade"
                              : "bg-primary"
                        }
                      />
                      <span className="metric text-[12px] text-muted-foreground">
                        {row.progress}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell pr-5 text-right text-[12px] whitespace-nowrap text-muted-foreground">
                    {row.lastActive}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>

      <CardFooter className="sm:hidden">
        <Button variant="outline" size="sm" asChild className="w-full">
          <Link href="/dashboard/courses">View all enrolments</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
