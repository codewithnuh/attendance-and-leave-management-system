"use client";
import React from "react";
import { TableBody, TableRow, TableCell } from "./ui/table";
import { Button } from "./ui/button";
import { approveLeaveRequest } from "@/lib/actions/approve-leave-request.action";
import { useToast } from "@/hooks/use-toast";
import { declineLeaveRequest } from "@/lib/actions/reject-leave-request.action";
const LeaveRequest = ({ leaveRequests }: { leaveRequests: any }) => {
  const { toast } = useToast();
  const handleApprove = async (leaveId: string) => {
    try {
      const response = await approveLeaveRequest({ leaveId });

      if (response.success) {
        toast({
          title: "Success",
          description: response.message,
          variant: "default",
        });

        // Optionally, refresh the UI (server-side re-render or optimistic update)
        // window.location.reload(); // Simplest approach to refresh data
      } else {
        toast({
          title: "Error",
          description: response.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };
  const handleDecline = async (leaveId: string) => {
    try {
      const response = await declineLeaveRequest({ leaveId });

      if (response.success) {
        toast({
          title: "Success",
          description: response.message,
          variant: "default",
        });

        // Optionally, refresh the UI (server-side re-render or optimistic update)
        // window.location.reload(); // Simplest approach to refresh data
      } else {
        toast({
          title: "Error",
          description: response.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };
  return (
    <TableBody>
      {leaveRequests.map((request: any) => (
        <TableRow key={request.id}>
          <TableCell>{request.user.name}</TableCell>
          <TableCell>
            {new Date(request.startDate).toLocaleDateString()}
          </TableCell>
          <TableCell>
            {new Date(request.endDate).toLocaleDateString()}
          </TableCell>
          <TableCell>{request.leaveReason}</TableCell>
          <TableCell>
            <Button
              variant="outline"
              size="sm"
              className="mr-2"
              onClick={() => handleApprove(request.id)}
            >
              Approve
            </Button>
            <Button
              onClick={() => handleDecline(request.id)}
              variant="destructive"
              size="sm"
            >
              Reject
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default LeaveRequest;
