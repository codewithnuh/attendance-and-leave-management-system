"use client";
import React from "react";
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
  const handleMarkAttendance = () => {
    startTransition(async () => {
      const result = await markAttendance(userId as string);
      console.log("Server response:", result);
    });
  };
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Mark Attendance</CardTitle>
        <CardDescription>
          {status === "marked"
            ? "You have already marked attendance today."
            : status === "leave"
            ? "You have requested leave for today."
            : "Record your attendance or request leave for today."}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        {status === "Present" ? (
          <div className="text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <p className="text-lg font-semibold">Attendance Marked</p>
          </div>
        ) : status === "leave" ? (
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
