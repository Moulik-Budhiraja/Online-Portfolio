-- AlterTable
ALTER TABLE `Blog` ADD COLUMN `content` TEXT NULL,
    ADD COLUMN `headerImageId` VARCHAR(191) NULL,
    ADD COLUMN `headerImageSubtitle` VARCHAR(1000) NULL;

-- CreateTable
CREATE TABLE `BlogDraft` (
    `id` VARCHAR(191) NOT NULL,
    `blogId` VARCHAR(191) NOT NULL,
    `content` TEXT NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `BlogDraft_blogId_key`(`blogId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BlogVersion` (
    `id` VARCHAR(191) NOT NULL,
    `draftId` VARCHAR(191) NOT NULL,
    `versionName` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Blog` ADD CONSTRAINT `Blog_headerImageId_fkey` FOREIGN KEY (`headerImageId`) REFERENCES `Image`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BlogDraft` ADD CONSTRAINT `BlogDraft_blogId_fkey` FOREIGN KEY (`blogId`) REFERENCES `Blog`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `BlogVersion` ADD CONSTRAINT `BlogVersion_draftId_fkey` FOREIGN KEY (`draftId`) REFERENCES `BlogDraft`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
