import { IsEmail } from 'class-validator';

export class UserDto {
  id: string;
  username: string;
  @IsEmail() email: string;
}
