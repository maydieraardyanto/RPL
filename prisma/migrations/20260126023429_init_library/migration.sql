-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_memberId_fkey`;

-- AlterTable
ALTER TABLE `user` MODIFY `memberId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
