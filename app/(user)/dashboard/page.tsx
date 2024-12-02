import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchUserDetails } from "@/lib/definitions";
import { getUserIdFromSession } from "@/lib/session";
import ProfileInfo from "@/components/ProfileInfo";

export default async function Dashboard() {
  const userId = await getUserIdFromSession();
  const userDetails = await fetchUserDetails(userId);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Mark Attendance</CardTitle>
              <CardDescription>Record your daily attendance</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/mark-attendance">Mark Attendance</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Mark Leave</CardTitle>
              <CardDescription>Submit a leave request</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/mark-leave">Mark Leave</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>View Attendance</CardTitle>
              <CardDescription>Check your attendance history</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/view-attendance">View Attendance</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        <ProfileInfo userId={userId} userDetails={userDetails} />
      </main>
    </div>
  );
}
