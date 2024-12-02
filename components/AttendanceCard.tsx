"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTransition } from "react";
import { CheckCircle } from "lucide-react";
import { markAttendance } from "@/lib/actions/mark-attendance.action";

const AttendanceCard = ({
  status,
  userId,
}: {
  status?: string;
  userId: string;
}) => {
  const [isPending, startTransition] = useTransition();
  const [localStatus, setLocalStatus] = useState(status); // Manage local status for immediate feedback

  const handleMarkAttendance = async () => {
    startTransition(async () => {
      const result = await markAttendance(userId as string); // Send request to the server
      console.log("Server response:", result);

      if (result.success) {
        // Immediately update local status to reflect that attendance is marked
        setLocalStatus("Present");
      } else {
        // Handle any error here (e.g., network issue)
        console.error("Failed to mark attendance");
      }
    });
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Mark Attendance</CardTitle>
        <CardDescription>
          {localStatus === "marked"
            ? "You have already marked attendance today."
            : localStatus === "leave"
            ? "You have requested leave for today."
            : "Record your attendance or request leave for today."}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        {localStatus === "Present" ? (
          <div className="text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <p className="text-lg font-semibold">Attendance Marked</p>
          </div>
        ) : localStatus === "leave" ? (
          <div className="text-center">
            <p className="text-lg font-semibold">Leave Requested</p>
          </div>
        ) : (
          <div className="space-y-4">
            <Button
              onClick={handleMarkAttendance}
              size="lg"
              className="w-full"
              disabled={isPending || !userId}
            >
              {isPending ? "Marking..." : "Mark Attendance"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AttendanceCard;
