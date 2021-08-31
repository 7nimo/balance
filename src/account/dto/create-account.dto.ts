import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';
import { BankEntity } from 'src/bank/entities/bank.entity';
import { CurrencyEntity } from 'src/currency/entities/currency.entity';
import { UserEntity } from 'src/user/entities/user.entity';

export class CreateAccountDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsOptional()
  @Matches(/(\d{2}-){2}(\d{2})/)
  readonly sortCode?: string;

  @IsOptional()
  @IsInt()
  readonly accountNumber?: number;

  @IsInt()
  readonly bank: BankEntity;

  @IsInt()
  readonly currency: CurrencyEntity;

  @IsUUID('4')
  readonly user: UserEntity;
}
