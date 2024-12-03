"use server";

import { prisma } from "@/lib/prisma";

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

  try {
    await prisma.leave.create({
      data: {
        userId,
        startDate,
        endDate,
        status: "Pending", // Assuming "Pending" is the default status for a new leave
        leaveReason: reason,
      },
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
