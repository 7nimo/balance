import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/modules/user/user.service';
import { JwtPayload } from '../jwt-payload.interface';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request.cookies['_bat'];
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_TOKEN_SECRET'),
    });
  }

  validate(payload: JwtPayload) {
    return this.userService.findById(payload.userId);
  }
}
