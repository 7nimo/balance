import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { AccountsModule } from 'src/modules/account/account.module';
import { CsvParserFactory } from 'src/core/common/factories/csv-parser.factory';
import { CsvParserService } from 'src/core/common/services/csv-parser/csv-parser.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from 'src/core/database/database.module';
import multerConfig from 'src/core/etc/multer.config';
import { TransactionImportedListener } from './listeners/transaction-imported.listener';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './entities/transaction.entity';

@Module({
  imports: [
    AccountsModule,
    ConfigModule.forRoot({
      load: [multerConfig],
    }),
    DatabaseModule,
    TypeOrmModule.forFeature([TransactionEntity]),
  ],
  controllers: [TransactionController],
  providers: [
    ConfigService,
    CsvParserService,
    CsvParserFactory,
    TransactionService,
    TransactionImportedListener,
  ],
  exports: [TypeOrmModule],
})
export class TransactionsModule {}
