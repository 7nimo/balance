/* eslint-disable sort-keys */
import { AccountEntity, Transaction, UserEntity } from '@types';
import Root from 'components/_Layout/Root/Root';
import SignInForm from 'components/forms/SignInForm/SignInForm';
import SignUpForm from 'components/forms/SignUpForm/SignUpForm';
import { getUserData } from 'core/api/auth';
import { fetchContextData } from 'core/api/context';
import { fetchTransactionsByAccountId } from 'core/api/transaction';
import { queryClient } from 'core/lib/react-query';
import AccountOverview from 'modules/Account/AccountOverview';
import React from 'react';
import { MakeGenerics, Navigate, ReactLocation, Route } from 'react-location';

import { fetchAccounts } from './core/api/account';
import AccountContainer from './modules/Account/AccountContainer';
import AccountSettings from './modules/Account/components/AccountSettings/AccountSettings';
import AccountsPage from './pages/AccountsPage/AccountsPage';
import CalendarPage from './pages/CalendarPage/CalendarPage';
import CryptoPage from './pages/CryptoPage/CryptoPage';
import Dashboard from './pages/Dashboard/Dashboard';
import SettingsPage from './pages/SettingsPage/SettingsPage';

export type LocationGenerics = MakeGenerics<{
  LoaderData: {
    _account: AccountEntity;
    accounts: AccountEntity[];
    _transactions: Transaction[];
    user: UserEntity;
  };
}>;

export const location = new ReactLocation<LocationGenerics>();

export const routes: Route<LocationGenerics>[] = [
  { path: '/sign-in', element: <SignInForm /> },
  { path: '/sign-up', element: <SignUpForm /> },
  {
    loader: async () => ({
      user: await getUserData(),
      context: await queryClient.fetchQuery('contextData', fetchContextData)
    }),
    element: <Root />,
    errorElement: <Navigate to='./sign-in' />,
    children: [
      {
        path: '/',
        element: <Navigate to='/dashboard' />
      },
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'account',
        loader: async () => ({
          accounts: queryClient.getQueryData('accounts') ??
          await queryClient.fetchQuery('accounts', fetchAccounts)
        }),
        children: [
          {
            path: '/',
            element: <AccountsPage />
          },
          {
            path: ':accountId',
            element: <AccountContainer />,
            loader: async ({ params: { accountId } }, { parentMatch }) => ({
              _account: await parentMatch?.loaderPromise?.then(({ accounts }) =>
                accounts?.find((account) => account.id === accountId)
              ),
              transactions: queryClient.getQueryData(['transactions', accountId]) ??
                await queryClient.fetchQuery(['transactions', accountId],
                () => fetchTransactionsByAccountId(accountId))
            }),
            children: [
              {
                path: '/',
                element: <AccountOverview />
              },
              {
                path: 'settings',
                element: <AccountSettings />
              }
            ]
          }
        ]
      },
      { path: 'calendar', element: <CalendarPage /> },
      { path: 'crypto', element: <CryptoPage /> },
      { path: 'settings', element: <SettingsPage /> }
    ]
  }
];
