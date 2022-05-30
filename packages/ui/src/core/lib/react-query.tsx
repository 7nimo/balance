/* eslint-disable @typescript-eslint/no-floating-promises */
import React from 'react';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // cacheTime: 1000 * 60 * 60,
      refetchOnMount: false,
      // refetchOnReconnect: false,
      refetchOnWindowFocus: false
      // retry: false,
      // staleTime: 1000 * 60 * 60
    }
  },
  queryCache: new QueryCache({
    onError: (error) => {
      console.log('on Error: ', error);
    }
  })
});

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
