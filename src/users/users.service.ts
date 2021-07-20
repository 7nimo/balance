
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toUserDto } from '../common/shared/mapper';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(userDto: CreateUserDto): Promise<UserDto> {
    const { username, password, email } = userDto;
    
    const userInDb = await this.usersRepository.findOne({
      where: { username }
    });

    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const user: User = await this.usersRepository.create({ username, password, email });
    await this.usersRepository.save(user);

    return toUserDto(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }
  
  findByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne(username);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
