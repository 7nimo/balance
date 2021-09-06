import { Controller, Header, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { Public } from 'src/common/decorators/public.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@User('id') userId: string, @Res() res: Response) {
    const cookie = this.authService.getCookieWithJwt(userId);

    res.setHeader('Set-Cookie', cookie);

    res.json('success');
  }
}
