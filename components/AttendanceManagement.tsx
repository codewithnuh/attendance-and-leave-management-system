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

const AttendanceManagement = ({ ALL_USERS }) => {
  const { toast } = useToast();
  const [userId, setUserId] = useState(null);
  const [date, setDate] = useState<Date | undefined>();

  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
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
        description: error.message || "Failed to update attendance",
        variant: "destructive",
      });
    }
  };

  return (
    <CardContent>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="user">User</Label>
          <Select onValueChange={(value) => setUserId(value)}>
            <SelectTrigger id="user">
              <SelectValue placeholder="Select a user" />
            </SelectTrigger>
            <SelectContent>
              {ALL_USERS.map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  {user.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn("w-full justify-start")}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date} // `date` is of type `Date | undefined`
                onSelect={(selectedDate) => {
                  if (selectedDate instanceof Date) {
                    setDate(selectedDate); // Ensure `date` is always a valid `Date` object
                  }
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select onValueChange={(value) => setStatus(value)}>
            <SelectTrigger id="status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Present">Present</SelectItem>
              <SelectItem value="Absent">Absent</SelectItem>
              <SelectItem value="Leave">Leave</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit">Update Attendance</Button>
      </form>
    </CardContent>
  );
};

export default AttendanceManagement;
