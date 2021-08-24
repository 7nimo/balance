import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Bank } from 'src/banks/entities/bank.entity';
import { CreateBankDto } from 'src/banks/dto/create-bank.dto';

export default class CreateBanks implements Seeder {
  banksData: CreateBankDto[] = [{ name: 'mBank' }, { name: 'Lloyds' }];

  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Bank)
      .values(this.banksData)
      .execute();
  }
}
