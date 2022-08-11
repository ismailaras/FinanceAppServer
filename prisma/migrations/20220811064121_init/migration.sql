/*
  Warnings:

  - A unique constraint covering the columns `[text]` on the table `invoiceType` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `invoiceType_text_key` ON `invoiceType`(`text`);
