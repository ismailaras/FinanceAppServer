-- AlterTable
ALTER TABLE `company` MODIFY `wallet` DOUBLE NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `invoice` MODIFY `comment` VARCHAR(191) NULL;
