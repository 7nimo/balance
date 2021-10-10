import { API_URL } from '../config/constants';
import { Account } from '../models';
import { get } from '../utils/http.util';

export const fetchAccount = async (accountId: string): Promise<Account | undefined> => {
  const { data: account } = await get<Account>(`${API_URL}/account/${accountId}`);

  return account;
};
