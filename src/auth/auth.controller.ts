import { Controller, Post, UseGuards } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { Usr } from 'src/common/decorators/usr.decorator';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Usr('id') userId: string): string {
    return this.authService.login(userId);
  }
}
