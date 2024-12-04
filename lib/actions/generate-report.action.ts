"use server";

import { prisma } from "@/lib/prisma";
import * as XLSX from "xlsx";

// Define types for input parameters
interface GenerateReportParams {
  startDate: string; // ISO string
  endDate: string; // ISO string
  reportType: "attendance" | "leave" | "summary";
}

// Define types for the returned Excel buffer and filename
type ReportResult = {
  buffer: Buffer; // Excel file as a buffer
  filename: string; // Suggested filename
};

// Define common data structures
interface User {
  name: string;
  email: string;
}

interface Attendance {
  date: Date;
  status: string;
  reason?: string; // Optional reason field for attendance
  user: User;
}

interface Leave {
  startDate: Date;
  endDate: Date;
  reason?: string;
  user: User;
}

interface Summary {
  "Total Attendance Records": number;
  "Present Count": number;
  "Absent Count": number;
  "Total Leave Records"?: number;
}

// Server action to generate reports
export async function generateReport({
  startDate,
  endDate,
  reportType,
}: GenerateReportParams): Promise<ReportResult> {
  // Parse dates
  const start = new Date(startDate);
  const end = new Date(endDate);

  let data: Attendance[] | Leave[] | Summary[] = [];
  let summary: Summary = {
    "Total Attendance Records": 0,
    "Present Count": 0,
    "Absent Count": 0,
  };
  let reportTitle = "";
  let filename = "";

  // Handle report types
  if (reportType === "attendance") {
    reportTitle = `Attendance Report (${startDate} to ${endDate})`;
    filename = `Attendance_Report_${startDate}_to_${endDate}.xlsx`;
    const attendanceData = await prisma.attendance.findMany({
      where: {
        date: { gte: start, lte: end },
      },
      include: { user: true },
    });

    // Format attendance data
    data = attendanceData.map((entry) => ({
      date: entry.date,
      status: entry.status,
      // reason: entry. || "N/A",
      user: entry.user,
    }));

    // Create summary for attendance
    const presentCount = attendanceData.filter(
      (entry) => entry.status === "Present"
    ).length;
    const absentCount = attendanceData.filter(
      (entry) => entry.status === "Absent"
    ).length;
    summary = {
      "Total Attendance Records": attendanceData.length,
      "Present Count": presentCount,
      "Absent Count": absentCount,
    };
  } else if (reportType === "leave") {
    reportTitle = `Leave Report (${startDate} to ${endDate})`;
    filename = `Leave_Report_${startDate}_to_${endDate}.xlsx`;
    const leaveData = await prisma.leave.findMany({
      where: {
        OR: [
          { startDate: { gte: start, lte: end } },
          { endDate: { gte: start, lte: end } },
        ],
      },
      include: { user: true },
    });

    // Format leave data
    data = leaveData.map((entry) => ({
      startDate: entry.startDate,
      endDate: entry.endDate,
      reason: entry.leaveReason || "N/A",
      user: entry.user,
    }));
  } else if (reportType === "summary") {
    reportTitle = `Summary Report (${startDate} to ${endDate})`;
    filename = `Summary_Report_${startDate}_to_${endDate}.xlsx`;

    // Fetch attendance data for summary
    const attendanceData = await prisma.attendance.findMany({
      where: {
        date: { gte: start, lte: end },
      },
    });

    const presentCount = attendanceData.filter(
      (entry) => entry.status === "Present"
    ).length;
    const absentCount = attendanceData.filter(
      (entry) => entry.status === "Absent"
    ).length;

    // Fetch leave data for summary
    const leaveData = await prisma.leave.findMany({
      where: {
        OR: [
          { startDate: { gte: start, lte: end } },
          { endDate: { gte: start, lte: end } },
        ],
      },
    });

    summary = {
      "Total Attendance Records": attendanceData.length,
      "Present Count": presentCount,
      "Absent Count": absentCount,
      "Total Leave Records": leaveData.length,
    };

    data = [summary];
  }

  // Prepare formatted data for Excel
  const formattedData =
    data.length > 0
      ? data.map((entry) =>
          "date" in entry
            ? {
                Name: entry.user.name,
                Email: entry.user.email,
                Date: entry.date.toISOString().slice(0, 10),
                Status: entry.status,
                Reason: entry.reason,
              }
            : "startDate" in entry
            ? {
                Name: entry.user.name,
                Email: entry.user.email,
                "Start Date": entry.startDate.toISOString().slice(0, 10),
                "End Date": entry.endDate.toISOString().slice(0, 10),
                Reason: entry.reason,
              }
            : entry
        )
      : [{ Name: "", Email: "", Date: "", Status: "", Reason: "" }];

  // Create Excel worksheet and workbook
  const worksheet = XLSX.utils.json_to_sheet(formattedData);

  // Add a title row
  XLSX.utils.sheet_add_aoa(worksheet, [[reportTitle]], { origin: "A1" });

  // Adjust data to start after the title row
  XLSX.utils.sheet_add_json(worksheet, formattedData, { origin: "A3" });

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

  // Convert workbook to buffer
  const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

  return { buffer, filename };
}
