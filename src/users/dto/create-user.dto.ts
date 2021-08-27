import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(255)
  // to do: Implement Proper Password Strength Controls
  // @Matches(pattern: RegExp, modifiers?: string)
  password: string;
}

export class AdditionalUserInfo {
  // to do: currency code enum
  @IsString()
  baseCurrency: string;
}
