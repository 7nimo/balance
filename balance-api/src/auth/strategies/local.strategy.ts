import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/user/entities/user.entity';

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
    const user = await this.userService.getUserWithPwd(email);

    if (!user) {
      throw new UnauthorizedException('Incorrect username or password');
    }

    const isEqual = await this.authService.verifyPassword(
      user.password,
      password,
    );

    if (!isEqual) {
      throw new UnauthorizedException('Incorrect username or password');
    }

    return user;
  }
}
