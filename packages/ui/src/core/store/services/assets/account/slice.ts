
/* eslint-disable sort-keys */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataPoint, Transaction } from '@types';
import * as d3 from 'd3';

export interface Account {
  id: string;
  data: d3.InternMap<Date, number | number[]>
}

export interface TransactionsPayload {
  accountId: string,
  transactions: Transaction[]
}

export type AccountsState = Account[];

export const accountSlice = createSlice({
  name: 'accounts',
  initialState: [] as AccountsState,
  reducers: {
    mapTransactionsToD3Data (state, action: PayloadAction<TransactionsPayload>) {
      const account = state.find((account) => account.id === action.payload.accountId);

      if (account) {
        account.data = mapToD3(action.payload.transactions);
      } else {
        state.push({
          id: action.payload.accountId,
          data: mapToD3(action.payload.transactions)
        });
      }
    }
  }
});

export const accountActions = accountSlice.actions;

export type AccountSlice = {
  [accountSlice.name]: ReturnType<typeof accountSlice['reducer']>
}

function mapToD3 (data: Transaction[]): d3.InternMap<Date, number | number[]> {
  const dateParser = d3.timeParse('%Y-%m-%d');

  const mappedData: DataPoint[] = data.map((transaction) => ({
    date: dateParser(transaction.transactionDate)!,
    value: Math.round((Number(transaction.balance) + Number.EPSILON) * 100) / 100
  }));

  const reduced = d3.rollup(
    mappedData,
    (d) => d.flatMap((v) => v.value),
    (d) => d.date
  );

  return reduced;
}
