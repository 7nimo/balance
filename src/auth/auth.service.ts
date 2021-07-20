import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../users/dto/user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user-dto';
import { RegistrationStatus } from './interfaces/registrationStatus.interface';
import { JwtPayload } from './interfaces/jwtPayload.interface';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
    ) {}
    
  async signUp(userDto: CreateUserDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'Congratulations, your account has been successfully created.'
    };

    try {
      await this.usersService.create(userDto);
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }
    return status;
  }

  async validateUser(payload: JwtPayload): Promise<UserDto> {
    const user = await this.usersService.findByPayload(payload);    
    if (!user) {
        throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);    
    }

    return user;  
  }

  async login(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.usersService.authenticate(loginUserDto);

    const token = this._createToken(user);
    
    return { username: user.username, ...token }
  }

  private _createToken({ username }: UserDto): any {
    const user: JwtPayload = { username };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn: process.env.EXPIRES_IN,
      accessToken,
    };
  }
}
