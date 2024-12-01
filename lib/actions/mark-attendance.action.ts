"use server";

import { prisma } from "@/lib/prisma";

interface AttendanceResult {
  success: boolean;
  message: string;
  alreadyMarked?: boolean;
  status?: string; // Add the status to the response
  error?: string;
}

export async function markAttendance(
  userId: string
): Promise<AttendanceResult> {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to the start of the day
  console.log(today);
  try {
    // Check if attendance or leave has already been recorded for today
    const existingEntry = await prisma.attendance.findFirst({
      where: {
        userId,
        date: today,
      },
    });

    if (existingEntry) {
      return {
        success: false,
        message:
          existingEntry.status === "Present"
            ? "Attendance already marked for today."
            : "Cannot mark attendance as leave has been requested.",
        status: existingEntry.status, // Return the existing status
        alreadyMarked: true, // Indicate that it's already marked
      };
    }

    // Mark attendance as Present if not already marked
    await prisma.attendance.create({
      data: {
        userId,
        date: today,
        status: "Present",
      },
    });

    return {
      success: true,
      message: "Attendance marked successfully!",
      status: "Present", // Return the updated status
    };
  } catch (error) {
    console.error(error);
    return {
      status,
      message: "Failed to mark attendance. Please try again.",
      success: false,
      error: "Failed to mark attendance. Please try again.",
    };
  }
}
