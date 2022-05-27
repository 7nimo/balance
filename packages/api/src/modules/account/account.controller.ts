import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  NotFoundException,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/core/common/decorators/user.decorator';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { AccountService } from './account.service';
import { CreateAccountDto, UpdateAccountDto } from './dto';
import { AccountEntity } from './entities/account.entity';

@ApiTags('account')
@Controller('account')
export class AccountsController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  create(
    @User('id') userId: Partial<UserEntity>,
    @Body() createAccountDto: CreateAccountDto,
  ): Promise<AccountEntity> {
    return this.accountService.create(userId, createAccountDto);
  }

  @Get(':accountId')
  async findOne(
    @User('id') userId: string,
    @Param('accountId', new ParseUUIDPipe()) accountId: string,
  ): Promise<AccountEntity> {
    return await this.accountService.findOne(userId, accountId);
  }

  @Get()
  findAll(@User('id') userId: string): Promise<AccountEntity[]> {
    return this.accountService.findAll(userId);
  }

  @HttpCode(204)
  @Patch(':accountId')
  async update(
    @User('id') userId: string,
    @Param('accountId', new ParseUUIDPipe()) accountId: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ): Promise<void> {
    const account = await this.accountService.findOne(userId, accountId);

    if (account) {
      await this.accountService.update(accountId, updateAccountDto);
    } else
      throw new NotFoundException(
        `Account with id ${accountId} does not exist`,
      );
  }

  @HttpCode(204)
  @Delete(':accountId')
  async remove(
    @User('id') userId: string,
    @Param('accountId') accountId: string,
  ): Promise<void> {
    const result = await this.accountService.remove(userId, accountId);

    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }
}
