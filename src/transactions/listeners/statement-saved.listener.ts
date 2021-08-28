import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { StatementSavedEvent } from '../events/statement-saved.event';
import { TransactionsService } from 'src/transactions/transactions.service';

@Injectable()
export class StatementSavedListener {
  constructor(
    private transactionsService: TransactionsService
    ) {}

  @OnEvent('statement.saved')
  async handleStatementSavedEvent(event: StatementSavedEvent) {

    const result = await this.transactionsService.copyFromCsv(event.id, event.path);

    console.log(result);
  }
}
