/*
  Warnings:

  - You are about to drop the column `backImageUrl` on the `NationalIdValidation` table. All the data in the column will be lost.
  - You are about to drop the column `frontImageUrl` on the `NationalIdValidation` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."FileType" AS ENUM ('VERIFICATION', 'PROPERTY', 'AVATAR', 'DOCUMENT');

-- AlterTable
ALTER TABLE "public"."NationalIdValidation" DROP COLUMN "backImageUrl",
DROP COLUMN "frontImageUrl",
ADD COLUMN     "backImageId" TEXT DEFAULT 'null',
ADD COLUMN     "frontImageId" TEXT NOT NULL DEFAULT 'null';

-- CreateTable
CREATE TABLE "public"."File" (
    "id" TEXT NOT NULL,
    "type" "public"."FileType" NOT NULL,
    "url" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."NationalIdValidation" ADD CONSTRAINT "NationalIdValidation_frontImageId_fkey" FOREIGN KEY ("frontImageId") REFERENCES "public"."File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."NationalIdValidation" ADD CONSTRAINT "NationalIdValidation_backImageId_fkey" FOREIGN KEY ("backImageId") REFERENCES "public"."File"("id") ON DELETE SET NULL ON UPDATE CASCADE;
