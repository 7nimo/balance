import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserDto } from 'src/users/dto/user.dto';
import { LoginUserDto } from 'src/users/dto/login-user-dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(
      private readonly authService: AuthService,
    ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(credentials: LoginUserDto): Promise<UserDto> {
      return this.authService.validateUser(credentials);
  }
}
