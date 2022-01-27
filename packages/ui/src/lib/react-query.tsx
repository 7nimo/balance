import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { fetchAccounts } from 'src/api/account';
import { fetchCurrencies } from 'src/api/currency';

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

async function ReactQueryProvider ({ children }: Props): Promise<React.ReactElement> {
  await queryClient.prefetchQuery('accounts', fetchAccounts);
  await queryClient.prefetchQuery('currency', fetchCurrencies);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      {children}
    </QueryClientProvider>
  );
}

export default ReactQueryProvider;
