import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsEmail() email: string;

  @IsString() @Length(8, 255)
  // to do: Implement Proper Password Strength Controls 
  // @Matches(pattern: RegExp, modifiers?: string)
  password: string;
}
