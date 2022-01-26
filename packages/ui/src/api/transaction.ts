import { Transaction, Transactions } from '@types';
import { useQuery, UseQueryResult } from 'react-query';
import { API_URL } from './constants';
import { get } from '../utils/http.util';

export const fetchTransactionsByAccountId = async (accountId: string): Promise<Transaction[]> => {
  return get<Transaction[]>(`${API_URL}/account/${accountId}/transaction`);
};

export const useTransactions = (
  accountId: string,
  setTransactions?: ({ transactions }: Transactions) => void
): UseQueryResult<Transactions> =>
  useQuery(['transactions', accountId], () => fetchTransactionsByAccountId(accountId), {
    onSuccess: setTransactions,
    notifyOnChangeProps: ['data', 'error'],
  });
