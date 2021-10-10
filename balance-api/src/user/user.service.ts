import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository, ReturningStatementNotSupportedError } from 'typeorm';
import { CreateUserDto, UserDto } from './dto';
import * as argon2 from 'argon2';
import { UserRO } from './user.interface';
import { constants } from 'buffer';

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
    const hashedRefreshToken = await argon2.hash(refreshToken);
    
    try {
      await this.userRepository.update(userId, { refreshToken: hashedRefreshToken }); 
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUserIfRefreshTokenMatches(
    userId: string,
    refreshToken: string,
  ): Promise<UserRO> {

    const { refreshToken: hashedRefreshToken , ...user } = await this.getUserWithRefreshToken(userId);

    const isEqual = await argon2.verify(hashedRefreshToken, refreshToken);

    if (!isEqual) {
      throw new UnauthorizedException('Error validating refresh token');
    }

    return { user } as UserRO;
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

  async revokeRefreshToken(userId: string) {
    return this.userRepository.update(userId, {
      refreshToken: '',
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
