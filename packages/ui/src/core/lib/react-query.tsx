import { fetchAccounts } from '@core/api/account';
import { fetchCurrencies } from '@core/api/currency';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1000
    }
  }
});

type Props = {
  children: React.ReactNode;
};

function ReactQueryProvider ({ children }: Props): React.ReactElement<Props> {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  queryClient.prefetchQuery('accounts', fetchAccounts);
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  queryClient.prefetchQuery('currency', fetchCurrencies);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      {children}
    </QueryClientProvider>
  );
}

export default ReactQueryProvider;
