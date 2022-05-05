import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { dataSource } from './dataSource';

@Injectable()
export class DatabaseService {
  constructor(@Inject('DataSource') private AppDataSource: DataSource) {
    AppDataSource = dataSource;
  }

  init(): Promise<DataSource> {
    return this.AppDataSource.initialize();
  }
}
