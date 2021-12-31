import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { BANKS, CURRENCY, userData } from '../constants';
import { AccountEntity } from 'src/account/entities/account.entity';

export default class CreateUser implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    // create user
    const user = await connection
      .createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values(userData)
      .orIgnore()
      .execute();

    // create account
    if (user.identifiers[0]?.id) {
      const gbp = CURRENCY.get('GBP');
      const lloyds = BANKS.get('Lloyds');

      const accountData = new AccountEntity();
      accountData.name = 'Lloyds Bank';
      accountData.bank = lloyds;
      accountData.currency = gbp;
      accountData.balance = 0;
      accountData.user = user.identifiers[0].id;

      await connection
        .createQueryBuilder()
        .insert()
        .into(AccountEntity)
        .values(accountData)
        .orIgnore()
        .execute();
    }

    // import transactions
  }
}
