import { IsInt, IsDateString } from "class-validator";

export class CreateLoanDto {
    @IsInt()
    memberId: number;

    @IsDateString()
    dueDate: string;
}