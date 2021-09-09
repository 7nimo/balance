import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './entities/transaction.entity';
import { StatementSavedListener } from 'src/transaction/listeners/statement-saved.listener';
import { AccountsModule } from 'src/account/account.module';
import { CsvParserService } from 'src/common/services/csv-parser/csv-parser.service';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionEntity]), AccountsModule],
  controllers: [TransactionController],
  providers: [TransactionService, CsvParserService, StatementSavedListener],
})
export class TransactionsModule {}
