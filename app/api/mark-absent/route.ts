import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Get today's date in ISO format and remove the time part for comparison
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format

    // Fetch users with approved leave that covers today
    const studentsOnLeave = await prisma.leave.findMany({
      where: {
        status: "Approved",
        startDate: { lte: new Date(today) }, // Leave starts on or before today
        endDate: { gte: new Date(today) }, // Leave ends on or after today
      },
      include: {
        user: true, // Include user details for better traceability
      },
    });

    // Loop through each leave and update attendance if necessary
    for (const leave of studentsOnLeave) {
      const existingAttendance = await prisma.attendance.findFirst({
        where: {
          userId: leave.userId,
          date: {
            // Match the date exactly without time
            gte: new Date(today), // Ensure the date comparison only considers the date
            lt: new Date(
              new Date(today).setDate(new Date(today).getDate() + 1)
            ), // Exclude the next day
          },
        },
      });

      // Mark the user as absent if attendance is not marked as "Present"
      if (!existingAttendance || existingAttendance.status !== "Present") {
        await prisma.attendance.upsert({
          where: {
            userId_date: {
              userId: leave.userId,
              date: new Date(today), // Use the exact date without time
            },
          },
          update: {
            status: "Absent",
          },
          create: {
            userId: leave.userId,
            date: new Date(today), // Use the exact date without time
            status: "Absent",
          },
        });
      }
    }

    return NextResponse.json({
      message: "Absent students marked successfully.",
    });
  } catch (error) {
    console.error("Error marking students absent:", error);
    return NextResponse.json(
      { error: "Error marking students absent." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
