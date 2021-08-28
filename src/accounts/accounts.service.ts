import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountDto, UpdateAccountDto } from './dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountsRepository: Repository<Account>,
  ) {}

  create(createAccountDto: CreateAccountDto): Promise<Account> {
    return this.accountsRepository.save(createAccountDto);
  }

  findAll(): Promise<Account[]> {
    return this.accountsRepository.find();
  }

  findOne(uuid: string): Promise<Account> {
    return this.accountsRepository.findOne(uuid);
  }

  async update(
    uuid: string,
    updateAccountDto: UpdateAccountDto,
  ): Promise<void> {
    await this.accountsRepository.update(uuid, updateAccountDto);
  }

  async remove(uuid: string): Promise<void> {
    await this.accountsRepository.delete(uuid);
  }
}
