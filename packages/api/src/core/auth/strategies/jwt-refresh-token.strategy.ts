import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { JwtPayload } from '../jwt-payload.interface';
import { UserService } from 'src/modules/user/user.service';
import { UserRO } from 'src/modules/user/user.interface';
import * as argon2 from 'argon2';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request.cookies['_brt'];
        },
      ]),
      secretOrKey: configService.get('JWT_REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: JwtPayload): Promise<UserRO> {
    const { refreshToken: hashedRefreshToken, ...user } =
      await this.userService.getUserWithRefreshToken(payload.userId);

    const isEqual = await argon2.verify(
      hashedRefreshToken,
      request.cookies['_brt'],
    );

    if (!isEqual) {
      throw new UnauthorizedException('Error validating refresh token');
    }

    return { user };
  }
}
