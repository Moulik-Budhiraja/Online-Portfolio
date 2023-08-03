/*
  Warnings:

  - You are about to drop the column `slug` on the `Image` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[filename]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `filename` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Image_slug_key` ON `Image`;

-- AlterTable
ALTER TABLE `Image` DROP COLUMN `slug`,
    ADD COLUMN `filename` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Image_filename_key` ON `Image`(`filename`);
