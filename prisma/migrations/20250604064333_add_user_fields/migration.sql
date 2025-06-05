/*
  Warnings:

  - Added the required column `image` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `noofReviews` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `placeName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `review` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviewContent` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "noofReviews" INTEGER NOT NULL,
ADD COLUMN     "placeName" TEXT NOT NULL,
ADD COLUMN     "review" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "reviewContent" TEXT NOT NULL;
