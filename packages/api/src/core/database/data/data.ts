import { CurrencyType } from 'src/core/common/enums/currency-type.enum';
import { CreateBankDto, CreateCurrencyDto } from 'src/modules/context/dto';

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
    img: 'tqucp5jbmciedm9773hxqt4y0',
  },
  {
    name: 'Lloyds',
    colors: ['#024731', '#006a4d', '#2d8259', '#FFFFFF', '#77ba00'],
    country: 'United Kingdom',
    img: '0pm0xahjtbhcxsul89ypocwgk',
  },
];
