import { Account } from '@types';
import { API_URL } from './constants';
import { get } from '../utils/http.util';

export const fetchAccountById = async (accountId: string): Promise<Account | undefined> => {
  const { data: account } = await get<Account>(`${API_URL}/account/${accountId}`);

  return account;
};

export const fetchAccounts = async (): Promise<Account[] | undefined> => {
  const { data: accounts } = await get<Account[]>(`${API_URL}/account`);

  return accounts;
};
