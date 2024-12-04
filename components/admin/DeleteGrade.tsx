"use client";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { TableCell } from "../ui/table";
import { deleteGrade } from "@/lib/actions/grade.action";
import { useToast } from "@/hooks/use-toast";

const DeleteGrade = ({ gradeName, minAttendance, gradeId }) => {
  const { toast } = useToast();
  const handleDeleteGrade = async (gradeId: string) => {
    try {
      const deletedGrade = await deleteGrade(gradeId);

      toast({
        title: "Success",
        description: "Grade Deleted",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Failed",
        description: "Failed to delete Grade",
        variant: "destructive",
      });
    }
  };
  return (
    <>
      <TableCell>
        <Input readOnly value={gradeName} />
      </TableCell>
      <TableCell>
        <Input type="number" readOnly value={minAttendance} />
      </TableCell>
      <TableCell>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => handleDeleteGrade(gradeId)}
        >
          Delete
        </Button>
      </TableCell>
    </>
  );
};

export default DeleteGrade;
