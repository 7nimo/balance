import * as argon2 from 'argon2';
import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
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
  ) { }

  async create({ email, password }: CreateUserDto): Promise<User['id']> {
    try {
      this.findByEmail(email)
    } catch (error) {
      // to refactor
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
    const user = this.usersRepository.create({ email, password });
    const { id } = await this.usersRepository.save(user);
    return id;
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        email: email
      }
    });
  }

  async findById(id: UserDto['id']): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        id: id
      }
    });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async delete(id: string): Promise<void> {
    this.usersRepository.delete(id);
  }
}
