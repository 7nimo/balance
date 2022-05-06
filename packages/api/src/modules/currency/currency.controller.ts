import { Controller, Get } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyEntity } from './entities/currency.entity';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get()
  findAll(): Promise<CurrencyEntity[]> {
    return this.currencyService.findAll();
  }
}
