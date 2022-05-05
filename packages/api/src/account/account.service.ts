import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { DeleteResult, getConnection, Repository, UpdateResult } from 'typeorm';
import { AccountRO, AccountsRO } from './account.interface';
import { CreateAccountDto, UpdateAccountDto } from './dto';
import { AccountEntity } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) {}

  async create(
    userId: Partial<UserEntity>,
    createAccountDto: CreateAccountDto,
  ): Promise<AccountRO> {
    const account = this.accountRepository.create({
      user: userId,
      ...createAccountDto,
    });
    await this.accountRepository.save(account);

    return { account };
  }

  async findOne(userId: string, accountId: string) {
    return await this.accountRepository.findOne({
      where: {
        accountId: accountId,
        user: {
          userId: userId,
        },
      },
      relations: {
        bank: true,
        currency: true,
        user: true,
      },
    });
  }

  async findAll(userId: string): Promise<AccountsRO> {
    const accounts = await this.accountRepository.find({
      where: {
        user: {
          userId: userId,
        },
      },
      relations: {
        user: true,
      },
    });

    return { accounts };
  }

  async update(
    account: AccountEntity,
    updateData: UpdateAccountDto,
  ): Promise<UpdateResult> {
    return this.accountRepository.update(account, updateData);
  }

  async remove(userId: string, accountId: string): Promise<DeleteResult> {
    return getConnection()
      .createQueryBuilder()
      .delete()
      .from(AccountEntity)
      .where('user = :userId', { userId: userId })
      .andWhere('id = :id', { id: accountId })
      .execute();
  }
}
