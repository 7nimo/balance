import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private accountsRepository: Repository<Account>,
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
