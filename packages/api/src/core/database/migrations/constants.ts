import { CreateBankDto } from 'src/modules/bank/dto';
import { BankEntity } from 'src/modules/bank/entities/bank.entity';
import { CurrencyType } from 'src/core/common/enums/currency-type.enum';
import { CreateUserDto } from 'src/modules/user/dto';
import { CurrencyEntity } from 'src/modules/currency/entities/currency.entity';
import { CreateCurrencyDto } from 'src/modules/currency/dto';

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
