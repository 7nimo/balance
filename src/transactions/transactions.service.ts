import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionDto, TransactionDto } from './dto';
import { TransactionRO } from './transaction.interface';
import { copyLloydsCsv } from './queries/copy-lloyds-csv.query';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>,
    private readonly connection: Connection,
  ) {}

  async create(createTransactionDto: CreateTransactionDto): Promise<TransactionRO> {
    // to do: error handling
    const response = await this.transactionsRepository.save(createTransactionDto);

    return response;
  }

  // is this needed?
  async createMany(transactions: CreateTransactionDto[]) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(transactions[0]);
      await queryRunner.manager.save(transactions[1]);

      await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  handleCsvImport(uuid: string, path: string): Promise<void> {
    // to do
    return;
  }

  findAll(): Promise<Transaction[]> {
    return this.transactionsRepository.find();
  }

  findOne(id: number): Promise<TransactionRO> {
    return this.transactionsRepository.findOne({ where: { id } });
  }

  async clear(): Promise<void> {
    await this.transactionsRepository.clear();
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