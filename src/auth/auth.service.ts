import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  verifyPassword(hash: string, password: string): Promise<boolean> {
    return argon2.verify(hash, password);
  }

  getCookieWithJwt(userId: string): string {
    const payload: JwtPayload = { userId: userId };

    const token = this.jwtService.sign(payload);

    return `Authentication=Bearer ${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXP')}`;
  }
}
