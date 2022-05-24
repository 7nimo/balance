import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { AccountsModule } from 'src/modules/account/account.module';
import { CsvParserFactory } from 'src/core/common/factories/csv-parser.factory';
import { CsvParserService } from 'src/core/common/services/csv-parser/csv-parser.service';
import { ConfigService } from '@nestjs/config';
import { transactionProviders } from './transaction.provider';
import { DatabaseModule } from 'src/core/database/database.module';

@Module({
  imports: [AccountsModule, DatabaseModule],
  controllers: [TransactionController],
  providers: [
    TransactionService,
    ConfigService,
    CsvParserService,
    CsvParserFactory,
    ...transactionProviders,
  ],
})
export class TransactionsModule {}
