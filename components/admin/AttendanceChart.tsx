"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  present: {
    label: "Present",
    color: "hsl(var(--chart-1))",
  },
  absent: {
    label: "Absent",
    color: "hsl(var(--chart-2))",
  },
  leave: {
    label: "Leave",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface WeeklyAttendanceData {
  day: string;
  totalPresent: number;
  totalAbsent: number;
  totalLeave: number;
}

interface AttendanceChartProps {
  WEEKLY_ATTENDANCE_DATA: WeeklyAttendanceData[];
}

export function AttendanceChart({
  WEEKLY_ATTENDANCE_DATA,
}: AttendanceChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Overview</CardTitle>
        <CardDescription>Attendance data for the week</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={WEEKLY_ATTENDANCE_DATA}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)} // Display first 3 letters of day
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar
              dataKey="totalPresent"
              fill="hsl(263.39deg 69.96% 50.39%)"
              radius={4}
            />
            <Bar
              dataKey="totalAbsent"
              fill="hsl(287.46deg 65.05% 40.39%)"
              radius={4}
            />
            <Bar
              dataKey="totalLeave"
              fill="hsl(328.03deg 81.33% 29.41%)"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Attendance trend stable this week <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Displays attendance counts for the week.
        </div>
      </CardFooter>
    </Card>
  );
}
