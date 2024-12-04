import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fetchPendingLeaves } from "@/lib/definitions";
import LeaveRequest from "@/components/LeaveRequest";
export default async function LeaveRequestsPage() {
  // Fetch pending leave requests
  const leaveRequests = await fetchPendingLeaves();

  // Handle leave approval

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Leave Requests</CardTitle>
            <CardDescription>Manage employee leave requests</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <LeaveRequest leaveRequests={leaveRequests} />
            </Table>
            <div>
              {!leaveRequests.length && (
                <h1 className="text-center mt-5 text-3xl">
                  NO LEAVE REQUESTS FOUND
                </h1>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
