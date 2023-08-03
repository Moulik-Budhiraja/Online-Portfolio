/*
  Warnings:

  - You are about to drop the column `filename` on the `Image` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Image` DROP COLUMN `filename`,
    ADD COLUMN `slug` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Image_slug_key` ON `Image`(`slug`);
