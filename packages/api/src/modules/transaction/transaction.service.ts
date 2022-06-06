import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TransactionEntity } from './entities/transaction.entity';
import { CreateTransactionDto } from './dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TransactionImportedEvent } from './events/transastion-imported.event';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
    private eventEmitter: EventEmitter2,
  ) {}

  async createMany(
    accountId: string,
    userId: string,
    transactions: CreateTransactionDto[],
  ) {
    const result = await this.transactionRepository
      .createQueryBuilder()
      .insert()
      .into(TransactionEntity)
      .values(transactions)
      .execute();

    const transactionImportedEvent = new TransactionImportedEvent();
    transactionImportedEvent.accountId = accountId;
    transactionImportedEvent.userId = userId;

    this.eventEmitter.emit('transaction.imported', transactionImportedEvent);

    return result;
  }

  async findAll(
    userId: string,
    accountId: string,
  ): Promise<TransactionEntity[]> {
    return await this.transactionRepository
      .createQueryBuilder('transaction')
      .orderBy('transaction_date', 'DESC')
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
