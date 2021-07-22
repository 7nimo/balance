import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../users/dto/user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user-dto';
import { RegistrationStatus } from './interfaces/registrationStatus.interface';
import { TokenPayload } from './interfaces/tokenPayload.interface';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
    ) {}
    
  async signUp(registrationData: CreateUserDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'Congratulations, your account has been successfully created.'
    };

    try {
      await this.usersService.create(registrationData);
    } catch (error) {
      status = {
        success: false,
        message: error,
      };
    }
    return status;
  }

  async validateUser(userId: TokenPayload): Promise<UserDto> {
    const user = await this.usersService.findByPayload(userId);    
    if (!user) {
        throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);    
    }

    return user;  
  }

  async login(userData: LoginUserDto): Promise<{user: UserDto, token: string}> {
    const user = await this.usersService.validateLoginInformation(userData);

    const { id: userId } = user;

    const token = this._createToken({ userId });
    
    return { user, ...token };
  }

  private _createToken({ userId }: TokenPayload): any {
    const accessToken = this.jwtService.sign(userId);
    return {
      expiresIn: process.env.EXPIRES_IN,
      accessToken,
    };
  }
}
