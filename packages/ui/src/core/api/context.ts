import { ContextData } from '@types';
import { useQuery, UseQueryResult } from 'react-query';

import { get } from '../utils/http.util';
import { API_URL } from './constants';

export const fetchContextData = async (): Promise<ContextData> => {
  return get<ContextData>(`${API_URL}/context`);
};

export const useContextData = (): UseQueryResult<ContextData> => useQuery('contextData', fetchContextData, {
  cacheTime: Infinity,
  staleTime: Infinity
});
