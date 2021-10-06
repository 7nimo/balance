import { Injectable } from '@nestjs/common';
import { TransactionEntity } from 'src/transaction/entities/transaction.entity';
import * as fs from 'fs';
import * as readline from 'readline';
import { EOL } from 'os';

@Injectable()
export class CsvParserFactory {
  private parsers = {
    Lloyds: this.parseLloydsCsv,
    mBank: this.parseMBankCsv,
  };

  getParser(bankName: string) {
    return this.parsers[bankName];
  }

  async parseLloydsCsv(
    accountId: string,
    filePath: string,
  ): Promise<TransactionEntity[]> {
    const transactions: TransactionEntity[] = [];
    let records: string[] = [];

    const stream = fs.createReadStream(filePath).on('end', () => {
      fs.unlink(filePath, (error) => {
        if (error) throw error;
      });
    });

    for await (const data of stream) {
      records = data
        .toString()
        .split(EOL)
        .slice(1, -1)
        .map((row: string) => row.split(','));
    }

    for (const record of records) {
      const transaction = new TransactionEntity();
      transaction.transactionDate = record[0].split('/').reverse().join('-');
      transaction.transactionType = record[1];
      transaction.transactionDesc = record[4];
      if (record[5]) transaction.debitAmount = record[5];
      if (record[6]) transaction.creditAmount = record[6];
      transaction.balance = record[7];
      transaction.account = accountId;

      transactions.push(transaction);
    }
    return transactions;
  }

  async parseMBankCsv(
    accountId: string,
    filePath: string,
  ): Promise<TransactionEntity[]> {
    const transactions: TransactionEntity[] = [];
    const rows: string[] = [];

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const iconv = require('iconv-lite');

    const stream = fs
      .createReadStream(filePath)
      .pipe(iconv.decodeStream('win1250'))
      .on('end', () => {
        fs.unlink(filePath, (error) => {
          if (error) throw error;
        });
      });

    const rl = readline.createInterface({
      input: stream,
      crlfDelay: Infinity,
      terminal: false,
    });

    for await (const line of rl) {
      rows.push(line);
    }

    const records = rows
      // exclude rows containing unwanted data from csv
      .slice(38, -5)
      .map((row: string) => row.split(';'));

    for (const record of records) {
      const transaction = new TransactionEntity();
      transaction.transactionDate = record[0];
      transaction.transactionType = record[2];
      transaction.transactionDesc = `${record[3]} ${record[4]}`
        .replace(/\s+/g, ' ')
        .trim();
      if (+record[6] < 0) {
        transaction.debitAmount = Math.abs(+record[6]).toFixed(2);
      } else {
        transaction.creditAmount = (+record[6]).toFixed(2);
      }
      transaction.balance = (+record[7]).toFixed(2);
      transaction.account = accountId;

      transactions.push(transaction);
    }
    return transactions;
  }

  async parseLloydsTest(
    accountId: string,
    filePath: string,
  ): Promise<TransactionEntity[]> {
    return new Promise(function (resolve, reject) {
      const transactions: TransactionEntity[] = [];

      fs.createReadStream(filePath, { encoding: 'utf-8' })
        .on('data', (data) => {
          const records = data
            .toString()
            .split(EOL)
            .slice(1, -1)
            .map((row: string) => row.split(','));

          records.forEach((record) => {
            const transaction = new TransactionEntity();
            transaction.transactionDate = record[0]
              .split('/')
              .reverse()
              .join('-');
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
          fs.unlink(filePath, (error) => {
            if (error) throw error;
          });
          resolve(transactions);
        })
        .on('error', (error) => reject(error));
    });
  }
}
