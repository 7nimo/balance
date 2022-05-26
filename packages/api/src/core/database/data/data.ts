import { CurrencyType } from 'src/core/common/enums/currency-type.enum';
import { CreateUserDto } from 'src/modules/user/dto';
import { CreateBankDto, CreateCurrencyDto } from 'src/modules/context/dto';
import { BankEntity } from 'src/modules/context/entities/bank.entity';
import { CurrencyEntity } from 'src/modules/context/entities/currency.entity';

export const currencyData: CreateCurrencyDto[] = [
  {
    code: 'EUR',
    name: 'Euro',
    symbol: '€',
    type: CurrencyType.FIAT,
  },
  {
    code: 'GBP',
    name: 'Pound Sterling',
    symbol: '£',
    type: CurrencyType.FIAT,
  },

  {
    code: 'PLN',
    name: 'Złoty',
    symbol: 'zł',
    type: CurrencyType.FIAT,
  },
  {
    code: 'USD',
    name: 'United States Dollar',
    symbol: '$',
    type: CurrencyType.FIAT,
  },
  {
    code: 'BTC',
    name: 'Bitcoin',
    symbol: '₿',
    type: CurrencyType.CRYPTO,
  },
];

export const bankData: CreateBankDto[] = [
  {
    name: 'mBank',
    colors: ['#e90a0a', '#ff8600', '#ae0000', '#0065b1', '#008520'],
    country: 'Poland',
    img: '0pm0xahjtbhcxsul89ypocwgk',
  },
  {
    name: 'Lloyds',
    colors: ['#024731', '#006a4d', '#2d8259', '#FFFFFF', '#77ba00'],
    country: 'United Kingdom',
    img: 'tqucp5jbmciedm9773hxqt4y0',
  },
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
