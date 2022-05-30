import { Bank } from './bank';
import { Currency } from './currency';

export interface AccountEntity {
  id: string;
  name: string;
  accountNumber?: string;
  balance: number;
  bank: Bank;
  currency: Currency;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAccountDto {
  name: string;
  accountNumber?: string;
  bank: number; // bank ID
  currency: number; // currency ID
}

export type UpdateAccountDto = Partial<CreateAccountDto>;
