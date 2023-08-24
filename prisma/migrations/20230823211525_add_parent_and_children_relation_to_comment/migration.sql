-- DropIndex
DROP INDEX `Comment_parentId_key` ON `Comment`;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `Comment`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
