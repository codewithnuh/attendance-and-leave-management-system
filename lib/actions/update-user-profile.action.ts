"use server";

import { prisma } from "@/lib/prisma";

export async function updateUserProfile(
  userId: string,
  { name, profilePicture }: { name: string; profilePicture: string }
) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { name, profilePicture },
    });
    return { success: true };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { success: false };
  }
}
