import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AccountEntity } from 'src/modules/account/entities/account.entity';
import { DataSource } from 'typeorm';
import { TransactionEntity } from '../entities/transaction.entity';
import { TransactionImportedEvent } from '../events/transastion-imported.event';

@Injectable()
export class TransactionImportedListener {
  constructor(private dataSource: DataSource) {}

  @OnEvent('transaction.imported')
  async handleTransactionImportedEvent(event: TransactionImportedEvent) {
    const mostRecentTransaction = await this.dataSource
      .getRepository(TransactionEntity)
      .createQueryBuilder('transaction')
      .orderBy('transaction_date', 'DESC')
      .leftJoin('transaction.account', 'account')
      .leftJoin('account.user', 'user')
      .where('account.id = :accountId', { accountId: event.accountId })
      .andWhere('user.id = :userId', { userId: event.userId })
      .getOne();

    // update current account balance
    await this.dataSource
      .createQueryBuilder()
      .update(AccountEntity)
      .set({ balance: +mostRecentTransaction.balance })
      .where('id = :id', { id: event.accountId })
      .andWhere('account.id = :accountId', { accountId: event.accountId })
      .execute();
  }
}
