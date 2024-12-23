"use server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { createSession } from "../session";

// Define validation schema
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

// Login action
export async function loginUser(formData: FormData): Promise<{
  success: boolean;
  message?: string;
  errors?: { [key: string]: string[] };
}> {
  const rawFormData = {
    email: formData.get("email") as string | null,
    password: formData.get("password") as string | null,
  };

  const validationResult = loginSchema.safeParse(rawFormData);
  if (!validationResult.success) {
    return {
      success: false,
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validationResult.data;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return { success: false, errors: { email: ["User not found"] } };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { success: false, errors: { password: ["Invalid password"] } };
    }

    const isAdmin = user.role === "ADMIN"; // Assuming `role` column in database
    await createSession(user.id, isAdmin);

    return { success: true, message: "Login successful!" };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, errors: { general: ["An error occurred"] } };
  }
}
