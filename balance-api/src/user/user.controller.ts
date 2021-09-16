import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { CreateUserDto, UserDto } from './dto';
import { UserRO } from './user.interface';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<UserRO> {
    return this.userService.create(createUserDto);
  }

  @Get(':uuid')
  findById(
    @Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string,
  ): Promise<UserRO> {
    return this.userService.findById(uuid);
  }

  @HttpCode(204)
  @Delete(':uuid')
  remove(
    @Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string,
  ): Promise<void> {
    return this.userService.remove(uuid);
  }
}
