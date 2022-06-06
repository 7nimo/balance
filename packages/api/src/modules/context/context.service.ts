import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContextData } from './context.controller';
import { BankEntity } from './entities/bank.entity';
import { CurrencyEntity } from './entities/currency.entity';

@Injectable()
export class ContextService {
  constructor(
    @InjectRepository(BankEntity)
    private readonly banksRepository: Repository<BankEntity>,
    @InjectRepository(CurrencyEntity)
    private readonly currencyRepository: Repository<CurrencyEntity>,
  ) {}

  getBanks(): Promise<BankEntity[]> {
    return this.banksRepository.find();
  }

  getCurrencies(): Promise<CurrencyEntity[]> {
    return this.currencyRepository.find();
  }

  async getContextData(): Promise<ContextData> {
    const banks: BankEntity[] = await this.banksRepository.find();
    const currency: CurrencyEntity[] = await this.currencyRepository.find();

    return { banks, currency };
  }
}
