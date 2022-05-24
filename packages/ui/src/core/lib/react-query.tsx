/* eslint-disable @typescript-eslint/no-floating-promises */
import { fetchContextData } from 'core/api/context';
import React from 'react';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1000 * 60 * 60 * 24
    }
  },
  queryCache: new QueryCache({
    onError: (error) => {
      console.log('on Error: ', error);
    }
  })
});

const prefetchData = async () => await queryClient.prefetchQuery('contextData', fetchContextData);

type Props = {
  children: React.ReactNode;
};

function ReactQueryProvider ({ children }: Props): React.ReactElement {
  prefetchData();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      {children}
    </QueryClientProvider>
  );
}

export default ReactQueryProvider;
