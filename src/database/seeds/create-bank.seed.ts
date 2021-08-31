import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { BankEntity } from 'src/bank/entities/bank.entity';
import { CreateBankDto } from 'src/bank/dto';

export default class CreateBanks implements Seeder {
  bankData: CreateBankDto[] = [{ name: 'mBank' }, { name: 'Lloyds' }];

  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(BankEntity)
      .values(this.bankData)
      .execute();
  }
}
