import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseUUIDPipe, Post, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({ 
    status: 201, 
    description: 'The record has been successfully created.',
    type: User,
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return await this.usersService.create(createUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':uuid')
  findById(@Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string): Promise<User> {
    return this.usersService.findById(uuid);
  }

  @Delete(':uuid')
  remove(@Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string): Promise<void> {
    return this.usersService.remove(uuid);
  }
}
