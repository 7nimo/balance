import { AccountEntity } from './entities/account.entity';

export interface AccountRO {
  account: AccountEntity;
}

export interface AccountsRO {
  accounts: AccountEntity[];
}