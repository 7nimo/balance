import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto, UserDto } from 'src/users/dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<LoginUserDto> {
    const user = await this.usersService.findByEmail(email);

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

    return user;
  }
}
