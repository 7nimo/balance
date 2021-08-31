import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserService } from 'src/user/user.service';
import { LoginUserRO } from 'src/user/user.interface';

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

  async validate(email: string, password: string): Promise<LoginUserRO> {
    const user = await this.userService.findByEmail(email);

    if (user === undefined) {
      throw new UnauthorizedException('Incorrect username or password');
    }

    const isMatch = await this.authService.verifyPassword(
      user.password,
      password,
    );

    if (!isMatch) {
      throw new UnauthorizedException('Incorrect username or password');
    }

    const loginUserRO = {
      id: user.id
    }
    
    return loginUserRO;
  }
}
