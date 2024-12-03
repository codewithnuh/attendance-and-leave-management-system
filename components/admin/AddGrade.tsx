"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
const AddGrade = () => {
  const [gradeName, setGradeName] = useState("");
  const [gradeValue, setGradeValue] = useState("");
  return (
    <div className="mt-4 grid grid-cols-3 gap-4">
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
        <Label htmlFor="new-min-attendance">Minimum Attendance (%)</Label>
        <Input
          id="new-min-attendance"
          name="minAttendance"
          type="number"
          value={gradeValue}
          onChange={(e) => setGradeValue(e.target.value)}
          placeholder="e.g., 95"
        />
      </div>
      <div className="flex items-end">
        <Button>Add Grade</Button>
      </div>
    </div>
  );
};

export default AddGrade;
