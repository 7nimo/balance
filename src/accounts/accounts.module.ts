import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { StatementSavedListener } from './listeners/statement-saved.listener';
import { TransactionsModule } from 'src/transactions/transactions.module';

@Module({
  imports: [TypeOrmModule.forFeature([Account]), TransactionsModule],
  controllers: [AccountsController],
  providers: [AccountsService, StatementSavedListener],
})
export class AccountsModule {}
