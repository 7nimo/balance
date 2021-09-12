import { CurrencyType } from 'src/common/enums/currency-type.enum';
import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { CurrencyEntity } from 'src/currency/entities/currency.entity';
import { CreateCurrencyDto } from 'src/currency/dto';

export default class CreateCurrency implements Seeder {
  currencyData: CreateCurrencyDto[] = [
    {
      code: 'GBP',
      name: 'Pound Sterling',
      type: CurrencyType.FIAT,
    },
    {
      code: 'EUR',
      name: 'Euro',
      type: CurrencyType.FIAT,
    },
    {
      code: 'PLN',
      name: 'Złoty',
      type: CurrencyType.FIAT,
    },
    {
      code: 'BTC',
      name: 'Bitcoin',
      type: CurrencyType.CRYPTO,
    },
  ];

  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(CurrencyEntity)
      .values(this.currencyData)
      .execute();
  }
}
