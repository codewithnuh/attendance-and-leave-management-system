"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const initialGrades = [
  { grade: "A", minAttendance: 90 },
  { grade: "B", minAttendance: 80 },
  { grade: "C", minAttendance: 70 },
  { grade: "D", minAttendance: 60 },
  { grade: "F", minAttendance: 0 },
];

export default function GradingSystem() {
  const [grades, setGrades] = useState(initialGrades);
  const [newGrade, setNewGrade] = useState({ grade: "", minAttendance: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewGrade((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddGrade = () => {
    if (newGrade.grade && newGrade.minAttendance) {
      setGrades((prev) => [
        ...prev,
        { ...newGrade, minAttendance: parseInt(newGrade.minAttendance) },
      ]);
      setNewGrade({ grade: "", minAttendance: "" });
    }
  };

  const handleUpdateGrade = (index: number, field: string, value: string) => {
    const updatedGrades = [...grades];
    updatedGrades[index] = {
      ...updatedGrades[index],
      [field]: field === "minAttendance" ? parseInt(value) : value,
    };
    setGrades(updatedGrades);
  };

  const handleDeleteGrade = (index: number) => {
    setGrades((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="admin" />
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
                      <Input
                        value={grade.grade}
                        onChange={(e) =>
                          handleUpdateGrade(index, "grade", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={grade.minAttendance}
                        onChange={(e) =>
                          handleUpdateGrade(
                            index,
                            "minAttendance",
                            e.target.value
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteGrade(index)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="new-grade">New Grade</Label>
                <Input
                  id="new-grade"
                  name="grade"
                  value={newGrade.grade}
                  onChange={handleInputChange}
                  placeholder="e.g., A+"
                />
              </div>
              <div>
                <Label htmlFor="new-min-attendance">
                  Minimum Attendance (%)
                </Label>
                <Input
                  id="new-min-attendance"
                  name="minAttendance"
                  type="number"
                  value={newGrade.minAttendance}
                  onChange={handleInputChange}
                  placeholder="e.g., 95"
                />
              </div>
              <div className="flex items-end">
                <Button onClick={handleAddGrade}>Add Grade</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
