import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { StatementSavedEvent } from '../events/statement-saved.event';
import { TransactionService } from 'src/transaction/transaction.service';

@Injectable()
export class StatementSavedListener {
  constructor(private readonly transactionService: TransactionService) {}

  @OnEvent('statement.saved')
  async handleStatementSavedEvent(event: StatementSavedEvent) {
    const result = await this.transactionService.copyFromCsv(
      event.id,
      event.path,
    );

    console.log(result);
  }
}
