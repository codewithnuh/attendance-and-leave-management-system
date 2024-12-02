"use client";
import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
const LeaveSubmissionCard = () => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [reason, setReason] = useState<string>("");
  const [submit, setSubmit] = useState<boolean>(false);
  const handleSubmit = (event: React.FormEvent) => {
    setSubmit(true);
    event.preventDefault();
    console.log({
      startDate,
      endDate,
      reason,
    });
    // Here you would typically make an API call to submit the leave request
    console.log("Leave request submitted");
  };
  return (
    <Card className="max-w-md mx-auto">
      {submit == false ? (
        <>
          <CardHeader>
            <CardTitle>Mark Leave</CardTitle>
            <CardDescription>Submit a leave request</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="start-date">Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? (
                        format(startDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-date">End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? (
                        format(endDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Leave</Label>
                <Textarea
                  id="reason"
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Enter your reason for leave"
                />
              </div>
              <Button type="submit" className="w-full">
                Submit Leave Request
              </Button>
            </form>
          </CardContent>
        </>
      ) : (
        <CardContent className="flex flex-col items-center py-6 space-y-4">
          <div className="rounded-full bg-orange-100 p-3 dark:bg-orange-900">
            <AlertCircle className="h-6 w-6 text-orange-600 dark:text-orange-300" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-muted-foreground">
              Status
            </h3>
            <p className="text-3xl font-bold text-orange-500 dark:text-orange-400">
              Pending
            </p>
            <p className="text-sm text-muted-foreground max-w-[200px]">
              Your leave request is currently under review
            </p>
          </div>
          <div className="w-full max-w-[200px] h-2 bg-orange-200 rounded-full overflow-hidden">
            <div className="w-1/2 h-full bg-orange-500 rounded-full"></div>
          </div>
          <p className="text-xs text-muted-foreground">
            Estimated response time: 24-48 hours
          </p>
        </CardContent>
      )}
    </Card>
  );
};
export default LeaveSubmissionCard;
