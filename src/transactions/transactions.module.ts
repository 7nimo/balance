import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { StatementSavedListener } from 'src/transactions/listeners/statement-saved.listener';
import { AccountsModule } from 'src/account/account.module';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction]), AccountsModule],
  controllers: [TransactionsController],
  providers: [TransactionsService, StatementSavedListener],
})
export class TransactionsModule {}
