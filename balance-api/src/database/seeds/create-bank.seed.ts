import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { BankEntity } from 'src/bank/entities/bank.entity';
import { bankData } from '../constants';

export default class CreateBanks implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(BankEntity)
      .values(bankData)
      .execute();
  }
}
