import { IsOptional, IsDateString } from 'class-validator';
import { LoanStatus } from '@prisma/client';

export class UpdateLoanDto {
  @IsOptional()
  status?: LoanStatus;

  @IsOptional()
  @IsDateString()
  returnDate?: string;
}