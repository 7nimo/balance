import { IsString } from 'class-validator';

export class CreateBankDto {
  @IsString()
  readonly name: string;
}
