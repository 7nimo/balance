import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const userExists = await this.findByEmail(createUserDto.email);
    if (userExists) {
      throw new UnprocessableEntityException(
        'User with this email already exists',
      );
    }
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  findByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({ email });
  }

  async findById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne(id);
    if (user) {
      return user;
    }
    throw new NotFoundException('User with this id does not exist');
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
