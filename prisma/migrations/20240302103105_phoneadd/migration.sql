/*
  Warnings:

  - Added the required column `phone` to the `Admin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `admin` ADD COLUMN `phone` VARCHAR(191) NOT NULL;
