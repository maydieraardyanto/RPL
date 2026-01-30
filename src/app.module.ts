import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { MembersModule } from './members/members.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { LoanModule } from './loan/loan.module';

@Module({
  imports: [BooksModule, MembersModule, PrismaModule, AuthModule, UserModule, LoanModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}