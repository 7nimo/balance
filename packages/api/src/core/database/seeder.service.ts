import { Injectable } from '@nestjs/common';
import { BankEntity } from 'src/modules/context/entities/bank.entity';
import { CurrencyEntity } from 'src/modules/context/entities/currency.entity';
import { DataSource } from 'typeorm';
import { bankData, currencyData } from './data/data';

@Injectable()
export class SeederService {
  constructor(private dataSource: DataSource) {}

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
