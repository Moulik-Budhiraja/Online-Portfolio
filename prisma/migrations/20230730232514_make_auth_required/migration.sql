/*
  Warnings:

  - You are about to drop the column `userId` on the `Auth` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[authId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Auth` DROP FOREIGN KEY `Auth_userId_fkey`;

-- AlterTable
ALTER TABLE `Auth` DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `authId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_authId_key` ON `User`(`authId`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_authId_fkey` FOREIGN KEY (`authId`) REFERENCES `Auth`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
