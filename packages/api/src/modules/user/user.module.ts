import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './entities/user.entity';
import { DatabaseModule } from 'src/core/database/database.module';
import { userProvider } from './user.provider';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), DatabaseModule],
  providers: [...userProvider, UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
