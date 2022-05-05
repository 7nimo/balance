/* eslint-disable @typescript-eslint/no-var-requires */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
// import ormConfig from './ormconfig.cjs';

// export const dataSource = new DataSource(ormConfig);

export const dataSource = new DataSource(require('./ormconfig.cjs'));

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        console.log(dataSource.options);

        return Object.assign(dataSource.options, {
          autoLoadEntities: true,
          namingStrategy: new SnakeNamingStrategy(),
        });
      },
    }),
  ],
})
export class DatabaseModule {}
