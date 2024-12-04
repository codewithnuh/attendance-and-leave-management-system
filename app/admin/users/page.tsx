import UserDetails from "@/components/admin/UserDetails";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUserAttendanceData } from "@/lib/actions/user-details.action";
export const dynamic = "force-dynamic";
export default async function UserManagement() {
  const ALL_USERS_ATTENDANCE_DATA = await getUserAttendanceData();
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Manage system users</CardDescription>
          </CardHeader>
          <UserDetails ALL_USERS_ATTENDANCE_DATA={ALL_USERS_ATTENDANCE_DATA} />
        </Card>
      </main>
    </div>
  );
}
