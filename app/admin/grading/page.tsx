import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddGrade from "@/components/admin/AddGrade";
import { fetchAllGrades } from "@/lib/actions/grade.action";
import DeleteGrade from "@/components/admin/DeleteGrade";

export default async function GradingSystem() {
  const ALL_GRADES = await fetchAllGrades();
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Grading System</CardTitle>
            <CardDescription>
              Configure attendance-based grading
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Grade</TableHead>
                  <TableHead>
                    Minimum <br className="md:hidden" /> Attendance (%)
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              {Array.isArray(ALL_GRADES) && (
                <TableBody>
                  {ALL_GRADES.map((grade, index) => (
                    <TableRow key={index}>
                      <DeleteGrade
                        gradeName={grade.grade}
                        minAttendance={grade.minAttendance}
                        gradeId={grade.id}
                      />
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
            <AddGrade />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
