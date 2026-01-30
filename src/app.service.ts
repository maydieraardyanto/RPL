import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'XI RPL 3';
  }
  getWelcome(): string {
    return 'Welcome to Library API';
  }
  getAge(): number {
    return 17;
  }
  getPlus(a: number, b: number): number {
    return a  + b;
  }
}
