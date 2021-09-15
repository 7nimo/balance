import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UserDto } from './dto';
import * as argon2 from 'argon2';
import { UserRO } from './user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<UserRO> {
    const userExists = await this.findByEmail(createUserDto.email);
    if (userExists) {
      throw new UnprocessableEntityException(
        'User with this email already exists',
      );
    }
    const user = this.userRepository.create(createUserDto);
    this.userRepository.save(user);

    return {user}; 
  }

  setRefreshToken(userId: string, refreshToken: string) {
    this.userRepository.update(userId, { refreshToken });
  }

  async getUserIfRefreshTokenMatches( userId: string, refreshToken: string): Promise<UserRO> {
    const {user} = await this.findById(userId);
 
    const isRefreshTokenMatching = await argon2.verify(
      user.refreshToken,
      refreshToken
    );
 
    if (isRefreshTokenMatching) {
      return {user};
    }
  }

  async findByEmail(email: string): Promise<UserRO> {
    const user = await this.userRepository.findOne({ email });

    return {user};
  }

  async findById(id: string): Promise<UserRO> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User with this id does not exist');
    }
    return {user};
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async removeRefreshToken(userId: string) {
    return this.userRepository.update(userId, {
      refreshToken: null
    });
  }
}
