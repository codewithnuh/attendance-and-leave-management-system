import { Skeleton } from "@/components/ui/skeleton";
import { TableBody, TableCell, TableRow } from "./ui/table";

export function AttendanceHistorySkeleton({
  totalAttendance,
}: {
  totalAttendance: number;
}) {
  return (
    <TableBody>
      {[...Array(totalAttendance)].map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <Skeleton className="h-4 w-24" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-16" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
