import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';
import { Bank } from 'src/banks/entities/bank.entity';
import { User } from 'src/users/entities/user.entity';

export class CreateAccountDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @Matches(/(\d{2}-){2}(\d{2})/)
  sortCode: string;

  @IsInt()
  accountNumber: number;

  @IsInt()
  bank: Bank;

  @IsInt()
  currency: number;

  @IsUUID('4')
  user: User;
}
