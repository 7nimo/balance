import { Bank } from './bank';
import { Currency } from './currency';

export interface AccountEntity {
  id: string;
  name: string;
  sortCode?: string;
  accountNumber?: string;
  balance: number;
  bank: Bank; // bank ID
  currency: Currency; // currency ID
  createdAt: string;
  updatedAt: string;
}

export interface Accounts {
  accounts: AccountEntity[] | [];
}
