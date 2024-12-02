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
import { Menu } from "lucide-react";
import logout from "@/lib/actions/logout.action";
import { USER_NAV_ITEMS } from "@/constants";

export function Header({ userRole }: { userRole: "user" | "admin" }) {
  const NavItems = () => (
    <ul className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 mt-6 sm:mt-0">
      {userRole === "user" ? (
        <>
          {USER_NAV_ITEMS.map((item, index) => (
            <li key={index}>
              <Link href={item.link} className="hover:text-primary ">
                {item.label}
              </Link>
            </li>
          ))}
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
        <nav className="hidden md:block ">
          <NavItems />
        </nav>
        <div className="flex items-center space-x-4">
          <form action={logout}>
            <Button
              type="submit"
              variant="ghost"
              className="hidden md:inline-flex bg-primary"
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
              <SheetTitle className="sr-only">Menu</SheetTitle>

              <nav className="flex flex-col space-y-4">
                <NavItems />
                <form action={logout}>
                  <Button
                    type="submit"
                    variant="ghost"
                    className="w-full justify-start bg-primary"
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
