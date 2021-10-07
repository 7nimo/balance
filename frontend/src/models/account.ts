// eslint-disable-next-line import/no-cycle
import { Bank, Currency } from '.';

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
