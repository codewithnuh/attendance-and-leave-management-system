"use server";
import { prisma } from "@/lib/prisma";
import { startOfWeek, endOfWeek } from "date-fns";

interface WeeklyAttendance {
  day: string;
  totalPresent: number;
  totalAbsent: number;
  totalLeave: number;
}

// Helper function to get day names
const getDayName = (date: Date): string =>
  date.toLocaleString("en-US", { weekday: "long" });

export async function getWeeklyAttendanceData(): Promise<WeeklyAttendance[]> {
  // Get start and end of the current week
  const now = new Date();
  const startWeek = startOfWeek(now, { weekStartsOn: 1 }); // Monday as the first day of the week
  const endWeek = endOfWeek(now, { weekStartsOn: 1 });

  // Fetch attendance grouped by date and status
  const attendanceData = await prisma.attendance.groupBy({
    by: ["date", "status"],
    where: {
      date: {
        gte: startWeek,
        lte: endWeek,
      },
    },
    _count: {
      status: true,
    },
  });

  // Aggregate results by day
  const weeklyData = attendanceData.reduce<Record<string, WeeklyAttendance>>(
    (acc, { date, status, _count }) => {
      const day = getDayName(date);
      if (!acc[day]) {
        acc[day] = {
          day,
          totalPresent: 0,
          totalAbsent: 0,
          totalLeave: 0,
        };
      }
      if (status === "Present") acc[day].totalPresent += _count.status;
      if (status === "Absent") acc[day].totalAbsent += _count.status;
      if (status === "Leave") acc[day].totalLeave += _count.status;
      return acc;
    },
    {}
  );

  // Return as an array sorted by weekday order
  const sortedDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  return sortedDays.map(
    (day) =>
      weeklyData[day] || { day, totalPresent: 0, totalAbsent: 0, totalLeave: 0 }
  );
}
