/*
  Warnings:

  - The primary key for the `activities` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `activity_id` on the `activities` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "activities" DROP CONSTRAINT "activities_pkey",
DROP COLUMN "activity_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "activities_pkey" PRIMARY KEY ("id");
