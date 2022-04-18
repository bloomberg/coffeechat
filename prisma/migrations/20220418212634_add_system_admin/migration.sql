/*
  Warnings:

  - The primary key for the `system_role_assignment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[user_id,system_role_id]` on the table `system_role_assignment` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `system_role_assignment` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- CreateEnum
CREATE TYPE "system_action_type" AS ENUM ('ASSIGN_SYSTEM_ROLE');

-- DropForeignKey
ALTER TABLE "email" DROP CONSTRAINT "email_user_id_fkey";

-- DropForeignKey
ALTER TABLE "system_role_assignment" DROP CONSTRAINT "system_role_assignment_system_role_id_fkey";

-- DropForeignKey
ALTER TABLE "system_role_assignment" DROP CONSTRAINT "system_role_assignment_user_id_fkey";

-- AlterTable
ALTER TABLE "system_role_assignment" DROP CONSTRAINT "system_role_assignment_pkey",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "system_role_assignment_pkey" PRIMARY KEY ("id");

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
CREATE UNIQUE INDEX "system_role_assignment_user_id_system_role_id_key" ON "system_role_assignment"("user_id", "system_role_id");

-- AddForeignKey
ALTER TABLE "email" ADD CONSTRAINT "email_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "system_role_assignment" ADD CONSTRAINT "system_role_assignment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "system_role_assignment" ADD CONSTRAINT "system_role_assignment_system_role_id_fkey" FOREIGN KEY ("system_role_id") REFERENCES "system_role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "system_actions" ADD CONSTRAINT "system_actions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "system_role.name_unique" RENAME TO "system_role_name_key";
