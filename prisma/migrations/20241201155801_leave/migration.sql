/*
  Warnings:

  - You are about to drop the column `leaveReason` on the `Attendance` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Attendance" DROP COLUMN "leaveReason";

-- AlterTable
ALTER TABLE "Leave" ADD COLUMN     "leaveReason" TEXT;
