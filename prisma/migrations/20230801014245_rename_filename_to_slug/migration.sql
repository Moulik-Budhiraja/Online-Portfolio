/*
  Warnings:

  - You are about to drop the column `filename` on the `Blog` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Blog` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Blog` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Blog_filename_key` ON `Blog`;

-- AlterTable
ALTER TABLE `Blog` RENAME COLUMN `filename` TO `slug`;

-- CreateIndex
CREATE UNIQUE INDEX `Blog_slug_key` ON `Blog`(`slug`);
