"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CardContent } from "../ui/card";
import { toast } from "@/hooks/use-toast";
import { generateReport } from "@/lib/actions/generate-report.action"; // Adjust the path based on your file structure

const GenerateReportCard = () => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [reportType, setReportType] = useState<
    "summary" | "attendance" | "leave"
  >();

  const handleGenerateReport = async () => {
    if (!startDate || !endDate || !reportType) {
      toast({
        description: "Please select all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      toast({ description: "Generating report...", variant: "default" });

      const report = await generateReport({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        reportType,
      });

      if (typeof window !== "undefined") {
        // Decode Base64 string into binary data
        const binaryString = atob(report.buffer);
        const binaryBuffer = new Uint8Array(
          binaryString.split("").map((char) => char.charCodeAt(0))
        );

        const blob = new Blob([binaryBuffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = report.filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);

        toast({
          description: "Report downloaded successfully!",
          variant: "default",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        description: "Error generating report.",
        variant: "destructive",
      });
    }
  };

  const handleReportTypeChange = (value: string) => {
    setReportType(value as "summary" | "attendance" | "leave");
  };

  return (
    <CardContent>
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="start-date">Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="start-date"
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
                id="end-date"
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
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
          <Label htmlFor="report-type">Report Type</Label>
          <Select onValueChange={handleReportTypeChange}>
            <SelectTrigger id="report-type">
              <SelectValue placeholder="Select report type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="attendance">Attendance Report</SelectItem>
              <SelectItem value="leave">Leave Report</SelectItem>
              <SelectItem value="summary">Summary Report</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="button" onClick={handleGenerateReport}>
          Generate Report
        </Button>
      </form>
    </CardContent>
  );
};

export default GenerateReportCard;
