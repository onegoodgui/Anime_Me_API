/*
  Warnings:

  - You are about to drop the column `score` on the `animes` table. All the data in the column will be lost.
  - Added the required column `averageScore` to the `animes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "animes" DROP COLUMN "score",
ADD COLUMN     "averageScore" INTEGER NOT NULL;
