import { IsDecimal, IsString, ValidateIf } from 'class-validator';

export class CreateTransactionDto {
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
  readonly debitAmount: string;

  @ValidateIf((o) => o.debitAmount === undefined)
  @IsDecimal({
    force_decimal: true,
    decimal_digits: '2',
  })
  readonly creditAmount: string;

  @IsDecimal({
    force_decimal: true,
    decimal_digits: '2',
  })
  readonly balance: string;
}
