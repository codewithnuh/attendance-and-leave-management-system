export interface AttendanceCount {
  totalPresent: number;
  totalAbsent: number;
  totalLeaves: number;
}

export interface WeeklyAttendanceData {
  day: string;
  present: number;
  absent: number;
  leave: number;
}

export interface AttendanceData {
  totalPresent: number;
  totalAbsent: number;
  totalLeaves: number;
  weeklyData: WeeklyAttendanceData[];
}
