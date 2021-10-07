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

    const accessToken = this.jwtService.sign(payload);

    return `_bat=${accessToken}; Path=/; Expires=${this.configService.get(
      'JWT_TOKEN_EXP',
    )}; Secure; HttpOnly; SameSite=Strict`;
  }

  getCookieWithRefreshToken(userId: string) {
    const payload: JwtPayload = { userId: userId };

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXP'),
    });
    return `_brt=${refreshToken}; Path=/auth/refresh/; Expires=${this.configService.get(
      'JWT_REFRESH_TOKEN_EXP',
    )}; Secure; HttpOnly; SameSite=Strict`;
  }

  getCookiesForLogOut() {
    return [
      '_bat=; Path=/; Expires=0; Secure; HttpOnly; SameSite=Strict',
      '_brt=; Path=/; Expires=0; Secure; HttpOnly; SameSite=Strict',
    ];
  }
}
