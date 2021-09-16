import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { TransactionEntity } from './entities/transaction.entity';
import { CreateTransactionDto } from './dto';
import { TransactionRO, TransactionsRO } from './transaction.interface';
import { copyLloydsCsv } from './queries/copy-lloyds-csv.query';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
    private readonly connection: Connection,
  ) {}

  async create(
    accountId: string,
    createTransactionDto: CreateTransactionDto,
  ): Promise<TransactionRO> {
    const transaction = this.transactionRepository.create({
      account: accountId,
      ...createTransactionDto,
    });

    await this.transactionRepository.save(transaction);

    return { transaction };
  }

  async createMany(transactions: TransactionEntity[]) {
    try {
      const qb = await this.transactionRepository
        .createQueryBuilder()
        .insert()
        .into(TransactionEntity)
        .values(transactions)
        .execute();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(userId: string, accountId: string): Promise<TransactionsRO> {
    const transactions = await this.transactionRepository
      .createQueryBuilder('transaction')
      .leftJoin('transaction.account', 'account')
      .leftJoin('account.user', 'user')
      .where('account.id = :accountId', { accountId: accountId })
      .andWhere('user.id = :userId', { userId: userId })
      .getMany();

    return { transactions };
  }

  async findOne(userId: string, accountId: number): Promise<TransactionRO> {
    const transaction = await this.transactionRepository
      .createQueryBuilder('transaction')
      .leftJoin('transaction.account', 'account')
      .leftJoin('account.user', 'user')
      .where('account.id = :accountId', { accountId: accountId })
      .andWhere('user.id = :userId', { userId: userId })
      .getOne();

    return { transaction };
  }

  async clear(): Promise<void> {
    await this.transactionRepository.clear();
  }

  async copyFromCsv(accountId: string, filePath: string): Promise<void> {
    const queryRunner = this.connection.createQueryRunner();

    try {
      await queryRunner.query(copyLloydsCsv(accountId, filePath));
    } catch (error) {
      await queryRunner.release();
      throw new Error(error);
    }
  }
}
