import { IsInt, IsArray, IsDateString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class BookItemDto {
  @IsInt()
  bookId: number;

  @IsInt()
  qty: number;
}

export class CreateLoanDto {
  @IsInt()
  memberId: number;

  @IsDateString()
  dueDate: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BookItemDto)
  books: BookItemDto[];
}