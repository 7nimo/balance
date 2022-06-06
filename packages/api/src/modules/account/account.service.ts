import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateAccountDto, UpdateAccountDto } from './dto';
import { AccountEntity } from './entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
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
        bank: true,
        currency: true,
      },
    });
  }

  async update(
    accountId: string,
    updateData: UpdateAccountDto,
  ): Promise<UpdateResult> {
    return this.accountRepository.update(accountId, updateData);
  }

  async patch(accountId: string, updateData: UpdateAccountDto) {
    return this.accountRepository.update({ id: accountId }, updateData);
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
