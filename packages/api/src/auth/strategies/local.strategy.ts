import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserService } from 'src/user/user.service';
import { UserRO } from 'src/user/user.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<UserRO> {
    const { password: hashedPassword, ...user } = await this.userService
      .getUserWithPwd(email)
      .catch(() => {
        throw new UnauthorizedException('Incorrect username or password');
      });

    const isEqual = await this.authService.verifyPassword(
      hashedPassword,
      password,
    );

    if (!isEqual) {
      throw new UnauthorizedException('Incorrect username or password');
    }

    return { user };
  }
}