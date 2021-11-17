import { fetchAccounts } from 'api/account';
import { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

interface Props {
  children: React.ReactNode;
}

export const ReactQueryProvider: FC<Props> = ({ children }) => {
  queryClient.prefetchQuery('accounts', fetchAccounts);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      {children}
    </QueryClientProvider>
  );
};
