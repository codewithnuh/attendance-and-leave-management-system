// app/actions/login.ts
"use server";

import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function loginUser(data: FormData) {
  const email = data.get("email") as string;
  const password = data.get("password") as string;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid email or password.");
  }

  // Generate a session token (mock implementation)
  const token = `mock-token-${user.id}`;
  (await cookies()).set("token", token, { httpOnly: true });

  return user.role; // Return role to redirect users/admin
}
