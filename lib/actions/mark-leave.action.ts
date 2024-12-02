"use server";

import { prisma } from "@/lib/prisma";
import { LeaveStatusEnum, StatusEnum } from "@prisma/client";

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
  if (!userId || !startDate || !endDate || !reason) {
    return {
      success: false,
      message: "Invalid data provided. Ensure all fields are filled.",
    };
  }
  try {
    if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
      return {
        success: false,
        message: "Invalid date values provided.",
      };
    }

    if (startDate > endDate) {
      return {
        success: false,
        message: "Start date cannot be after the end date.",
      };
    }

    if (!reason || reason.trim() === "") {
      return {
        success: false,
        message: "Leave reason cannot be empty.",
      };
    }

    const overlappingAttendance = await prisma.leave.findFirst({
      where: {
        userId,
        startDate: { gte: startDate },
        endDate: { lte: endDate },
        status: "Approved",
      },
    });

    if (overlappingAttendance) {
      return {
        success: false,
        message:
          "Cannot request leave. You have already marked attendance for one or more of the selected dates.",
      };
    }

    const leaveDays: Date[] = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      leaveDays.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    const leaveRecords = leaveDays.map((date) => ({
      userId,
      startDate: date,
      endDate: date, // Use the date as both startDate and endDate for each record
      status: LeaveStatusEnum.Pending,
      leaveReason: reason,
    }));

    await prisma.leave.createMany({
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
