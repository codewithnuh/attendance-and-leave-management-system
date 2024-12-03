"use server";

import { prisma } from "@/lib/prisma";
import { StatusEnum } from "@prisma/client";

interface UpdateAttendanceParams {
  userId: string;
  date: string; // Format: "YYYY-MM-DD"
  status: string; // "present", "absent", or "leave"
}

/**
 * Updates the attendance record for a specific user on a given date.
 * If a record exists, it will be updated; otherwise, a new record will be created.
 *
 * @param {UpdateAttendanceParams} params - The parameters for updating attendance.
 * @param {string} params.userId - ID of the user whose attendance is to be updated.
 * @param {string} params.date - Date of the attendance record in "YYYY-MM-DD" format.
 * @param {string} params.status - Attendance status ("present", "absent", or "leave").
 * @returns {Promise<{ success: boolean; message: string }>} - Result of the update operation.
 */
export async function updateAttendance({
  userId,
  date,
  status,
}: UpdateAttendanceParams): Promise<{ success: boolean; message: string }> {
  console.log({ dataInServerAction: { userId, date, status } });
  if (!userId || !date || !status) {
    return {
      success: false,
      message: "All fields (user, date, status) are required.",
    };
  }

  try {
    // Parse the date to ensure validity
    const attendanceDate = new Date(date);
    if (isNaN(attendanceDate.getTime())) {
      return {
        success: false,
        message: "Invalid date format.",
      };
    }

    // Update or create the attendance record
    await prisma.attendance.upsert({
      where: {
        userId_date: { userId, date: attendanceDate }, // Assuming a composite unique index on userId and date
      },
      update: {
        status: status as StatusEnum,
      },
      create: {
        userId,
        date: attendanceDate,
        status: status as StatusEnum,
      },
    });

    return {
      success: true,
      message: "Attendance updated successfully.",
    };
  } catch (error) {
    console.error("Error updating attendance:", error);
    return {
      success: false,
      message: "Failed to update attendance. Please try again later.",
    };
  }
}
