import { IsDecimal, IsString, IsUUID, ValidateIf } from 'class-validator';
import { Account } from 'src/accounts/entities/account.entity';

export class CreateTransactionDto {
  @IsUUID('4')
  readonly account: Account;

  @IsString()
  readonly transactionDate: string;

  @IsString()
  readonly transactionDesc: string;

  @IsString()
  readonly transactionType: string;

  @ValidateIf((o) => o.creditAmount === undefined)
  @IsDecimal({
    force_decimal: true,
    decimal_digits: '2',
  })
  readonly debitAmount: number;

  @ValidateIf((o) => o.debitAmount === undefined)
  @IsDecimal({
    force_decimal: true,
    decimal_digits: '2',
  })
  readonly creditAmount: number;

  @IsDecimal({
    force_decimal: true,
    decimal_digits: '2',
  })
  readonly balance: number;
}
