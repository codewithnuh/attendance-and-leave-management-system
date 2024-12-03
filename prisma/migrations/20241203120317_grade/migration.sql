-- CreateTable
CREATE TABLE "Grade" (
    "id" TEXT NOT NULL,
    "grade" TEXT NOT NULL,
    "minAttendance" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Grade_pkey" PRIMARY KEY ("id")
);
