"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CardContent } from "./ui/card";
import { useToast } from "@/hooks/use-toast";
import { updateAttendance } from "@/lib/actions/update-attendance.action";
interface User {
  id: string;
  name: string;
}

interface AttendanceManagementProps {
  ALL_USERS: User[];
}
const AttendanceManagement = ({ ALL_USERS }: AttendanceManagementProps) => {
  const { toast } = useToast();
  const [userId, setUserId] = useState<string | null>(null);
  const [date, setDate] = useState<Date | undefined>();

  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId || !date || !status) {
      toast({
        title: "Error",
        description: "Please fill out all fields",
        variant: "destructive",
      });
      return;
    }

    const payload = {
      userId,
      date: date.toISOString(),
      status,
    };

    console.log("Payload to be sent:", payload);

    try {
      const response = await updateAttendance(payload);

      if (response.success) {
        toast({
          title: "Success",
          description: "Attendance updated successfully",
          variant: "default",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message || "Failed to update attendance",
        variant: "destructive",
      });
    }
  };
  console.log(ALL_USERS);
  return (
    <CardContent>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="user">User</Label>
          <Select onValueChange={(value: string) => setUserId(value)}>
            <SelectTrigger id="user">
              <SelectValue placeholder="Select a user" />
            </SelectTrigger>
            <SelectContent>
              {ALL_USERS.map((user: User) => (
                <SelectItem key={user.id} value={user.id}>
                  {user.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </form>
    </CardContent>
  );
};

export default AttendanceManagement;
