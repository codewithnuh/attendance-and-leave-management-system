"use client";
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/mode-toggle";
import Link from "next/link";
import { useState, useEffect } from "react";
import logout from "@/lib/actions/logout.action"; // Assuming logout function clears the session
export function Header({ userRole }: { userRole: "user" | "admin" }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks if the user is logged in

  useEffect(() => {
    // Check if user is logged in by checking the session or cookie
    const sessionToken = document.cookie.includes("authToken"); // Example: Check if "authToken" exists in cookies
    setIsLoggedIn(sessionToken);
  }, []);
  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          ALMS
        </Link>
        <nav>
          <ul className="flex space-x-4">
            {userRole === "user" ? (
              <>
                <li>
                  <Link href="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link href="/mark-attendance">Mark Attendance</Link>
                </li>
                <li>
                  <Link href="/mark-leave">Mark Leave</Link>
                </li>
                <li>
                  <Link href="/view-attendance">View Attendance</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/admin/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link href="/admin/users">Users</Link>
                </li>
                <li>
                  <Link href="/admin/attendance">Attendance</Link>
                </li>
                <li>
                  <Link href="/admin/leave-requests">Leave Requests</Link>
                </li>
                <li>
                  <Link href="/admin/reports">Reports</Link>
                </li>
                <li>
                  <Link href="/admin/grading">Grading</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          <form action={logout}>
            <Button type="submit" variant="ghost">
              Logout
            </Button>
          </form>
          )
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
