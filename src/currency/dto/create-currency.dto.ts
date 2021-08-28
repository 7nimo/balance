import { IsEnum, IsString } from 'class-validator';
import { CurrencyType } from 'src/common/enums/currency-type.enum';

export class CreateCurrencyDto {
  @IsString()
  readonly code: string;

  @IsString()
  readonly name: string;

  @IsEnum(CurrencyType)
  readonly type?: CurrencyType;
}
