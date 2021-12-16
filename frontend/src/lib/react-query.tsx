import { fetchAccounts } from 'api/account';
import { fetchCurrencies } from 'api/currency';
import { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1000 * 20,
    },
  },
});

interface Props {
  children: React.ReactNode;
}

export const ReactQueryProvider: FC<Props> = ({ children }) => {
  queryClient.prefetchQuery('accounts', fetchAccounts);
  queryClient.prefetchQuery('currency', fetchCurrencies);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      {children}
    </QueryClientProvider>
  );
};
