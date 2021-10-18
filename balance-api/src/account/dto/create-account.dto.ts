import {
  IsAlphanumeric,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import { BankEntity } from 'src/bank/entities/bank.entity';
import { CurrencyEntity } from 'src/currency/entities/currency.entity';

export class CreateAccountDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsOptional()
  @Matches(/(\d{2}-){2}(\d{2})/)
  readonly sortCode?: string;

  @IsOptional()
  @MaxLength(30)
  @IsAlphanumeric()
  readonly accountNumber?: string;

  @IsInt()
  readonly bank: BankEntity;

  @IsInt()
  readonly currency: CurrencyEntity;
}
