import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { CreateUserDto } from './dto';
import { UserRO } from './user.interface';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserRO> {
    try {
      return await this.userService.create(createUserDto);
    } catch (error) {
      throw new UnprocessableEntityException(
        'Email is invalid or already taken',
      );
    }
  }

  @Get()
  findById(@User('id') userId: string): Promise<UserRO> {
    return this.userService.findById(userId);
  }

  @HttpCode(204)
  @Delete()
  async remove(@User('id') userId: string): Promise<void> {
    await this.userService.remove(userId);
  }
}
