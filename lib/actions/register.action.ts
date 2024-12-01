"use server";

/**
 * User Registration Module
 *
 * This module handles user registration functionality including:
 * - Input validation using Zod schema
 * - Password requirements enforcement
 * - Duplicate email checking
 * - Secure password hashing
 * - User creation in database
 */

import { z } from "zod";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { createSession } from "../session";

/**
 * Validation schema for user registration
 * Enforces requirements for name, email and password fields
 */
const registerSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name cannot exceed 50 characters" }),

  email: z
    .string()
    .email({ message: "Invalid email address" })
    .max(100, { message: "Email cannot exceed 100 characters" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[!@#$%^&*()]/, {
      message: "Password must contain at least one special character",
    }),
});

/**
 * Interface defining the structure of the registration action result
 * @property success - Indicates if registration was successful
 * @property message - Optional success message
 * @property errors - Optional validation/registration errors by field
 */
interface ActionResult {
  success: boolean;
  message?: string;
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
}

/**
 * Handles user registration process
 * @param formData - Form data containing user registration details
 * @returns Promise<ActionResult> - Result of registration attempt
 */
export async function registerUser(formData: FormData): Promise<ActionResult> {
  // Extract fields from FormData
  const rawFormData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  // Validate input using Zod schema
  const validationResult = registerSchema.safeParse(rawFormData);

  // Handle validation errors
  if (!validationResult.success) {
    return {
      success: false,
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validationResult.data.email },
    });

    if (existingUser) {
      return {
        success: false,
        errors: {
          email: ["This email is already registered"],
        },
      };
    }

    // Hash password and create the user
    const hashedPassword = await bcrypt.hash(
      validationResult.data.password,
      10
    );

    const user = await prisma.user.create({
      data: {
        name: validationResult.data.name,
        email: validationResult.data.email,
        password: hashedPassword,
      },
    });
    // Create session for the new user
    await createSession(user.id);
    return {
      success: true,
      message: "User registered successfully!",
    };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      errors: {
        email: ["Failed to register. Please try again."],
      },
    };
  }
}
