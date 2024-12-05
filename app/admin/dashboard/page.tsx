import { AttendanceChart } from "@/components/admin/AttendanceChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getWeeklyAttendanceData } from "@/lib/actions/summary-data.action";
import { getUserAttendanceData } from "@/lib/actions/user-details.action";
export const dynamic = "force-dynamic";
export default async function AdminDashboard() {
  const ATTENDANCE_DATA = await getUserAttendanceData();
  const WEEKLY_ATTENDANCE_DATA = await getWeeklyAttendanceData();
  const totalPresent = ATTENDANCE_DATA.reduce(
    (sum, record) => sum + record.presentCount,
    0
  );
  const totalAbsent = ATTENDANCE_DATA.reduce(
    (sum, record) => sum + record.absentCount,
    0
  );
  const totalLeaves = ATTENDANCE_DATA.reduce(
    (sum, record) => sum + record.leaveCount,
    0
  );

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Present
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPresent}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Absent
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalAbsent}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Leaves
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalLeaves}</div>
            </CardContent>
          </Card>
        </div>
        <AttendanceChart WEEKLY_ATTENDANCE_DATA={WEEKLY_ATTENDANCE_DATA} />
      </main>
    </div>
  );
}
