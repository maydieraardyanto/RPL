-- CreateTable
CREATE TABLE `Loan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `memberId` INTEGER NOT NULL,
    `loanDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dueDate` DATETIME(3) NOT NULL,
    `returnDate` DATETIME(3) NULL,
    `status` ENUM('BORROWED', 'RETURNED') NOT NULL DEFAULT 'BORROWED',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Loan_memberId_idx`(`memberId`),
    INDEX `Loan_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LoanDetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `loanId` INTEGER NOT NULL,
    `bookId` INTEGER NOT NULL,
    `qty` INTEGER NOT NULL DEFAULT 1,

    INDEX `LoanDetail_loanId_idx`(`loanId`),
    INDEX `LoanDetail_bookId_idx`(`bookId`),
    UNIQUE INDEX `LoanDetail_loanId_bookId_key`(`loanId`, `bookId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Loan` ADD CONSTRAINT `Loan_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LoanDetail` ADD CONSTRAINT `LoanDetail_loanId_fkey` FOREIGN KEY (`loanId`) REFERENCES `Loan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LoanDetail` ADD CONSTRAINT `LoanDetail_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
