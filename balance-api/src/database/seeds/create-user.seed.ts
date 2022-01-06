import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { BANKS, CURRENCY } from '../constants';
import { AccountEntity } from 'src/account/entities/account.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto';
import * as argon2 from 'argon2';

export default class CreateUser implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const userData: CreateUserDto = {
      username: 'User',
      email: 'user@email.com',
      password: await argon2.hash('password'),
    };

    // create user
    const user = await connection
      .createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values(userData)
      .orIgnore()
      .execute();

    // create account
    if (user.identifiers[0].id) {
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
