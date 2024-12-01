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
  [key: string]: string;
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
  return await prisma.attendance.findFirst({
    where: {
      userId,
    },
  });
};
