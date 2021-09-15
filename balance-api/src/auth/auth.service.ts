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

  getCookieWithJwt(userId: string) {
    const payload: JwtPayload = { userId: userId };

    const token = this.jwtService.sign(payload);

    return `Authorization=${token}; HttpOnly; Path=/; expires=${this.configService.get('JWT_TOKEN_EXP')}`;
  }

  getCookieWithRefreshToken(userId: string) {
    const payload: JwtPayload = { userId: userId };

    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXP'),
    });
   
    return `jwt=${token}; HttpOnly; Path=/; expires=${this.configService.get('JWT_REFRESH_TOKEN_EXP')}`;
  }

  getCookiesForLogOut() {
    return [
      'Authorization=; HttpOnly; Path=/; Max-Age=0',
      'jwt=; HttpOnly; Path=/; Max-Age=0'
    ];
  }
}
