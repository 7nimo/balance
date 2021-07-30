import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../users/dto/user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { RegistrationStatus } from './interfaces/registrationStatus.interface';
import * as argon2 from 'argon2';
import { toUserDto } from 'src/common/shared/mapper';


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async signUp(userData: CreateUserDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'Congratulations, your account has been successfully created.'
    };

    try {
      await this.usersService.create(userData);
    } catch (error) {
      status = {
        success: false,
        message: error,
      };
    }
    return status;
  }

  async validateUser(email: string, password: string): Promise<UserDto> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    try {
      if (await argon2.verify(user.password, password)) {
        const userDto = toUserDto(user)
        return userDto;
      }
    } catch (err) {
      throw new HttpException('', HttpStatus.UNAUTHORIZED);
    }
  }

  async login(user: UserDto) {
    const payload = { email: user.email, sub: user.id };

    //to do: error handling
    console.log('siema')
    let token;
    
    try {
      token = this.jwtService.sign(payload);
      console.log('Token: ', token);
      
    } catch (error) {
      console.log(error)  
    }
    

    return {
      access_token: token,
    };
  }
}
