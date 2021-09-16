import React from 'react';
import './App.css';
import SignInForm from './components/Login';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import { AuthProvider } from './providers/auth.provider';

 const queryClient = new QueryClient({
   defaultOptions: {
     queries: {
       refetchOnWindowFocus: false,
     },
   },
 });


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <main className="App">
        </main>
      </AuthProvider>

      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  );
}

export default App;
