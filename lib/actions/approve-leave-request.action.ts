"use server";

import { prisma } from "@/lib/prisma";

interface ApproveLeaveRequestParams {
  leaveId: string; // ID of the leave request being approved
}

export async function approveLeaveRequest({
  leaveId,
}: ApproveLeaveRequestParams): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    // Fetch the leave request details
    const leave = await prisma.leave.findUnique({
      where: { id: +leaveId },
      include: { user: true }, // Include user details for logging or further actions
    });

    if (!leave) {
      return { success: false, message: "Leave request not found." };
    }

    const { userId, startDate, endDate } = leave;

    // Validate that startDate and endDate are present
    if (!startDate || !endDate) {
      return {
        success: false,
        message: "Leave request is missing start or end date.",
      };
    }

    // Populate attendance records with "Leave" status
    const leaveDates = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      leaveDates.push(new Date(currentDate)); // Collect each leave day
      currentDate.setDate(currentDate.getDate() + 1); // Increment day
    }

    // Upsert (insert or overwrite) attendance records for the leave days
    const attendanceUpdates = leaveDates.map((date) =>
      prisma.attendance.upsert({
        where: {
          userId_date: {
            userId,
            date,
          },
        },
        update: {
          status: "Leave", // Overwrite with Leave status
        },
        create: {
          userId,
          date,
          status: "Leave", // Set Leave status
        },
      })
    );

    // Approve the leave request and update attendance in a single transaction
    await prisma.$transaction([
      ...attendanceUpdates,
      prisma.leave.update({
        where: { id: +leaveId },
        data: { status: "Approved" },
      }),
    ]);

    return {
      success: true,
      message: "Leave request approved and attendance updated.",
    };
  } catch (error) {
    console.error("Error in approveLeaveRequest:", error);
    return {
      success: false,
      message: "An error occurred while approving the leave request.",
    };
  }
}
