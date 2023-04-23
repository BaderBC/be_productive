/*
  Warnings:

  - The `session_start` column on the `activities` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "activities" DROP COLUMN "session_start",
ADD COLUMN     "session_start" TIMESTAMP(3);
