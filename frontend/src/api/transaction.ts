import { Transaction } from '@types';
import { useQuery, UseQueryResult } from 'react-query';
import { API_URL } from './constants';
import { get } from '../utils/http.util';

export const fetchTransactionsByAccountId = async (
  accountId: string
): Promise<Transaction[] | []> => {
  return get<Transaction[]>(`${API_URL}/account/${accountId}/transaction`);
};

export const useTransactions = (accountId: string): UseQueryResult<Transaction[]> =>
  useQuery(['transactions', accountId], () => fetchTransactionsByAccountId(accountId));
