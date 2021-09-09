import { Injectable } from '@nestjs/common';
import { TransactionEntity } from 'src/transaction/entities/transaction.entity';
import * as fs from 'fs';
import { TransactionsModule } from 'src/transaction/transaction.module';
import { parseDate } from 'src/common/shared/util';

@Injectable()
export class CsvParserService {

  async parseLloydsCsv(accountId: string, filePath: string): Promise<TransactionEntity[]> {
    return new Promise(function (resolve, reject) {
      const transactions: TransactionEntity[] = [];

      fs.createReadStream(filePath, { encoding: 'utf-8' })
        .on('data', (data) => {
          const records = data.toString().split('\n');
          records.shift();
          records.pop();

          records.forEach((row) => {
            const record = row.split(',');

            const transaction = new TransactionEntity();
            transaction.transactionDate = parseDate(record[0], 'dd/mm/yyyy').toISOString();
            transaction.transactionType = record[1];
            transaction.transactionDesc = record[4];
            if (record[5]) transaction.debitAmount = record[5];
            if (record[6]) transaction.creditAmount = record[6];
            transaction.balance = record[7];
            transaction.account = accountId;

            transactions.push(transaction);
          });
        })
        .on('end', () => {
          console.log('lol: ', transactions);
          resolve(transactions);
        })
        .on('error', error => reject(error))
    });
  }
}