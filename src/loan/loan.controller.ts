import { Controller, Post, Get, Put, Param, Body, ParseIntPipe } from '@nestjs/common';
import { LoanService } from './loan.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';

@Controller('loans')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post()
  create(@Body() dto: CreateLoanDto) {
    return this.loanService.create(dto);
  }

  @Get()
  findAll() {
    return this.loanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.loanService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateLoanDto,
  ) {
    return this.loanService.update(id, dto);
  }
}