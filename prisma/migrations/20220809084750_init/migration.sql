/*
  Warnings:

  - You are about to alter the column `text` on the `invoicetype` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `invoicetype` MODIFY `text` VARCHAR(191) NOT NULL;
