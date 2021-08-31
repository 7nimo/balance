import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountDto, UpdateAccountDto } from './dto';
import { AccountEntity } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) {}

  create(createAccountDto: CreateAccountDto): Promise<AccountEntity> {
    const account = this.accountRepository.create(createAccountDto);

    return this.accountRepository.save(account);
  }

  findAll(): Promise<AccountEntity[]> {
    return this.accountRepository.find();
  }

  async findOne(id: string): Promise<AccountEntity> {
    const result = await this.accountRepository.findOne({ where: { id } });
    if (result === undefined) {
      throw new NotFoundException(`Account with id ${id} does not exist`);
    }
    return result;
  }

  async update(
    uuid: string,
    updateAccountDto: UpdateAccountDto,
  ): Promise<void> {
    const result = await this.accountRepository.update(uuid, updateAccountDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Account with id ${uuid} does not exist`);
    }
  }

  async remove(uuid: string): Promise<void> {
    await this.accountRepository.delete(uuid);
  }
}
