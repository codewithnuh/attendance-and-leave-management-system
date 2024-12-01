"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ModeToggle from "@/components/mode-toggle";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import logout from "@/lib/actions/logout.action";

export function Header({ userRole }: { userRole: "user" | "admin" }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const sessionToken = document.cookie.includes("authToken");
    setIsLoggedIn(sessionToken);
  }, []);

  const NavItems = () => (
    <ul className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
      {userRole === "user" ? (
        <>
          <li>
            <Link href="/dashboard" className="hover:text-primary">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/mark-attendance" className="hover:text-primary">
              Mark Attendance
            </Link>
          </li>
          <li>
            <Link href="/mark-leave" className="hover:text-primary">
              Mark Leave
            </Link>
          </li>
          <li>
            <Link href="/view-attendance" className="hover:text-primary">
              View Attendance
            </Link>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link href="/admin/dashboard" className="hover:text-primary">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/admin/users" className="hover:text-primary">
              Users
            </Link>
          </li>
          <li>
            <Link href="/admin/attendance" className="hover:text-primary">
              Attendance
            </Link>
          </li>
          <li>
            <Link href="/admin/leave-requests" className="hover:text-primary">
              Leave Requests
            </Link>
          </li>
          <li>
            <Link href="/admin/reports" className="hover:text-primary">
              Reports
            </Link>
          </li>
          <li>
            <Link href="/admin/grading" className="hover:text-primary">
              Grading
            </Link>
          </li>
        </>
      )}
    </ul>
  );

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          ALMS
        </Link>
        <nav className="hidden md:block">
          <NavItems />
        </nav>
        <div className="flex items-center space-x-4">
          <form action={logout}>
            <Button
              type="submit"
              variant="ghost"
              className="hidden md:inline-flex"
            >
              Logout
            </Button>
          </form>
          <ModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetTitle>Menu</SheetTitle>
              <nav className="flex flex-col space-y-4">
                <NavItems />
                <form action={logout}>
                  <Button
                    type="submit"
                    variant="ghost"
                    className="w-full justify-start"
                  >
                    Logout
                  </Button>
                </form>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
