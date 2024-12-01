// app/api/get-user-id/route.ts
import { getUserIdFromSession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET() {
  const userId = await getUserIdFromSession();

  if (!userId) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

  return NextResponse.json({ userId });
}
