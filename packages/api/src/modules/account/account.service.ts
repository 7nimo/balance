import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateAccountDto, UpdateAccountDto } from './dto';
import { AccountEntity } from './entities/account.entity';
import { ACCOUNT_REPOSITORY } from './constants';
import { DATA_SOURCE } from 'src/core/database/constants';

@Injectable()
export class AccountService {
  constructor(
    @Inject(ACCOUNT_REPOSITORY)
    private readonly accountRepository: Repository<AccountEntity>,
    @Inject(DATA_SOURCE)
    private readonly dataSource: DataSource,
  ) {}

  async create(
    userId: Partial<UserEntity>,
    createAccountDto: CreateAccountDto,
  ): Promise<AccountEntity> {
    const account = this.accountRepository.create({
      user: userId,
      ...createAccountDto,
    });
    await this.accountRepository.save(account);

    return account;
  }

  async findOne(userId: string, accountId: string) {
    return await this.accountRepository.findOne({
      where: {
        id: accountId,
        user: {
          id: userId,
        },
      },
      relations: {
        bank: true,
        currency: true,
        user: true,
      },
    });
  }

  async findAll(userId: string): Promise<AccountEntity[]> {
    return await this.accountRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: {
        user: true,
      },
    });
  }

  async update(
    account: AccountEntity,
    updateData: UpdateAccountDto,
  ): Promise<UpdateResult> {
    return this.accountRepository.update(account, updateData);
  }

  async remove(userId: string, accountId: string): Promise<DeleteResult> {
    return await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(AccountEntity)
      .where('user = :userId', { userId: userId })
      .andWhere('id = :id', { id: accountId })
      .execute();
  }
}
