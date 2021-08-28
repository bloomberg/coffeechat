-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "given_name" TEXT NOT NULL,
    "family_name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "email" (
    "email" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "system_role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_role_assignment" (
    "user_id" TEXT NOT NULL,
    "system_role_id" TEXT NOT NULL,

    PRIMARY KEY ("user_id","system_role_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "system_role.name_unique" ON "system_role"("name");

-- AddForeignKey
ALTER TABLE "email" ADD FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "system_role_assignment" ADD FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "system_role_assignment" ADD FOREIGN KEY ("system_role_id") REFERENCES "system_role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
