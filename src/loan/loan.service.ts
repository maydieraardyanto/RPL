import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';

@Injectable()
export class LoanService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateLoanDto) {
    return this.prisma.loan.create({
      data: {
        memberId: dto.memberId,
        dueDate: new Date(dto.dueDate),
        status: 'BORROWED',
        details: {
          create: dto.books.map((b) => ({
            bookId: b.bookId,
            qty: b.qty,
          })),
        },
      },
      include: {
        details: true,
      },
    });
  }

  async findAll() {
    return this.prisma.loan.findMany({
      include: {
        member: true,
        details: {
          include: {
            book: true,
          },
        },
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findOne(id: number) {
    const loan = await this.prisma.loan.findUnique({
      where: { id },
      include: {
        member: true,
        details: {
          include: {
            book: true,
          },
        },
      },
    });

    if (!loan) {
      throw new NotFoundException('Loan not found');
    }

    return loan;
  }

  async update(id: number, dto: UpdateLoanDto) {
    await this.findOne(id);

    return this.prisma.loan.update({
      where: { id },
      data: {
        status: dto.status ?? 'RETURNED',
        returnDate: dto.returnDate
          ? new Date(dto.returnDate)
          : new Date(),
      },
    });
  }
}