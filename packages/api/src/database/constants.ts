import { CreateBankDto } from 'src/bank/dto';
import { BankEntity } from 'src/bank/entities/bank.entity';
import { CurrencyType } from 'src/common/enums/currency-type.enum';
import { CreateCurrencyDto } from 'src/currency/dto';
import { CurrencyEntity } from 'src/currency/entities/currency.entity';
import { CreateUserDto } from 'src/user/dto';

export const currencyData: CreateCurrencyDto[] = [
  {
    code: 'GBP',
    name: 'Pound Sterling',
    type: CurrencyType.FIAT,
  },
  {
    code: 'EUR',
    name: 'Euro',
    type: CurrencyType.FIAT,
  },
  {
    code: 'PLN',
    name: 'Złoty',
    type: CurrencyType.FIAT,
  },
  {
    code: 'BTC',
    name: 'Bitcoin',
    type: CurrencyType.CRYPTO,
  },
];

export const bankData: CreateBankDto[] = [
  { name: 'mBank' },
  { name: 'Lloyds' },
];

export const CURRENCY: Map<string, CurrencyEntity> = new Map(
  currencyData.map((v, i) => [v.code, { id: i + 1, ...v }]),
);

export const BANKS: Map<string, BankEntity> = new Map(
  bankData.map((v, i) => [v.name, { id: i + 1, ...v }]),
);

export const userData: CreateUserDto = {
  username: 'User',
  email: 'user@email.com',
  password: 'password',
};
