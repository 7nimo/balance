import { Controller, Get, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { Public } from 'src/common/decorators/public.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserRO } from 'src/user/user.interface';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import JwtRefreshGuard from './guards/jwt-refresh.guard';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  login(@User() user: UserEntity, @Res() res: Response) {
    const accessTokenCookie = this.authService.getCookieWithJwt(user.id);
    const refreshTokenCookie = this.authService.getCookieWithRefreshToken(user.id);

    this.userService.setRefreshToken(user.id, refreshTokenCookie);

    res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);

    res.json({user});
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@User('id') userId: string, @Res() res: Response) {
    const accessTokenCookie = this.authService.getCookieWithJwt(userId);
 
    res.setHeader('Set-Cookie', accessTokenCookie);

    res.json({status: 'accepted'});
  }

  @Post('sign-out')
  @HttpCode(202)
  async logOut(@User('id') userId: string, @Res() res: Response) {
    await this.userService.removeRefreshToken(userId);

    res.setHeader('Set-Cookie', this.authService.getCookiesForLogOut());

    res.json({status: 'accepted'});
  }
}
