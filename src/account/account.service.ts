import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { getConnection, Repository } from 'typeorm';
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
    createAccountDto: CreateAccountDto): Promise<AccountRO> {
    const account = this.accountRepository.create({user: userId, ...createAccountDto });
    this.accountRepository.save(account);

    return {account};
  }
  
  async findOne(userId: string, accountId: string) {
    const account = await this.accountRepository.findOne({
      where: { user: userId, id: accountId },
      relations: ['bank', 'currency']
    });
    if (!account) {
      throw new NotFoundException(`Account with id ${accountId} does not exist`);
    }
    return {account};
  }
  
  async find(userId: string): Promise<AccountsRO> {    
    const accounts = await this.accountRepository.find({ where: { user: userId}})

    return {accounts};
  }

  async update(
    userId: Partial<UserEntity>,
    uuid: string,
    updateAccountDto: UpdateAccountDto,
  ): Promise<void> {
    const result = await this.accountRepository.update({ user: userId, id: uuid}, updateAccountDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Account with id ${uuid} does not exist`);
    }
  }

  async remove(userId: string, uuid: string): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(AccountEntity)
      .where("user = :userId", { userId: userId })
      .andWhere("id = :id", { id: uuid })
      .execute();
  }
}
