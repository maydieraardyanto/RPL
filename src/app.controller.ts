import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/welcome')
  getWelcome(): string {
    return this.appService.getWelcome();
  }
  @Get('/age')
  getAge(): number {
    return this.appService.getAge();
  }
  @Get('/plus')
  getPlus(): number {
    return this.appService.getPlus(5,10)
  }
}
