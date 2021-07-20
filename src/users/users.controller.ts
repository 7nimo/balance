import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto }from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<UserDto[]> { 
    return this.usersService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<UserDto> {
    return this.usersService.findOne({ id });
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
