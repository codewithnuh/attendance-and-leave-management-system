"use server";

import { prisma } from "@/lib/prisma";

interface AttendanceResult {
  success: boolean;
  message: string;
}

export async function markAttendance(
  userId: string
): Promise<AttendanceResult> {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to the start of the day
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1); // Get the start of tomorrow

  try {
    // 1. Check if attendance has already been marked for today
    const existingAttendance = await prisma.attendance.findFirst({
      where: {
        userId,
        date: {
          gte: today,
          lt: tomorrow, // Check for today's date only
        },
      },
    });

    if (existingAttendance) {
      return {
        success: false,
        message: "Attendance already marked for today.",
      };
    }

    // 2. Mark attendance as present if no attendance recorded
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
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to mark attendance. Please try again.",
    };
  }
}
