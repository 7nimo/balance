import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { BankAccount } from './entities/bank-account.entity';

@Injectable()
export class BankAccountsService {
  constructor(
    @InjectRepository(BankAccount)
    private bankAccountsRepository: Repository<BankAccount>,
  ) {}

  async create(createBankAccountDto: CreateBankAccountDto): Promise<BankAccount> {
    return this.bankAccountsRepository.save(createBankAccountDto);
  }

  async findAll(): Promise<BankAccount[]> {
    return this.bankAccountsRepository.find();
  }

  async findOne(uuid: string): Promise<BankAccount> {
    return this.bankAccountsRepository.findOne(uuid);
  }

  async update(uuid: string, updateBankAccountDto: UpdateBankAccountDto): Promise<void> {
    this.bankAccountsRepository.update(uuid, updateBankAccountDto);
  }

  async remove(uuid: string): Promise<void> {
    this.bankAccountsRepository.delete(uuid);
  }
}
