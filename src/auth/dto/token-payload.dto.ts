import { IsNotEmpty } from 'class-validator';

export class TokenPayloadDto {
  @IsNotEmpty() readonly email: string;
  @IsNotEmpty() readonly sub: string;
}
