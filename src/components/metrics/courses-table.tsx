import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/utils";
import { getCourses } from "@/lib/data";

export async function CoursesTable() {
  const rows = await getCourses();

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Course performance</CardTitle>
          <CardDescription>Completion and rating by course</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-0 pb-2">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-5">Course</TableHead>
              <TableHead className="hidden sm:table-cell">Instructor</TableHead>
              <TableHead className="text-right">Enrolled</TableHead>
              <TableHead className="text-right">Completion</TableHead>
              <TableHead className="pr-5 text-right">Rating</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="pl-5">
                  <p className="text-[13.5px] font-semibold whitespace-nowrap">{row.title}</p>
                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="font-mono text-[11px] text-muted-foreground">{row.id}</span>
                    {row.status === "draft" && <Badge variant="neutral">Draft</Badge>}
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell text-[13px] whitespace-nowrap text-muted-foreground">
                  {row.instructor}
                </TableCell>
                <TableCell className="metric text-right text-[13px]">
                  {formatNumber(row.enrolled)}
                </TableCell>
                <TableCell className="metric text-right text-[13px]">
                  {row.completionRate}%
                </TableCell>
                <TableCell className="metric pr-5 text-right text-[13px]">
                  {row.rating.toFixed(1)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
