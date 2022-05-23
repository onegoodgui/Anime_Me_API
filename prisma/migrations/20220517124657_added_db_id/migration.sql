/*
  Warnings:

  - Added the required column `dbId` to the `animes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "animes" ADD COLUMN     "dbId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "images" (
    "id" SERIAL NOT NULL,
    "animeId" INTEGER NOT NULL,
    "large" TEXT NOT NULL,
    "medium" TEXT,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "animes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
