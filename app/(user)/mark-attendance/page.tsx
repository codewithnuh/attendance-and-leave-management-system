"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function MarkAttendance() {
  const [isMarked, setIsMarked] = useState(false);

  const handleMarkAttendance = () => {
    // Here you would typically make an API call to mark attendance
    setIsMarked(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Mark Attendance</CardTitle>
            <CardDescription>Record your attendance for today</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            {isMarked ? (
              <div className="text-center">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <p className="text-lg font-semibold">Attendance Marked</p>
                <p className="text-sm text-muted-foreground">
                  Your attendance has been recorded for today.
                </p>
              </div>
            ) : (
              <Button
                onClick={handleMarkAttendance}
                size="lg"
                className="w-full"
              >
                Mark Attendance
              </Button>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
