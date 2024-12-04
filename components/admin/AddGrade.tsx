"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { addGrade } from "@/lib/actions/grade.action";
import { useToast } from "@/hooks/use-toast";
const AddGrade = () => {
  const [gradeName, setGradeName] = useState("");
  const [gradeValue, setGradeValue] = useState<number | undefined>();
  console.log({ gradeName, gradeValue });
  const { toast } = useToast();
  const handleAddGrade = async (grade: string, minAttendance: number) => {
    try {
      const GRADE = await addGrade(grade, +minAttendance);
      console.log(GRADE);
      toast({
        title: "Success",
        description: "Grade added",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Failed",
        description: "Failed to added Grade",
        variant: "destructive",
      });
    }
  };
  return (
    <div className="mt-4 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-center">
        <div>
          <Label htmlFor="new-grade">New Grade</Label>
          <Input
            id="new-grade"
            name="grade"
            value={gradeName}
            onChange={(e) => setGradeName(e.target.value)}
            placeholder="e.g., A+"
          />
        </div>
        <div>
          <Label htmlFor="new-min-attendance">Min Attendance (%)</Label>
          <Input
            id="new-min-attendance"
            name="minAttendance"
            type="number"
            placeholder="e.g., 95"
          />
        </div>
      </div>
      <div className="inline-flex items-center justify-center w-full mt-4">
        <Button
          className="w-full"
          onClick={() => handleAddGrade(gradeName, gradeValue)}
        >
          Add Grade
        </Button>
      </div>
    </div>
  );
};

export default AddGrade;
