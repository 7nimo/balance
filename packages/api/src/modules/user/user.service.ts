import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDto } from './dto';
import * as argon2 from 'argon2';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    createUserDto.password = await argon2.hash(createUserDto.password);

    const user = this.userRepository.create(createUserDto);

    await this.userRepository.save(user);

    return user;
  }

  async findById(id: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.userRepository.delete(id);
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

  async saveRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await argon2.hash(refreshToken);

    await this.userRepository.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async revokeRefreshToken(userId: string) {
    return this.userRepository.update(userId, {
      refreshToken: '',
    });
  }
}
