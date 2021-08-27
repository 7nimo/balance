import {
  IsDecimal,
  IsISO8601,
  IsPositive,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { Account } from 'src/accounts/entities/account.entity';

export class CreateTransactionDto {
  @IsUUID('4')
  account: Account;

  @IsString()
  // @IsISO8601()
  transactionDate: string;

  @IsString()
  transactionDesc: string;

  @IsString()
  transactionType: string;

  // @Optional()
  @ValidateIf((o) => o.creditAmount === undefined)
  @IsDecimal({
    force_decimal: true,
    decimal_digits: '2',
  })
  debitAmount: number;

  // @Optional()
  @ValidateIf((o) => o.debitAmount === undefined)
  @IsDecimal({
    force_decimal: true,
    decimal_digits: '2',
  })
  creditAmount: number;

  @IsDecimal({
    force_decimal: true,
    decimal_digits: '2',
  })
  balance: number;
}
