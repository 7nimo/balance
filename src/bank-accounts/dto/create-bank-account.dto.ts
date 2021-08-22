import { Bank } from "src/banks/entities/bank.entity";
import { User } from "src/users/entities/user.entity";
import { Currency } from "../entities/currency.entity";

export class CreateBankAccountDto {
  name: string;
  sortCode?: number;
  accountNumber?: number;
  bankId: number;
  currencyId: number;
  createdAt: string;
  updatedAt: string;
}
