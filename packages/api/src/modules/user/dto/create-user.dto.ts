import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(99)
  // to do: Implement Proper Password Strength validation
  // @Matches(pattern: RegExp, modifiers?: string)
  password: string;

  @IsString()
  @MinLength(4)
  @MaxLength(32)
  readonly username: string;
}

export class AdditionalUserInfo {
  // to do: currency code enum
  @IsString()
  readonly baseCurrency: string;
}
