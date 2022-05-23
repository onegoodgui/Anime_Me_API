/*
  Warnings:

  - A unique constraint covering the columns `[dbId]` on the table `animes` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "AnimeGenre" DROP CONSTRAINT "AnimeGenre_animeId_fkey";

-- DropForeignKey
ALTER TABLE "AnimeStreaming" DROP CONSTRAINT "AnimeStreaming_animeId_fkey";

-- DropForeignKey
ALTER TABLE "AnimeUser" DROP CONSTRAINT "AnimeUser_animeId_fkey";

-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "images_animeId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "animes_dbId_key" ON "animes"("dbId");

-- AddForeignKey
ALTER TABLE "AnimeUser" ADD CONSTRAINT "AnimeUser_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "animes"("dbId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "animes"("dbId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimeStreaming" ADD CONSTRAINT "AnimeStreaming_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "animes"("dbId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimeGenre" ADD CONSTRAINT "AnimeGenre_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "animes"("dbId") ON DELETE RESTRICT ON UPDATE CASCADE;
