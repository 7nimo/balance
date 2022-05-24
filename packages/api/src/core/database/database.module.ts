/* eslint-disable @typescript-eslint/no-var-requires */
import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { databaseProviders } from './database.providers';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from 'src/config/database.config';
import { DataSourceOptions, DataSource } from 'typeorm';

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
