import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const userExists = await this.findByEmail(createUserDto.email);
    if (userExists) {
      throw new UnprocessableEntityException(
        'User with this email already exists',
      );
    }
    const user = this.usersRepository.create(createUserDto);
    const result = this.usersRepository.save(user);
    return result;
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email: email } });
  }

  async findById(id: string): Promise<User> {
    return this.usersRepository.findOne({ where: { id: id } });
  }

  async remove(id: string): Promise<void> {
    this.usersRepository.delete(id);
  }
}
