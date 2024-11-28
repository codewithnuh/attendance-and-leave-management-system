import Link from "next/link";
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/mode-toggle";

export function Header({ userRole }: { userRole: "user" | "admin" }) {
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
          <Button variant="ghost">Logout</Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
