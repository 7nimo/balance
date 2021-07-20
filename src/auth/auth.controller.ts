import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user-dto';
import { AuthService } from './auth.service';
import { RegistrationStatus } from './interfaces/registrationStatus.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  public async signup(@Body() createUserDto: CreateUserDto): Promise<RegistrationStatus> {
    const result: RegistrationStatus = await this.authService.signUp(createUserDto);
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto): Promise<LoginUserDto> {
    return await this.authService.login(loginUserDto);
  }
}
