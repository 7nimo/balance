import { CurrencyType } from 'src/common/enums/currency-type.enum';

export class CreateCurrencyDto {
  code: string;
  name: string;
  type?: CurrencyType;
}
