import { DataSource } from 'typeorm';
import { TRANSACTION_REPOSITORY } from './constants';
import { TransactionEntity } from './entities/transaction.entity';

export const transactionProviders = [
  {
    provide: TRANSACTION_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(TransactionEntity),
    inject: ['DATA_SOURCE'],
  },
];
