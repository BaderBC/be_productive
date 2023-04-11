-- CreateTable
CREATE TABLE "activities" (
    "activity_id" SERIAL NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "description" VARCHAR(200),
    "time_to_spend_weekly" INTEGER NOT NULL,
    "user_email" VARCHAR(254) NOT NULL,
    "time_spent_ms" INTEGER NOT NULL DEFAULT 0,
    "week_number_after_update" SMALLINT DEFAULT date_part('week'::text, now()),
    "session_start" BIGINT,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("activity_id")
);

-- CreateTable
CREATE TABLE "users" (
    "email" VARCHAR(254) NOT NULL,
    "firstname" VARCHAR(40),
    "lastname" VARCHAR(40),
    "password" VARCHAR NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("email")
);

-- CreateIndex
CREATE UNIQUE INDEX "activities_user_email_name_key" ON "activities"("user_email", "name");

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_user_email_fkey" FOREIGN KEY ("user_email") REFERENCES "users"("email") ON DELETE NO ACTION ON UPDATE NO ACTION;
