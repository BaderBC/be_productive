/*
  Warnings:

  - You are about to drop the column `is_active` on the `activities` table. All the data in the column will be lost.
  - You are about to drop the column `session_start` on the `activities` table. All the data in the column will be lost.
  - You are about to drop the column `time_spent_ms` on the `activities` table. All the data in the column will be lost.
  - You are about to drop the column `week_number_after_update` on the `activities` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "activities" DROP CONSTRAINT "activities_user_id_fkey";

-- AlterTable
ALTER TABLE "activities" DROP COLUMN "is_active",
DROP COLUMN "session_start",
DROP COLUMN "time_spent_ms",
DROP COLUMN "week_number_after_update";

-- CreateTable
CREATE TABLE "activity_week_session" (
    "id" SERIAL NOT NULL,
    "activity_id" INTEGER NOT NULL,
    "time_to_spend_weekly" INTEGER NOT NULL,
    "time_spent_ms" INTEGER NOT NULL DEFAULT 0,
    "session_start" TIMESTAMP(3),
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "week_number" SMALLINT NOT NULL DEFAULT date_part('week'::text, now()),
    "year" SMALLINT NOT NULL DEFAULT date_part('year'::text, now()),

    CONSTRAINT "activity_week_session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "activity_week_session_activity_id_week_number_year_key" ON "activity_week_session"("activity_id", "week_number", "year");

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_week_session" ADD CONSTRAINT "activity_week_session_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "activities"("id") ON DELETE CASCADE ON UPDATE CASCADE;
