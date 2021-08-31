import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AccountService } from './account.service';
import { CreateAccountDto, UpdateAccountDto } from './dto';
import { AccountEntity } from './entities/account.entity';

@ApiTags('accounts')
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountService) {}

  @Post()
  create(@Body() createAccountDto: CreateAccountDto): Promise<AccountEntity> {
    return this.accountsService.create(createAccountDto);
  }

  @Get()
  findAll(): Promise<AccountEntity[]> {
    return this.accountsService.findAll();
  }

  @Get(':uuid')
  findOne(
    @Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string,
  ): Promise<AccountEntity> {
    return this.accountsService.findOne(uuid);
  }

  @HttpCode(204)
  @Patch(':uuid')
  update(
    @Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ): Promise<void> {
    return this.accountsService.update(uuid, updateAccountDto);
  }

  @HttpCode(204)
  @Delete(':uuid')
  remove(
    @Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string,
  ): Promise<void> {
    return this.accountsService.remove(uuid);
  }
}
