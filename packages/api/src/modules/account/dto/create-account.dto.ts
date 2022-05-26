import {
  IsAlphanumeric,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { BankEntity } from 'src/modules/context/entities/bank.entity';
import { CurrencyEntity } from 'src/modules/context/entities/currency.entity';

export class CreateAccountDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  @IsAlphanumeric()
  readonly accountNumber?: string;

  @IsInt()
  readonly bank: BankEntity;

  @IsInt()
  readonly currency: CurrencyEntity;
}
