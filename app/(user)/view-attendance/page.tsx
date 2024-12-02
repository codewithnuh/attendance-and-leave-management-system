import { AttendanceHistorySkeleton } from "@/components/attendance-history-skeleton";
import AttendanceHistoryCard from "@/components/AttendanceHistoryCard";
import { fetchAttendanceHistory } from "@/lib/definitions";
import { getUserIdFromSession } from "@/lib/session";
import { Suspense } from "react";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default async function ViewAttendance() {
  const userId = await getUserIdFromSession();
  const attendanceHistory = await fetchAttendanceHistory(userId);
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>View Attendance</CardTitle>
            <CardDescription>Your attendance history</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <Suspense
                fallback={
                  <AttendanceHistorySkeleton
                    totalAttendance={attendanceHistory.length}
                  />
                }
              >
                <AttendanceHistoryCard />
              </Suspense>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
