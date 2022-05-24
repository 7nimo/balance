import { DataSource } from 'typeorm';
import { USER_REPOSITORY } from './constants';
import { UserEntity } from './entities/user.entity';

export const userProviders = [
  {
    provide: USER_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserEntity),
    inject: ['DATA_SOURCE'],
  },
];
