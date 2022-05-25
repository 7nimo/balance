import { AccountEntity, Accounts } from '@types';
import { useQuery, UseQueryResult } from 'react-query';

import { get, post } from '../utils/http.util';
import { API_URL } from './constants';

export const createAccount = async (accountData: Partial<AccountEntity>): Promise<void> => {
  await post<Partial<AccountEntity>>(`${API_URL}/account`, accountData);
};

export const fetchAccountById = async (accountId: string): Promise<AccountEntity> => {
  return get<AccountEntity>(`${API_URL}/account/${accountId}`);
};

export const fetchAccounts = async (): Promise<Accounts> => {
  return get<Accounts>(`${API_URL}/account`);
};

export const useAccounts = (): UseQueryResult<Accounts> => useQuery('accounts', fetchAccounts);

export const useAccount = (accountId: string): UseQueryResult<{ account: AccountEntity }> =>
  useQuery(['account', accountId], () => fetchAccountById(accountId));
