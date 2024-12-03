"use server";

import { prisma } from "@/lib/prisma";

interface RejectLeaveRequestParams {
  leaveId: string;
}

export async function declineLeaveRequest({
  leaveId,
}: RejectLeaveRequestParams): Promise<{ success: boolean; message: string }> {
  try {
    // Fetch the leave request to ensure it exists
    const leaveRequest = await prisma.leave.findUnique({
      where: { id: +leaveId },
    });

    if (!leaveRequest) {
      return {
        success: false,
        message: "Leave request not found.",
      };
    }

    // Update the status of the leave request to 'Rejected'
    await prisma.leave.update({
      where: { id: +leaveId },
      data: { status: "Declined" },
    });

    return {
      success: true,
      message: "Leave request rejected successfully.",
    };
  } catch (error) {
    console.error("Error rejecting leave request:", error);
    return {
      success: false,
      message: "Failed to reject leave request. Please try again later.",
    };
  }
}
