import { IsString } from 'class-validator';

export class CreateBankDto {
  @IsString()
  readonly name: string;

  readonly colors: string[];

  @IsString()
  readonly country: string;

  readonly img: string;
}
