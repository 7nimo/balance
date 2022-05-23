import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/core/common/decorators/public.decorator';
import { User } from 'src/core/common/decorators/user.decorator';
import { CreateUserDto } from './dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      return await this.userService.create(createUserDto);
    } catch (error) {
      throw new UnprocessableEntityException(
        'Email is invalid or already taken',
      );
    }
  }

  @Get()
  findById(@User('id') userId: string): Promise<UserEntity> {
    if (userId !== undefined) {
      return this.userService.findById(userId);
    } else {
      throw new UnauthorizedException();
    }
  }

  @HttpCode(204)
  @Delete()
  async remove(@User('id') userId: string): Promise<void> {
    await this.userService.remove(userId);
  }
}
