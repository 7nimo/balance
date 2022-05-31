import { Transaction } from '@types';
import { accountActions } from 'core/store/services/assets/account/slice';
import { store } from 'core/store/store';
import { get } from 'core/utils/http.util';
import { useQuery, UseQueryResult } from 'react-query';

import { API_URL } from './constants';

export const fetchTransactionsByAccountId = async (accountId: string): Promise<Transaction[]> => {
  return get<Transaction[]>(`${API_URL}/account/${accountId}/transaction`);
};

export const useTransactions = (
  accountId: string
): UseQueryResult<Transaction[]> =>
  useQuery(['transactions', accountId], () => fetchTransactionsByAccountId(accountId), {
    notifyOnChangeProps: ['data', 'error'],
    onSuccess:
      (transactions) => store.dispatch(accountActions.mapTransactionsToD3Data({
      accountId,
      transactions
    }))
  });
