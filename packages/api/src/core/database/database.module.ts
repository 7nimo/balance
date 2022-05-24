/* eslint-disable @typescript-eslint/no-var-requires */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import databaseConfig from '../../config/database.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SeederService } from './seeder.service';
import { databaseProviders } from './database.providers';

@Module({
  providers: [ConfigService, SeederService, ...databaseProviders],
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot({ load: [databaseConfig] })],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        Object.assign(configService.get<DataSourceOptions>('database'), {
          autoLoadEntities: true,
        }),
      connectionFactory: async (options) => {
        const AppDataSource = new DataSource(options);

        AppDataSource.initialize()
          .then(() => {
            console.log('Data Source has been initialized!');
          })
          .catch((err) => {
            console.error('Error during Data Source initialization', err);
          });

        return AppDataSource;
      },
    }),
  ],
  exports: [TypeOrmModule, SeederService, ...databaseProviders],
})
export class DatabaseModule {}
