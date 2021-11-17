import { Bank } from './bank';
import { Currency } from './currency';

export interface Account {
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

export interface AccountsRO {
  accounts: Account[];
}
