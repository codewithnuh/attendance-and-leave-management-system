"use server";

import { prisma } from "../prisma";

export async function getUserAttendanceData() {
  try {
    const usersData = await prisma.user.findMany({
      where: {
        role: "USER",
      },
      select: {
        id: true,
        name: true,
        email: true,
        attendance: {
          select: {
            status: true,
          },
        },
        leaves: {
          select: {
            id: true, // Optional: Can just count directly below
          },
        },
      },
    });

    // Transform data to include the counts
    const transformedData = usersData.map((user) => {
      const presentCount = user.attendance.filter(
        (a) => a.status === "Present"
      ).length;
      const absentCount = user.attendance.filter(
        (a) => a.status === "Absent"
      ).length;
      const leaveCount = user.leaves.length;

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        presentCount,
        absentCount,
        leaveCount,
      };
    });

    return transformedData;
  } catch (error) {
    console.error("Error fetching attendance data:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteUserServerAction(userId: string) {
  try {
    // Use a Prisma transaction to delete user and related data
    await prisma.$transaction([
      prisma.attendance.deleteMany({ where: { userId } }),
      prisma.leave.deleteMany({ where: { userId } }),
      prisma.user.delete({ where: { id: userId } }),
    ]);

    return {
      success: true,
      message: "User and related data deleted successfully.",
    };
  } catch (error) {
    console.error("Error deleting user data:", error);
    return {
      success: false,
      message: "Failed to delete user. Please try again.",
      error: (error as Error).message,
    };
  }
}
