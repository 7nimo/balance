import { AccountEntity, CreateAccountDto } from '@types';
import { useQuery, UseQueryResult } from 'react-query';

import { get, post } from '../utils/http.util';
import { API_URL } from './constants';

export const createAccount = async (accountData: CreateAccountDto): Promise<void> => {
  await post<AccountEntity>(`${API_URL}/account`, accountData);
};

export const fetchAccountById = async (accountId: string): Promise<AccountEntity> => {
  return get<AccountEntity>(`${API_URL}/account/${accountId}`);
};

export const fetchAccounts = async (): Promise<AccountEntity[]> => {
  return get<AccountEntity[]>(`${API_URL}/account`);
};

export const useAccounts = (): UseQueryResult<AccountEntity[]> => useQuery('accounts', fetchAccounts);

export const useAccount = (accountId: string): UseQueryResult<{ account: AccountEntity }> =>
  useQuery(['account', accountId], () => fetchAccountById(accountId));
