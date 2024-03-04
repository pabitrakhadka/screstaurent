/*
  Warnings:

  - You are about to drop the column `adress` on the `orderuserdata` table. All the data in the column will be lost.
  - Added the required column `address` to the `OrderUserData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orderuserdata` DROP COLUMN `adress`,
    ADD COLUMN `address` VARCHAR(191) NOT NULL;
