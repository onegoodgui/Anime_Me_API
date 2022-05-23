/*
  Warnings:

  - You are about to drop the `AnimeGenre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AnimeStreaming` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AnimeUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AnimeGenre" DROP CONSTRAINT "AnimeGenre_animeId_fkey";

-- DropForeignKey
ALTER TABLE "AnimeGenre" DROP CONSTRAINT "AnimeGenre_genreId_fkey";

-- DropForeignKey
ALTER TABLE "AnimeStreaming" DROP CONSTRAINT "AnimeStreaming_animeId_fkey";

-- DropForeignKey
ALTER TABLE "AnimeStreaming" DROP CONSTRAINT "AnimeStreaming_streamingId_fkey";

-- DropForeignKey
ALTER TABLE "AnimeUser" DROP CONSTRAINT "AnimeUser_animeId_fkey";

-- DropForeignKey
ALTER TABLE "AnimeUser" DROP CONSTRAINT "AnimeUser_userId_fkey";

-- DropTable
DROP TABLE "AnimeGenre";

-- DropTable
DROP TABLE "AnimeStreaming";

-- DropTable
DROP TABLE "AnimeUser";

-- CreateTable
CREATE TABLE "animesUsers" (
    "id" SERIAL NOT NULL,
    "animeId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "animesUsers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "animesStreamings" (
    "id" SERIAL NOT NULL,
    "animeId" INTEGER NOT NULL,
    "streamingId" INTEGER NOT NULL,

    CONSTRAINT "animesStreamings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "animesGenres" (
    "id" SERIAL NOT NULL,
    "animeId" INTEGER NOT NULL,
    "genreId" INTEGER NOT NULL,

    CONSTRAINT "animesGenres_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "animesUsers" ADD CONSTRAINT "animesUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animesUsers" ADD CONSTRAINT "animesUsers_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "animes"("dbId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animesStreamings" ADD CONSTRAINT "animesStreamings_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "animes"("dbId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animesStreamings" ADD CONSTRAINT "animesStreamings_streamingId_fkey" FOREIGN KEY ("streamingId") REFERENCES "streamings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animesGenres" ADD CONSTRAINT "animesGenres_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "animes"("dbId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animesGenres" ADD CONSTRAINT "animesGenres_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "genres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
