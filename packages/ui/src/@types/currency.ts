export enum CurrencyType {
  CRYPTO = 'crypto',
  FIAT = 'fiat',
}

export interface Currency {
  id: number;
  code: string;
  name: string;
  symbol: string;
  type: CurrencyType;
}
