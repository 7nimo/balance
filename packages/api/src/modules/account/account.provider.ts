import { DataSource } from 'typeorm';
import { ACCOUNT_REPOSITORY } from './constants';
import { AccountEntity } from './entities/account.entity';

export const accountProviders = [
  {
    provide: ACCOUNT_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(AccountEntity),
    inject: ['DATA_SOURCE'],
  },
];
