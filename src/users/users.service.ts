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

  async create({ email, password }: CreateUserDto): Promise<UserDto> {
    if (await this.findByEmail(email)) {
      throw new HttpException(
        'Email is invalid or already taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    try {
      const user = this.usersRepository.create({ email, password });
      const result = await this.usersRepository.save(user);
      return result;
    } catch (error) {
      throw new HttpException(error, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        email: email,
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

  async remove(id: string): Promise<void> {
    this.usersRepository.delete(id);
  }
}
