import { IsDecimal, IsString, ValidateIf } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  readonly date: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly type: string;

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
