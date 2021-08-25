import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { StatementSavedEvent } from '../events/statement-saved.event';

@Injectable()
export class StatementSavedListener {
  @OnEvent('statement.saved')
  handleStatementSavedEvent(event: StatementSavedEvent) {
    // code
    console.log('EVENT!');
  }
}
