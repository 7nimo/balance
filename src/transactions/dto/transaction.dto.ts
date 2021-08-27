import { IsDateString, IsDecimal, IsInt, IsString } from 'class-validator';

export class TransactionDto {
  @IsInt()
  id: number;

  @IsDateString()
  transactionDate: string;

  @IsString()
  transactionDesc: string;

  @IsString()
  transactionType: string;

  @IsDecimal({
    force_decimal: true,
    decimal_digits: '2',
  })
  debitAmount: number;

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
