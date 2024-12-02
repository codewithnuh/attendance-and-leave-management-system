// cron/markAttendanceCron.ts
import cron from "node-cron";
import { markAbsentAttendance } from "../actions/mark-absent.action";

cron.schedule(
  "10 1 * * *",
  (async () => {
    const date = new Date();
    date.setDate(date.getDate() - 1); // Target yesterday's date
    const result = await markAbsentAttendance(date);
    console.log("cronJob");
    console.log(
      `Cron Job: ${result.success ? "Success" : "Failed"} - ${
        result.absentCount || 0
      } users marked absent.`
    );
  })()
);
