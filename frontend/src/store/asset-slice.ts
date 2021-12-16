import { StateCreator } from 'zustand';
import { DataPoint, Transaction } from '@types';

// export type AssetType = 'FIAT' | 'CRYPTO';

export interface Asset {
  id: number;
  // type: AssetType;
  data?: DataPoint[];
}

const setAssetData = (data: Transaction[]): DataPoint[] => {
  const mappedData: DataPoint[] = data.map((transaction) => ({
    date: transaction.transactionDate,
    value: Math.round((Number(transaction.balance) + Number.EPSILON) * 100) / 100,
  }));
  return mappedData;
};

export type AssetSlice = {
  d3: DataPoint[];
  setData: (data: Transaction[]) => void;
};

export const createAssetSlice: StateCreator<AssetSlice> = (set) => ({
  d3: [],
  setData: (data: any) => {
    set((state) => ({
      ...state,
      d3: setAssetData(data),
    }));
  },
});
