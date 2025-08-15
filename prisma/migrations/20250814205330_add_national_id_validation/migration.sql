-- CreateEnum
CREATE TYPE "public"."NationalIdStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "public"."ValidationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterEnum
ALTER TYPE "public"."Role" ADD VALUE 'BLOCKED';

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "nationalIdRejectionReason" TEXT,
ADD COLUMN     "nationalIdStatus" "public"."NationalIdStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "nationalIdVerifiedAt" TIMESTAMP(3),
ADD COLUMN     "nationalIdVerifiedBy" INTEGER;

-- CreateTable
CREATE TABLE "public"."NationalIdValidation" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "frontImageUrl" TEXT NOT NULL,
    "backImageUrl" TEXT,
    "nationalIdNumber" TEXT NOT NULL,
    "status" "public"."ValidationStatus" NOT NULL DEFAULT 'PENDING',
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reviewedAt" TIMESTAMP(3),

    CONSTRAINT "NationalIdValidation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."NationalIdValidation" ADD CONSTRAINT "NationalIdValidation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
