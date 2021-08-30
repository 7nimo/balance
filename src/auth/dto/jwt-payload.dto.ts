import { IsNotEmpty } from 'class-validator';

export class JwtPayloadDto {
  @IsNotEmpty()
  readonly user_id: string;
}
