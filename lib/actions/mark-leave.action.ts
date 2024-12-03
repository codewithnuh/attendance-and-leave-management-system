"use server";

import { prisma } from "@/lib/prisma";
import { StatusEnum } from "@prisma/client";

interface LeaveRequest {
  userId: string;
  startDate: Date;
  endDate: Date;
  reason: string;
}

interface LeaveResult {
  success: boolean;
  message: string;
  error?: string;
}

export async function markLeave({
  userId,
  startDate,
  endDate,
  reason,
}: LeaveRequest): Promise<LeaveResult> {
  try {
    // Validate startDate and endDate
    if (startDate > endDate) {
      return {
        success: false,
        message: "Start date cannot be after the end date.",
      };
    }

    // Check if user has marked attendance for any of the requested dates
    const overlappingAttendance = await prisma.attendance.findFirst({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
        status: "Present", // Conflicting status
      },
    });

    if (overlappingAttendance) {
      return {
        success: false,
        message:
          "Cannot request leave. You have already marked attendance for one or more of the selected dates.",
      };
    }

    // Create leave entries for each day in the requested range
    const leaveDays: Date[] = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      leaveDays.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    const leaveRecords = leaveDays.map((date) => ({
      userId,
      date,
      status: StatusEnum.Leave,
      leaveReason: reason,
    }));

    await prisma.attendance.createMany({
      data: leaveRecords,
    });

    return {
      success: true,
      message: "Leave request submitted successfully!",
    };
  } catch (error) {
    console.error("Error in markLeave:", error);
    return {
      success: false,
      message: "Failed to submit leave request. Please try again later.",
      error: error.message,
    };
  }
}
