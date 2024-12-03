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

const grades = [
  { grade: "A", minAttendance: 90 },
  { grade: "B", minAttendance: 80 },
  { grade: "C", minAttendance: 70 },
  { grade: "D", minAttendance: 60 },
  { grade: "F", minAttendance: 0 },
];

export default function GradingSystem() {
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
                  <TableHead>Minimum Attendance (%)</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {grades.map((grade, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Input readOnly value={grade.grade} />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        readOnly
                        value={grade.minAttendance}
                      />
                    </TableCell>
                    <TableCell>
                      <Button variant="destructive" size="sm">
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <AddGrade />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
