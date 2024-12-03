import UserDetails from "@/components/admin/UserDetails";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUserAttendanceData } from "@/lib/actions/user-details.action";
export default async function UserManagement() {
  const ALL_USERS = await getUserAttendanceData();
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Manage system users</CardDescription>
            <UserDetails ALL_USERS={ALL_USERS} />
          </CardHeader>
        </Card>
      </main>
    </div>
  );
}
