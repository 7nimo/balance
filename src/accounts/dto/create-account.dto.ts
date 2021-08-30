import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsOptional()
  @Matches(/(\d{2}-){2}(\d{2})/)
  readonly sortCode?: string;

  @IsInt()
  readonly accountNumber: number;

  @IsInt()
  readonly bankId: number;

  @IsInt()
  readonly currencyId: number;

  @IsUUID('4')
  readonly userId: string;
}
