import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TransactionEntity } from './entities/transaction.entity';
import { CreateTransactionDto } from './dto';
import { TRANSACTION_REPOSITORY } from './constants';

@Injectable()
export class TransactionService {
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private readonly transactionRepository: Repository<TransactionEntity>,
  ) {}

  async createMany(transactions: CreateTransactionDto[]) {
    return await this.transactionRepository
      .createQueryBuilder()
      .insert()
      .into(TransactionEntity)
      .values(transactions)
      .execute();
  }

  async findAll(
    userId: string,
    accountId: string,
  ): Promise<TransactionEntity[]> {
    return await this.transactionRepository
      .createQueryBuilder('transaction')
      .orderBy('transaction_date', 'ASC')
      .leftJoin('transaction.account', 'account')
      .leftJoin('account.user', 'user')
      .where('account.id = :accountId', { accountId: accountId })
      .andWhere('user.id = :userId', { userId: userId })
      .getMany();
  }

  async findOne(userId: string, accountId: number): Promise<TransactionEntity> {
    return await this.transactionRepository
      .createQueryBuilder('transaction')
      .leftJoin('transaction.account', 'account')
      .leftJoin('account.user', 'user')
      .where('account.id = :accountId', { accountId: accountId })
      .andWhere('user.id = :userId', { userId: userId })
      .getOne();
  }
}
