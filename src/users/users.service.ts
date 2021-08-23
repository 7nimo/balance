import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    try {
      this.findByUsername(createUserDto.username);
    } catch (error) {
      // to refactor
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
    const user = this.usersRepository.create(createUserDto);
    const result = await this.usersRepository.save(user);
    return result;
  }

  async findByUsername(username: string): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        username: username,
      },
    });
  }

  async findById(id: string): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async delete(id: string): Promise<void> {
    this.usersRepository.delete(id);
  }
}
