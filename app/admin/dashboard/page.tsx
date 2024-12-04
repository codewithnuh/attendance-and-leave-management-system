import { AttendanceChart } from "@/components/admin/AttendanceChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserAttendanceData } from "@/lib/actions/user-details.action";
export default async function AdminDashboard() {
  const ALL_USERS_ATTENDANCE_DATA = await getUserAttendanceData();
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
              <div className="text-2xl font-bold">120</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Absent
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Leaves
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
            </CardContent>
          </Card>
        </div>
        <AttendanceChart />
      </main>
    </div>
  );
}
