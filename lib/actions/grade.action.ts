"use server";
import { prisma } from "@/lib/prisma";
export async function addGrade(grade: string, minAttendance: number) {
  try {
    const newGrade = await prisma.grade.create({
      data: {
        grade,
        minAttendance,
      },
    });
    return {
      success: true,
      data: newGrade,
    };
  } catch (error) {
    console.error("Error adding grade:", error);
    return {
      success: false,
      message: "Failed to add grade.",
    };
  }
}
export async function deleteGrade(gradeId: string) {
  try {
    await prisma.grade.delete({
      where: {
        id: gradeId,
      },
    });
    return {
      success: true,
      message: "Grade deleted successfully.",
    };
  } catch (error) {
    console.error("Error deleting grade:", error);
    return {
      success: false,
      message: "Failed to delete grade.",
    };
  }
}
export async function fetchAllGrades() {
  try {
    const allGrades = await prisma.grade.findMany({});
    return allGrades;
  } catch (error) {
    // console.error("Error deleting grade:", error);
    return {
      success: false,
      message: "Failed to fetch grades.",
    };
  }
}
