import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../users/dto/user.dto';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // async signUp(createUserDto: CreateUserDto): Promise<UserDto> {
  //   return await this.usersService.create(createUserDto);
  // }

  async verifyPassword(hash: string, password: string): Promise<boolean> {
    return argon2.verify(hash, password);
  }

  async login({ id, email }: UserDto): Promise<string> {
    try {
      return this.jwtService.sign({ email: email, sub: id });
    } catch (error) {
      throw new HttpException(error, HttpStatus.UNAUTHORIZED);
    }
  }
}
