"use server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { createSession } from "../session";
import { redirect } from "next/navigation";
/**
 * Interface representing the result of a login attempt
 * @property success - Whether the login was successful
 * @property message - Optional success message
 * @property error - Optional error message if login failed
 */
interface LoginResult {
  success: boolean;
  message?: string;
  error?: {
    email?: string;
    password?: string;
    general?: string;
  };
}
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid Email Address" }),
  password: z.string(),
});
/**
 * Authenticates a user and creates a session
 *
 * This function handles the complete login flow:
 * 1. Validates the provided email and password
 * 2. Checks if user exists in database
 * 3. Verifies password against stored hash
 * 4. Generates a JWT token
 * 5. Sets the token in an HTTP-only cookie
 *
 * @param formData - Form data containing user credentials
 * @param formData.email - User's email address
 * @param formData.password - User's password (plain text)
 *
 * @returns Promise<LoginResult> Object containing:
 * - success: boolean indicating if login succeeded
 * - message: success message if login succeeded
 * - error: error message if login failed
 *
 * @throws Will not throw errors, but catches and returns them as LoginResult
 *
 * @example
 * const result = await loginUser(formData);
 * if (result.success) {
 *   // Login successful
 * } else {
 *   // Handle error: result.error
 * }
 */
export async function loginUser(formData: FormData): Promise<LoginResult> {
  const rawFormData = {
    email: formData.get("email") as string | null,
    password: formData.get("password") as string | null,
  };
  // Validate input using Zod schema
  const validationResult = loginSchema.safeParse(rawFormData);
  const { email, password } = rawFormData;

  // Handle validation errors
  if (!validationResult.success) {
    const formattedErrors: {
      email?: string;
      password?: string;
      general?: string;
    } = {
      general: validationResult.error.errors
        .map((err) => err.message)
        .join(", "),
    };
    return {
      success: false,
      error: formattedErrors,
    };
  }
  // Basic input validation
  if (!email || !password) {
    return {
      success: false,
      error: {
        email: "Enter correct email",
        password: "Enter correct password",
      },
    };
  }

  try {
    // Fetch user from the database using the provided email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return {
        success: false,
        error: {
          email: "User not found",
        },
      };
    }
    // If user doesn't exist, return an error message
    if (!email || !password) {
      return {
        success: false,
        error: {
          email: "Enter correct email",
          password: "Enter correct password",
        },
      };
    }

    // Validate the provided password with the stored hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return {
        success: false,
        error: {
          password: "Invalid Password",
        },
      };
    }

    await createSession(user.id);
    redirect("/dashboard");
    return {
      success: true,
      message: "Login successful!", // Success message to be sent back
    };
  } catch (error) {
    console.error("Login error:", error); // Log error to server console
    return {
      success: false,
      error: {
        general: "Server Error",
      }, // Error message in case of server issues
    };
  }
}
