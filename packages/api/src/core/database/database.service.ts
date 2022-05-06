import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService {
  private dataSource: DataSource;

  constructor(private configService: ConfigService) {
    this.dataSource = this.configService.get('database');
    console.log('db_config: ', this.dataSource);
  }
  runMigrations(): void {
    console.log('hello');
  }
}
