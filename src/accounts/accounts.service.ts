import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(id: string): Promise<Account> {
    const result = await this.accountsRepository.findOne({ where: { id } });
    if (result === undefined) {
      throw new NotFoundException(`Account with id ${id} does not exist`);
    }
    return result;
  }

  async update(
    uuid: string,
    updateAccountDto: UpdateAccountDto,
  ): Promise<void> {
    const result = await this.accountsRepository.update(uuid, updateAccountDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Account with id ${uuid} does not exist`);
    }
  }

  async remove(uuid: string): Promise<void> {
    await this.accountsRepository.delete(uuid);
  }
}
