import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './entities/transaction.entity';
import { AccountsModule } from 'src/modules/account/account.module';
import { CsvParserFactory } from 'src/core/common/factories/csv-parser.factory';
import { CsvParserService } from 'src/core/common/services/csv-parser/csv-parser.service';
import { StatementSavedListener } from './listeners/statement-saved.listener';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionEntity]), AccountsModule],
  controllers: [TransactionController],
  providers: [
    TransactionService,
    ConfigService,
    CsvParserService,
    CsvParserFactory,
    StatementSavedListener,
  ],
})
export class TransactionsModule {}
