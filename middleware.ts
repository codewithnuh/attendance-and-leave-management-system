import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";

// Define route types
const protectedRoutes = [
  "/dashboard",
  "/mark-attendance",
  "/mark-leave",
  "/view-attendance",
];
const publicRoutes = ["/", "/admin"];
const restrictedRoutes = ["/admin/dashboard", "/admin/grading"];
const userOnlyRoutes = [
  "/dashboard",
  "/mark-attendance",
  "/mark-leave",
  "/view-attendance",
]; // Restricted for admins

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Handle favicon or other static assets
  if (
    path === "/favicon.ico" ||
    path.startsWith("/_next") ||
    path.startsWith("/static")
  ) {
    return NextResponse.next();
  }

  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  const isRestrictedRoute = restrictedRoutes.includes(path);
  const isUserOnlyRoute = userOnlyRoutes.includes(path);

  // Retrieve session
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  // 1. If not authenticated and on a protected route, redirect to public home
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  // 2. If authenticated and on a public route, redirect to the dashboard
  if (isPublicRoute && session?.userId && !path.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  // 3. Restrict admin from accessing user-only routes
  if (isUserOnlyRoute && session?.isAdmin) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.nextUrl));
  }

  // 4. Restrict non-admins from accessing admin-only routes
  if (isRestrictedRoute && !session?.isAdmin) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

// Exclude API routes, static files, images, and other unnecessary paths
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.png$|.*\\.ico$|.*\\.jpg$|.*\\.svg$).*)",
  ],
};
