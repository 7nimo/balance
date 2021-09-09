import { Injectable } from '@nestjs/common';
import { TransactionEntity } from 'src/transaction/entities/transaction.entity';
import * as fs from 'fs';
import * as readline from 'readline';
import { EOL } from 'os';
import iconv from 'iconv-lite';

@Injectable()
export class CsvParserService {
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

          // performance test of for loops
          // for (let i = 0; i < records.length; i++) {
          //   const transaction = new TransactionEntity();
          //   for (let j = 0; j < records[i].length; j++) {
          //     transaction.transactionDate = records[i][0].split("/").reverse().join("-");
          //     transaction.transactionType = records[i][1];
          //     transaction.transactionDesc = records[i][4];
          //     if (records[i][5]) transaction.debitAmount = records[i][5];
          //     if (records[i][6]) transaction.creditAmount = records[i][6];
          //     transaction.balance = records[i][7];
          //     transaction.account = accountId;
          //   }
          //   transactions.push(transaction);
          // }
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

  async parseLloydsCsv(
    accountId: string,
    filePath: string,
  ): Promise<TransactionEntity[]> {
    const transactions: TransactionEntity[] = [];
    let records: string[] = [];
    const stream = fs.createReadStream(filePath, 'utf-8').on('end', () => {
      fs.unlink(filePath, (error) => {
        if (error) throw error;
      });
    });

    for await (const data of stream) {
      records = data
        .toString()
        .split('\n')
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
      // exclude rows containing unwanted data
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
}
