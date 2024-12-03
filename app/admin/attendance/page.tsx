import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchAllUsers } from "@/lib/definitions";
// import { Input } from "@/components/ui/input";
import AttendanceManagement from "@/components/AttendanceManagement";
export default async function AttendanceManagementPage() {
  const ALL_USERS = await fetchAllUsers();
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Attendance Management</CardTitle>
            <CardDescription>
              Add, edit, or delete attendance records
            </CardDescription>
          </CardHeader>
          <AttendanceManagement ALL_USERS={ALL_USERS} />
        </Card>
      </main>
    </div>
  );
}
