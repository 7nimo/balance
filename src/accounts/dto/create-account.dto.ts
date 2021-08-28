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
  readonly name: string;

  @IsOptional()
  @Matches(/(\d{2}-){2}(\d{2})/)
  readonly sortCode: string;

  @IsInt()
  readonly accountNumber: number;

  @IsInt()
  readonly bank: Bank;

  @IsInt()
  readonly currency: number;

  @IsUUID('4')
  readonly user: User;
}
