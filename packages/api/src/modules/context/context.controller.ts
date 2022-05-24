import { Controller, Get } from '@nestjs/common';
import { ContextService } from './context.service';
import { BankEntity } from './entities/bank.entity';
import { CurrencyEntity } from './entities/currency.entity';

export type ContextData = {
  banks: BankEntity[];
  currency: CurrencyEntity[];
};

@Controller('context')
export class ContextController {
  constructor(private readonly contextService: ContextService) {}

  @Get()
  getContextData(): Promise<ContextData> {
    return this.contextService.getContextData();
  }

  @Get('banks')
  getBanksData(): Promise<BankEntity[]> {
    return this.contextService.getBanks();
  }

  @Get('currency')
  getCurrencyData(): Promise<CurrencyEntity[]> {
    return this.contextService.getCurrencies();
  }
}
