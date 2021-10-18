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
import { User } from 'src/common/decorators/user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';
import { AccountRO, AccountsRO } from './account.interface';
import { AccountService } from './account.service';
import { CreateAccountDto, UpdateAccountDto } from './dto';

@ApiTags('account')
@Controller('account')
export class AccountsController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  create(
    @User('id') userId: Partial<UserEntity>,
    @Body() createAccountDto: CreateAccountDto,
  ): Promise<AccountRO> {
    return this.accountService.create(userId, createAccountDto);
  }

  @Get(':accountId')
  async findOne(
    @User('id') userId: string,
    @Param('accountId') accountId: string,
  ): Promise<AccountRO> {
    const account = await this.accountService.findOne(userId, accountId);

    return { account };
  }

  @Get()
  findAll(@User('id') userId: string): Promise<AccountsRO> {
    return this.accountService.findAll(userId);
  }

  @HttpCode(204)
  @Patch(':accountId')
  async update(
    @User('id') userId: Pick<UserEntity, 'id'>,
    @Param('accountId', new ParseUUIDPipe()) accountId: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ): Promise<void> {
    const result = await this.accountService.update(
      userId,
      accountId,
      updateAccountDto,
    );

    if (result.affected === 0) {
      throw new NotFoundException(
        `Account with id ${accountId} does not exist`,
      );
    }
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
