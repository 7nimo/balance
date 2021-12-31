import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { CurrencyEntity } from 'src/currency/entities/currency.entity';
import { currencyData } from '../constants';

export default class CreateCurrency implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(CurrencyEntity)
      .values(currencyData)
      .execute();
  }
}
