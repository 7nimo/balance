import { Currency } from '@types';
import { useQuery, UseQueryResult } from 'react-query';

import { get } from '../utils/http.util';
import { API_URL } from './constants';

export const fetchCurrencies = async (): Promise<Currency> => {
  return get<Currency>(`${API_URL}/currency`);
};

export const useCurrency = (): UseQueryResult<Currency> => useQuery('currency', fetchCurrencies);
