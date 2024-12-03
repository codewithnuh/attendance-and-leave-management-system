import LeaveSubmissionCard from "@/components/LeaveSubmissionCard";
import { fetchLeaveStatus } from "@/lib/definitions";
import { getUserIdFromSession } from "@/lib/session";

export default async function MarkLeave() {
  const userId = await getUserIdFromSession();
  const leaveStatus = await fetchLeaveStatus(userId);
  console.log({ data: leaveStatus });
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <LeaveSubmissionCard
          userId={userId}
          leaveStatus={leaveStatus?.status}
        />
      </main>
    </div>
  );
}
