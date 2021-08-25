import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserDto } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';

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

  async validate(email: string, password: string): Promise<UserDto> {
    const user = await this.usersService.findByEmail(email);

    if (user) {
      const isMatch = await this.authService.verifyPassword(
        user.password,
        password,
      );
      if (isMatch) {
        return user;
      } else {
        throw new UnauthorizedException('Incorrect username or password');
      }
    } else {
      throw new UnauthorizedException('Incorrect username or password');
    }
  }
}
