import { Bank } from './bank';
import { Currency } from './currency';

export interface AccountEntity {
  id: string;
  name: string;
  sortCode?: string;
  accountNumber?: number;
  balance: number;
  bank: Bank;
  currency: Currency;
  createdAt: string;
  updatedAt: string;
}

export interface Accounts {
  accounts: AccountEntity[] | [];
}
