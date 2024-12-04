import { z } from "zod";
import { prisma } from "./prisma";

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(8, "Password should be at least 8 characters"),
  //   profilePicture: z
  //     .instanceof(FileList)
  //     .optional()
  //     .refine(
  //       (files) =>
  //         !files || files.length === 0 || files[0].size <= 2 * 1024 * 1024,
  //       {
  //         message: "Profile picture should not exceed 2MB",
  //       }
  //     ),
});
// Define the structure of the session payload
export interface SessionPayload {
  userId: string; // Unique user identifier
  isAdmin: boolean; // Is the user an admin?
  expiresAt: string; // Expiration time of the session
  [key: string]: string | boolean;
}

export type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export const fetchAttendanceStatus = async (userId: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to the start of the day
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1); // Start of the next day

  return await prisma.attendance.findFirst({
    where: {
      userId,
      date: {
        gte: today, // Greater than or equal to the start of today
        lt: tomorrow, // Less than the start of tomorrow (ensures only today's record)
      },
    },
  });
};

export const fetchUserDetails = async (id: string) => {
  return await prisma.user.findFirst({
    where: {
      id,
    },
  });
};
// utils/fetchAttendanceStatus.ts

export const fetchAttendanceHistory = async (userId: string) => {
  // Fetch all attendance records for the user
  const attendanceRecords = await prisma.attendance.findMany({
    where: {
      userId,
    },
    orderBy: {
      date: "desc", // Orders records by the most recent first
    },
  });

  return attendanceRecords.map((record) => ({
    date: record.date.toISOString().split("T")[0], // Format date as YYYY-MM-DD
    status: record.status,
  }));
};
export const fetchLeaveStatus = async (userId: string) => {
  const attendanceStatus = await prisma.leave.findFirst({
    where: {
      userId,
    },
  });
  return attendanceStatus;
};
export const fetchPendingLeaves = async () => {
  const pendingLeaves = await prisma.leave.findMany({
    where: {
      status: "Pending",
    },
    include: {
      user: true,
    },
  });
  return pendingLeaves;
};
export const fetchAllUsers = async () => {
  const allUsers = await prisma.user.findMany({
    where: {
      role: "USER",
    },
  });
  return allUsers;
};
