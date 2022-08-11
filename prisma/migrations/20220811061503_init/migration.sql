/*
  Warnings:

  - You are about to drop the column `carrierId` on the `invoice` table. All the data in the column will be lost.
  - You are about to drop the column `invoiceTypeId` on the `invoice` table. All the data in the column will be lost.
  - Made the column `wallet` on table `company` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `company` to the `invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoiceType` to the `invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `company` MODIFY `wallet` DOUBLE NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `invoice` DROP COLUMN `carrierId`,
    DROP COLUMN `invoiceTypeId`,
    ADD COLUMN `company` VARCHAR(191) NOT NULL,
    ADD COLUMN `invoiceType` VARCHAR(191) NOT NULL;
