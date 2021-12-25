import { StateCreator } from 'zustand';
import { DataPoint, Transaction } from '@types';
import * as d3 from 'd3';

export type AssetSlice = {
  assets: Map<string, d3.InternMap<Date, DataPoint[]>>;
  // createAsset: (key: string, assets: Map<string, DataPoint[]>) => void;
  setAssetData: (
    key: string,
    transactions: Transaction[],
    assets: Map<string, d3.InternMap<Date, DataPoint[]>>
  ) => void;
};

const mapAssetData = (data: Transaction[]): d3.InternMap<Date, DataPoint[]> => {
  const dateParser = d3.timeParse('%Y-%m-%d');
  const mappedData: DataPoint[] = data.map((transaction) => ({
    date: dateParser(transaction.transactionDate)!,
    value: Math.round((Number(transaction.balance) + Number.EPSILON) * 100) / 100,
  }));
  const grouppedByDate = d3.group(mappedData, (d: DataPoint) => d.date);
  return grouppedByDate;
};

// const createAsset = (key: string, assets: Map<string, DataPoint[]>): Map<string, DataPoint[]> => {
//   return assets.set(key, []);
// };

const setAssetData = (
  key: string,
  transactions: Transaction[],
  assets: Map<string, d3.InternMap<Date, DataPoint[]>>
): Map<string, d3.InternMap<Date, DataPoint[]>> => {
  const mappedData = mapAssetData(transactions);
  assets.set(key, mappedData);
  return assets;
};

export const createAssetSlice: StateCreator<AssetSlice> = (set) => ({
  assets: new Map(),
  // createAsset: (key, assets) => createAsset(key, assets),
  setAssetData: (key, transactions, assets) => {
    set((state) => ({
      ...state,
      assets: setAssetData(key, transactions, assets),
    }));
  },
});
