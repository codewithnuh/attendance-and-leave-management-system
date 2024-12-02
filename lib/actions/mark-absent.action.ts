// app/actions/attendance.ts
"use server";

import { prisma } from "@/lib/prisma";

export async function markAbsentAttendance(date: Date) {
  try {
    const usersWithoutAttendance = await prisma.$queryRaw`
      SELECT u.id AS userId
      FROM User u
      LEFT JOIN Attendance a ON a.userId = u.id AND a.date = ${date}
      LEFT JOIN Leave l ON l.userId = u.id 
        AND l.status = 'Approved'
        AND ${date} BETWEEN l.startDate AND l.endDate
      WHERE a.id IS NULL AND l.id IS NULL
    `;

    for (const user of usersWithoutAttendance) {
      await prisma.attendance.create({
        data: {
          userId: user.userId,
          date,
          status: "Absent",
          markedBy: "System",
        },
      });
    }

    return {
      success: true,
      absentCount: usersWithoutAttendance.length,
    };
  } catch (error) {
    console.error("Error marking attendance:", error);
    return { success: false, error: "Failed to mark attendance." };
  }
}
