import { AccountEntity, CreateAccountDto, UpdateAccountDto } from '@types';
import { useQuery, UseQueryResult } from 'react-query';

import { get, patch, post } from '../utils/http.util';
import { API_URL } from './constants';

export const createAccount = async (accountData: CreateAccountDto): Promise<AccountEntity> => {
  return await post<AccountEntity>(`${API_URL}/account`, accountData);
};

export const updateAccount = async (accountId: string, accountData: UpdateAccountDto): Promise<void> => {
  await patch<AccountEntity>(`${API_URL}/account/${accountId}`, accountData);
};

export const fetchAccountById = async (accountId: string): Promise<AccountEntity> => {
  return get<AccountEntity>(`${API_URL}/account/${accountId}`);
};

export const fetchAccounts = async (): Promise<AccountEntity[]> => {
  return get<AccountEntity[]>(`${API_URL}/account`);
};

export const useAccounts = (): UseQueryResult<AccountEntity[]> => useQuery('accounts', fetchAccounts);

export const useAccount = (accountId: string): UseQueryResult<AccountEntity> =>
  useQuery(['account', accountId], () => fetchAccountById(accountId));
