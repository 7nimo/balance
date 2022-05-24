import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BANK_REPOSITORY, CURRENCY_REPOSITORY } from './constants';
import { ContextData } from './context.controller';
import { BankEntity } from './entities/bank.entity';
import { CurrencyEntity } from './entities/currency.entity';

@Injectable()
export class ContextService {
  constructor(
    @Inject(BANK_REPOSITORY)
    private readonly banksRepository: Repository<BankEntity>,
    @Inject(CURRENCY_REPOSITORY)
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
