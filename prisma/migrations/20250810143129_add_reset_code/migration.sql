-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "resetCode" INTEGER,
ADD COLUMN     "resetCodeExpiry" TIMESTAMP(3);
