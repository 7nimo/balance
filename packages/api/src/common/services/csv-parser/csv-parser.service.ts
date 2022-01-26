import { Injectable } from '@nestjs/common';
import { AccountEntity } from 'src/account/entities/account.entity';
import { CsvParserFactory } from 'src/common/factories/csv-parser.factory';

@Injectable()
export class CsvParserService {
  constructor(private readonly csvParserFactory: CsvParserFactory) {}

  parse(account: AccountEntity, filePath: string) {
    const bankName = account.bank.name;

    const parser = this.csvParserFactory.getParser(bankName);

    return parser(account.id, filePath);
  }
}
