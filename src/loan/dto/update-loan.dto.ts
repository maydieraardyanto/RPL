import { IsInt, IsDateString, Min, IsOptional } from "class-validator";

export class CreateLoanDto {
    @IsInt()
    @Min(1)
    @IsOptional()
    memberId: number;

    @IsDateString()
    @IsOptional()
    dueDate: string;
}