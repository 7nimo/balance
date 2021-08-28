import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const userExists = await this.findByEmail(createUserDto.email);
    if (userExists) {
      throw new UnprocessableEntityException(
        'User with this email already exists',
      );
    }
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email: email } });
  }

  findById(id: string): Promise<User> {
    return this.usersRepository.findOne({ where: { id: id } });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
