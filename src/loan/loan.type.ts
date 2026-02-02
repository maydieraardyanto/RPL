import { LoanStatus } from '@prisma/client'

export type LoanType = {
    id: number
    memberId: number
    loanDate: Date
    dueDate: Date
    returnDate?: Date | null
    status: LoanStatus

    createdAt: Date
    updatedAt: Date
}