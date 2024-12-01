import AttendanceCard from "@/components/AttendanceCard";
import { fetchAttendanceStatus } from "@/lib/definitions";
import { getUserIdFromSession } from "@/lib/session";
export default async function MarkAttendance() {
  const userId = await getUserIdFromSession();
  const attendance = await fetchAttendanceStatus(userId);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <AttendanceCard status={attendance?.status} userId={userId} />
      </main>
    </div>
  );
}
