import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../users/dto/user.dto';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  verifyPassword(hash: string, password: string): Promise<boolean> {
    return argon2.verify(hash, password);
  }

  login({ id, email }: UserDto): string {
    try {
      return this.jwtService.sign({ email: email, sub: id });
    } catch (error) {
      throw new HttpException(error, HttpStatus.UNAUTHORIZED);
    }
  }
}
