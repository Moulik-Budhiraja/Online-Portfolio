-- AlterTable
ALTER TABLE `Activity` ADD COLUMN `path` VARCHAR(500) NULL,
    MODIFY `ip` VARCHAR(255) NULL,
    MODIFY `country` VARCHAR(255) NULL,
    MODIFY `region` VARCHAR(255) NULL,
    MODIFY `city` VARCHAR(255) NULL,
    MODIFY `timezone` VARCHAR(255) NULL,
    MODIFY `userAgent` VARCHAR(500) NULL;
