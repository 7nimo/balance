import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountsController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from './entities/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity])],
  controllers: [AccountsController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountsModule {}
