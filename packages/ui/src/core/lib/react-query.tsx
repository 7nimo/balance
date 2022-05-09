import { fetchAccounts } from 'core/api/account';
import { fetchCurrencies } from 'core/api/currency';
import React from 'react';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1000
    }
  },
  queryCache: new QueryCache({
    onError: (error) => {
      console.log('on Error: ', error);
    }
  })
});

async function prefetchData () {
  await queryClient.prefetchQuery('accounts', fetchAccounts);
  await queryClient.prefetchQuery('currency', fetchCurrencies);
}

type Props = {
  children: React.ReactNode;
};

function ReactQueryProvider ({ children }: Props): React.ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      {children}
    </QueryClientProvider>
  );
}

export default ReactQueryProvider;
