import { Injectable, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { BankEntity } from 'src/modules/context/entities/bank.entity';
import { CurrencyEntity } from 'src/modules/context/entities/currency.entity';
import { DataSource } from 'typeorm';
import { DATA_SOURCE } from './constants';
import { bankData, currencyData } from './data/data';

@Injectable()
export class SeederService implements OnModuleInit {
  private dataSource: DataSource;

  constructor(private moduleRef: ModuleRef) {}

  async onModuleInit() {
    this.dataSource = await this.moduleRef.resolve(DATA_SOURCE);
  }

  async currency(): Promise<void> {
    try {
      await this.dataSource
        .createQueryBuilder()
        .insert()
        .orIgnore()
        .into(CurrencyEntity)
        .values(currencyData)
        .execute();
    } catch (error) {
      console.error(error);
    }
  }

  async banks(): Promise<void> {
    try {
      await this.dataSource
        .createQueryBuilder()
        .insert()
        .orIgnore()
        .into(BankEntity)
        .values(bankData)
        .execute();
    } catch (error) {
      console.error(error);
    }
  }
}
