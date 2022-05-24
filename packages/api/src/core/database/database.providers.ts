import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DATA_SOURCE } from './constants';

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        entities: ['dist/**/entities/*.entity{.ts,.js}'],
        migrations: ['dist/database/migrations/*{.ts,.js}'],
        synchronize: true, // dev
        logging: true,
        namingStrategy: new SnakeNamingStrategy(),
      });

      return dataSource.initialize();
    },
  },
];
