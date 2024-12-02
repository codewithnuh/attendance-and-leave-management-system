"use server";

import { prisma } from "@/lib/prisma";

interface AttendanceResult {
  success: boolean;
  message: string;
}

/**
 * Marks attendance for a user unless:
 * 1. Attendance for today is already marked.
 * 2. The user has an approved leave for today.
 *
 * @param userId - The user's ID to mark attendance for.
 * @returns {Promise<AttendanceResult>} - Result of the attendance action.
 */
export async function markAttendance(
  userId: string
): Promise<AttendanceResult> {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to the start of the day
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1); // Start of tomorrow

  try {
    // 1. Check if attendance is already marked for today
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

    // 2. Check if the user has an approved leave for today
    const approvedLeave = await prisma.leave.findFirst({
      where: {
        userId,
        status: "Approved",
        OR: [
          {
            startDate: {
              lte: today, // Leave started on or before today
            },
            endDate: {
              gte: today, // Leave ends on or after today
            },
          },
        ],
      },
    });

    if (approvedLeave) {
      return {
        success: false,
        message: "User is on approved leave. Attendance not required.",
      };
    }

    // 3. Mark attendance as Present if no attendance or leave
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
    console.error("Error marking attendance:", error);
    return {
      success: false,
      message: "Failed to mark attendance. Please try again.",
    };
  }
}
