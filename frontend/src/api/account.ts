import { Account, AccountsRO } from '@types';
import { API_URL } from './constants';
import { get } from '../utils/http.util';

export const fetchAccountById = async (accountId: string): Promise<Account | undefined> => {
  return get<Account>(`${API_URL}/account/${accountId}`);
};

export const fetchAccounts = async (): Promise<AccountsRO> => {
  return get<AccountsRO>(`${API_URL}/account`);
};
