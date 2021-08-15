import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../models/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../models/users/dto/user.dto';
import { CreateUserDto } from '../models/users/dto/create-user.dto';
import * as argon2 from 'argon2';
import { toUserDto } from 'src/common/shared/mapper';
import { LoginUserDto } from 'src/models/users/dto/login-user-dto';


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async signUp(userData: CreateUserDto): Promise<UserDto['id']> {
      return await this.usersService.create(userData);
  }

  async validateUser(credentials: LoginUserDto): Promise<UserDto> {
    const { email, password } = credentials;
    try {
      const user = await this.usersService.findByEmail(email);

      if (user && this.verifyPassword(password, user.password)) {
        return toUserDto(user);
      };
    } catch(error) {
      throw new HttpException('Incorrect username or password', HttpStatus.UNAUTHORIZED);
    }
  }

  async verifyPassword(password: string, userPassword: string): Promise<boolean> {
    return argon2.verify(password, userPassword);
  }

  async login({ id, email }: UserDto): Promise<string> {
    try {
      return this.jwtService.sign({ email: email, sub: id});
    } catch (error) {
      throw new HttpException(error, HttpStatus.UNAUTHORIZED) 
    }
  }
}

