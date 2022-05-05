/* eslint-disable @typescript-eslint/no-var-requires */
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DatabaseService } from './database.service';
import { dataSource } from './dataSource';

@Global()
@Module({
  providers: [
    DatabaseService,
    {
      provide: 'DataSource',
      useValue: dataSource,
    },
  ],
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(dataSource.options, {
          autoLoadEntities: true,
          namingStrategy: new SnakeNamingStrategy(),
        }),
    }),
  ],
  exports: [],
})
export class DatabaseModule {
  constructor(private databaseService: DatabaseService) {
    this.databaseService.init();
  }
}
