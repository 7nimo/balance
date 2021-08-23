import { IsEmail, IsISO8601, IsUUID } from 'class-validator';

export class UserDto {
  @IsUUID('4') id: string;
  @IsEmail() email: string;
  @IsISO8601() createdAt: string;
  @IsISO8601() updatedAt: string;
}
