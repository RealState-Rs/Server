-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('ADMIN', 'SUPERADMIN', 'SELLER', 'BUYER', 'UN_VERIFIEDUSER');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "userPhoneNumber" TEXT NOT NULL,
    "nationalIdFront" TEXT,
    "nationalIdBack" TEXT,
    "nationalIdNumber" TEXT,
    "userHashedPassword" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userEmail_key" ON "public"."User"("userEmail");

-- CreateIndex
CREATE UNIQUE INDEX "User_nationalIdNumber_key" ON "public"."User"("nationalIdNumber");
