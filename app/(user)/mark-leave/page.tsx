import LeaveSubmissionCard from "@/components/LeaveSubmissionCard";
import { getUserIdFromSession } from "@/lib/session";

export default async function MarkLeave() {
  const userId = await getUserIdFromSession();
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <LeaveSubmissionCard userId={userId} />
      </main>
    </div>
  );
}
