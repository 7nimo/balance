import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionDto } from './dto/transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { copyLloydsCsv } from './queries/copy-lloyds-csv.query';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
    private connection: Connection,
  ) {}

  create(createTransactionDto: CreateTransactionDto) {
    // to do: error handling
    return this.transactionsRepository.save(createTransactionDto);
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

  findAll(): Promise<TransactionDto[]> {
    return this.transactionsRepository.find();
  }

  findOne(id: number) {
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