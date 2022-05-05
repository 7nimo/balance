import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  constructor() {}
  // private readonly cats: Cat[] = [];

  runMigrations(): void {}
}
