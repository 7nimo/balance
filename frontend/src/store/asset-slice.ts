import { StateCreator } from 'zustand';
import { DataPoint, Transaction } from '@types';
import * as d3 from 'd3';

type D3Data = d3.InternMap<Date, number[]>;

export type AssetSlice = {
  assets: Map<string, D3Data>;
  setAssetD3Data: (
    key: string,
    transactions: Transaction[],
    assets: Map<string, d3.InternMap<Date, number[]>>
  ) => void;
};

const mapAssetData = (data: Transaction[]): D3Data => {
  const dateParser = d3.timeParse('%Y-%m-%d');

  const mappedData: DataPoint[] = data.map((transaction) => ({
    date: dateParser(transaction.transactionDate)!,
    value: Math.round((Number(transaction.balance) + Number.EPSILON) * 100) / 100,
  }));

  const reduced = d3.rollup(
    mappedData,
    (d) => d.flatMap((v) => v.value),
    (d) => d.date
  );

  return reduced;
};

const setD3Data = async (
  key: string,
  transactions: Transaction[]
): Promise<Map<string, D3Data>> => {
  const data = mapAssetData(transactions);

  const sorted = d3.sort(data, ([a], [b]) => d3.descending(a, b));

  const map = new Map(sorted);

  const assets: Map<string, D3Data> = new Map();

  assets.set(key, map);
  return assets;
};

export const createAssetSlice: StateCreator<AssetSlice> = (set) => ({
  assets: new Map(),
  setAssetD3Data: async (key, transactions) => {
    const response = await setD3Data(key, transactions);
    set((state) => ({
      ...state,
      assets: response,
    }));
  },
});
