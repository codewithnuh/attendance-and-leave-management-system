import React from "react";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

import { fetchAttendanceHistory } from "@/lib/definitions";
import { getUserIdFromSession } from "@/lib/session";

const AttendanceHistoryCard = async () => {
  const userId = await getUserIdFromSession();
  const attendanceHistory = await fetchAttendanceHistory(userId);
  return (
    <TableBody>
      {attendanceHistory.length > 0 ? (
        attendanceHistory.map((record, index) => (
          <TableRow key={index}>
            <TableCell>{record.date}</TableCell>
            <TableCell>{record.status}</TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={2} className="text-center">
            No attendance records found.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export default AttendanceHistoryCard;
