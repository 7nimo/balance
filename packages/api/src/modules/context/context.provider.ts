import { DataSource } from 'typeorm';
import { BANK_REPOSITORY, CURRENCY_REPOSITORY } from './constants';
import { BankEntity } from './entities/bank.entity';
import { CurrencyEntity } from './entities/currency.entity';

export const contextProviders = [
  {
    provide: BANK_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(BankEntity),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: CURRENCY_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CurrencyEntity),
    inject: ['DATA_SOURCE'],
  },
];
