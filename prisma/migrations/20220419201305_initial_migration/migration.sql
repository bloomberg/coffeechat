-- CreateEnum
CREATE TYPE "system_role" AS ENUM ('ADMINISTRATOR');

-- CreateEnum
CREATE TYPE "system_action_type" AS ENUM ('INITIAL_SYSTEM_ADMIN_CLAIM');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "given_name" TEXT NOT NULL,
    "family_name" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "email" (
    "email" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "email_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "system_role_assignment" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "role" "system_role" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "system_role_assignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_actions" (
    "id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "type" "system_action_type" NOT NULL,
    "related_id" TEXT NOT NULL,

    CONSTRAINT "system_actions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "system_role_assignment_role_idx" ON "system_role_assignment"("role");

-- AddForeignKey
ALTER TABLE "email" ADD CONSTRAINT "email_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "system_role_assignment" ADD CONSTRAINT "system_role_assignment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "system_actions" ADD CONSTRAINT "system_actions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
