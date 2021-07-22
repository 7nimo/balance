import * as argon2 from 'argon2';
import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toUserDto } from '../common/shared/mapper';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { LoginUserDto } from './dto/login-user-dto';
import { TokenPayload } from 'src/auth/interfaces/tokenPayload.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(userDto: CreateUserDto): Promise<string> { const { username, password, email } = userDto; const userInDb = await this.usersRepository.findOne({ where: { username }
    });
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const user: User = await this.usersRepository.create({ username, password, email });
    await this.usersRepository.save(user);
    const { id } = toUserDto(user);

    return id;
  }

  async findAll(): Promise<UserDto[]> {
    return this.usersRepository.find();
  }

  async findOne(options?: object): Promise<UserDto> {
    const user = await this.usersRepository.findOne(options);
    return toUserDto(user);
  }

  async validateLoginInformation({ email, password }: LoginUserDto): Promise<UserDto> {
    const user = await this.usersRepository.findOne({ where: { email }});

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    try {
      if (await argon2.verify( user.password , password)) {
        return toUserDto(user);
      } else {
        throw new HttpException('Username or password is incorrect', HttpStatus.UNAUTHORIZED);
      } 
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async findByPayload({ userId }: TokenPayload): Promise<UserDto> {
    return await this.findOne({ where: { userId }});
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
