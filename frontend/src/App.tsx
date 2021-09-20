import React from 'react';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { useForm } from 'react-hook-form';
import { AuthProvider } from './api/auth';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

type FormValues = {
  email: string;
  password: string;
};

const App: React.FC = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <main className="App">
          <form onSubmit={onSubmit}>
            <input type="email" {...register('email')} />
            <input type="password" {...register('password')} />

            <input type="submit" />
          </form>
        </main>
      </AuthProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
