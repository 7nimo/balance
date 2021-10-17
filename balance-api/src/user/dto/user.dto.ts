import { IsEmail, IsString, IsUUID } from 'class-validator';

export class UserDto {
  @IsUUID('4')
  readonly id: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly username: string;
}
