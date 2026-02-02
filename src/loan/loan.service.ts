import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoanStatus } from '@prisma/client'

@Injectable()
export class LoanService {
  constructor(private prisma: PrismaService) {}
  
    async create(dto: CreateLoanDto) {
      return this.prisma.loan.create({
        data: {
          memberId: dto.memberId,
          duedate: new Date(dto.dueDate),
          status: LoanStatus.BORROWED
        }
      })
    }

    async findAll() {
      return this.prisma.loan.findMany({
        include: {
          member: true,
          details: true
        }
      })
    }

    async findOne (id: number) {
      const loan = await this.prisma.loan.findUnique({
        where: { id },
        include: {
          member: true,
          details: true
        }
      })

      if (!loan) throw new NotFoundException('Loan tidak ditemukan')
        return loan
    }

    async Update(id: number Number, dto: UpdateLoanDto) {
      await this.findOne(id)
      return this.prisma.loan.update({
        where: { id },
        data: {
          ...dto,
          dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
        }
      })
    }

    async remove(id: number) {
      await this.findOne(id)
      await this.prisma.loan.delete({ where: { id } })
      return { message: 'Loan berhasil dihapus' }
    }
}
