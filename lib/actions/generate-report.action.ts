"use server";

import { prisma } from "@/lib/prisma";
import * as XLSX from "xlsx";

interface GenerateReportParams {
  startDate: string;
  endDate: string;
  reportType: "attendance" | "leave" | "summary";
}

type ReportResult = {
  buffer: string; // Base64-encoded string
  filename: string;
};

export async function generateReport({
  startDate,
  endDate,
  reportType,
}: GenerateReportParams): Promise<ReportResult> {
  const start = new Date(startDate);
  const end = new Date(endDate);

  let data: any[] = [];
  let filename = "";

  // Fetch and process data based on report type (logic unchanged)
  if (reportType === "attendance") {
    filename = `Attendance_Report_${startDate}_to_${endDate}.xlsx`;
    const attendanceData = await prisma.attendance.findMany({
      where: { date: { gte: start, lte: end } },
      include: { user: true },
    });

    data = attendanceData.map((entry) => ({
      Name: entry.user.name,
      Email: entry.user.email,
      Date: entry.date.toISOString().slice(0, 10),
      Status: entry.status,
    }));
  } else if (reportType === "leave") {
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

    data = leaveData.map((entry) => ({
      Name: entry.user.name,
      Email: entry.user.email,
      "Start Date": entry.startDate.toISOString().slice(0, 10),
      "End Date": entry.endDate.toISOString().slice(0, 10),
      Reason: entry.leaveReason || "N/A",
    }));
  }

  // Convert data to Excel
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
  const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

  // Encode buffer as Base64
  const base64Buffer = buffer.toString("base64");

  return { buffer: base64Buffer, filename };
}
