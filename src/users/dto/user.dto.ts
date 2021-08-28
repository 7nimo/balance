import { IsEmail, IsInt, IsString } from 'class-validator';

export class UserDto {
  @IsInt()
  id: string;

  @IsEmail()
  email: string;

  @IsString()
  baseCurrency: string;
}
