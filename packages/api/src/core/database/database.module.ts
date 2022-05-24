/* eslint-disable @typescript-eslint/no-var-requires */
import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { databaseProviders } from './database.providers';

@Module({
  providers: [SeederService, ...databaseProviders],
  imports: [],
  exports: [SeederService, ...databaseProviders],
})
export class DatabaseModule {}
