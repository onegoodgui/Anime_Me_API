/*
  Warnings:

  - You are about to drop the column `name` on the `animes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `animes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `animes` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "animes_name_key";

-- AlterTable
ALTER TABLE "animes" DROP COLUMN "name",
ADD COLUMN     "title" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "animes_title_key" ON "animes"("title");
