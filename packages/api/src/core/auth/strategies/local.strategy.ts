import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserService } from 'src/modules/user/user.service';
import { UserEntity } from 'src/modules/user/entities/user.entity';

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

  async validate(email: string, password: string): Promise<UserEntity> {
    const { password: hashedPassword, ...user } = await this.userService
      .getUserWithPwd(email)
      .catch(() => {
        throw new UnauthorizedException('Incorrect email or password');
      });

    const isEqual = await this.authService.verifyPassword(
      hashedPassword,
      password,
    );

    if (!isEqual) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    return user;
  }
}
