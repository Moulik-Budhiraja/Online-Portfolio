/*
  Warnings:

  - You are about to drop the column `authId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Auth` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Auth` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_authId_fkey`;

-- AlterTable
ALTER TABLE `Auth` ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `authId`;

-- CreateIndex
CREATE UNIQUE INDEX `Auth_userId_key` ON `Auth`(`userId`);

-- AddForeignKey
ALTER TABLE `Auth` ADD CONSTRAINT `Auth_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
