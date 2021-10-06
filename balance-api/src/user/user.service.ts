import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { getConnection, Repository } from 'typeorm';
import { CreateUserDto, UserDto } from './dto';
import * as argon2 from 'argon2';
import { UserRO } from './user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserRO> {
    const user = await this.findByEmail(createUserDto.email);
    if (user) {
      throw new UnprocessableEntityException(
        'User with this email already exists',
      );
    }
    const newUser = this.userRepository.create(createUserDto);
    this.userRepository.save(newUser);

    return { user: newUser };
  }

  async saveRefreshToken(userId: string, refreshToken: string) {
    const refreshTokenHash = await argon2.hash(refreshToken);

    this.userRepository.update(userId, { refreshToken: refreshTokenHash });
  }

  async getUserIfRefreshTokenMatches(
    userId: string,
    refreshToken: string,
  ): Promise<UserEntity> {
    const user = await this.getUserWithRefreshToken(userId);

    const isEqual = await argon2.verify(refreshToken, user.refreshToken);

    if (isEqual) {
      return user;
    }
    throw new UnauthorizedException('Error validating refresh token');
  }

  async findById(id: string): Promise<UserRO> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException('User with this id does not exist');
    }
    return { user };
  }

  async findByEmail(email: string): Promise<UserRO> {
    const user = await this.userRepository.findOne({ email });

    if (!user) {
      throw new NotFoundException('User with this id does not exist');
    }
    return { user };
  }

  async remove(id: string): Promise<void> {
    this.userRepository.delete(id);
  }

  async removeRefreshToken(userId: string) {
    return this.userRepository.update(userId, {
      refreshToken: null,
    });
  }

  async getUserWithPwd(email: string): Promise<UserEntity> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .select('user')
      .addSelect('user.password')
      .where('user.email = :email', { email: email })
      .getOneOrFail();

    return user;
  }

  async getUserWithRefreshToken(userId: string): Promise<UserEntity> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .select('user')
      .addSelect('user.refreshToken')
      .where('user.id = :userId', { userId: userId })
      .getOneOrFail();

    return user;
  }
}
