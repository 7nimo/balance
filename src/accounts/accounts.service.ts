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

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    return this.accountsRepository.save(createAccountDto);
  }

  async findAll(): Promise<Account[]> {
    return this.accountsRepository.find();
  }

  async findOne(uuid: string): Promise<Account> {
    return this.accountsRepository.findOne(uuid);
  }

  async update(
    uuid: string,
    updateAccountDto: UpdateAccountDto,
  ): Promise<UpdateResult> {
    return this.accountsRepository.update(uuid, updateAccountDto);
  }

  async remove(uuid: string): Promise<DeleteResult> {
    return this.accountsRepository.delete(uuid);
  }
}
