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

  async findOne(options?: object): Promise<User> {
    const user = await this.usersRepository.findOne(options);
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ email });
    return user;
  }
  
  async findAll(): Promise<UserDto[]> {
    return this.usersRepository.find();
  }
  
  async create(userDto: CreateUserDto): Promise<string> { 
    const { password, email } = userDto; 

    const userInDb = await this.usersRepository.findOne({ where: { email }});

    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const user: User = await this.usersRepository.create({ email, password });
    await this.usersRepository.save(user);
    const { id } = toUserDto(user);

    return id;
  }

  async findByPayload({ userId }: TokenPayload): Promise<UserDto> {
    return await this.findOne({ where: { userId }});
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
