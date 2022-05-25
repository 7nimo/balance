/* eslint-disable sort-keys */
import { AccountEntity, Transaction, UserEntity } from '@types';
import Root from 'components/_Layout/Root/Root';
import SignInForm from 'components/forms/SignInForm/SignInForm';
import SignUpForm from 'components/forms/SignUpForm/SignUpForm';
import { getUserData } from 'core/api/auth';
import { fetchTransactionsByAccountId } from 'core/api/transaction';
import { queryClient } from 'core/lib/react-query';
import AccountOverview from 'modules/Account/AccountOverview';
import React from 'react';
import { MakeGenerics, Navigate, ReactLocation, Route } from 'react-location';

import { fetchAccounts } from './core/api/account';
import AccountContainer from './modules/Account/AccountContainer';
import AccountSettings from './modules/Account/AccountSettings/AccountSettings';
import AccountsPage from './pages/AccountsPage/AccountsPage';
import CalendarPage from './pages/CalendarPage/CalendarPage';
import CryptoPage from './pages/CryptoPage/CryptoPage';
import Dashboard from './pages/Dashboard/Dashboard';
import SettingsPage from './pages/SettingsPage/SettingsPage';

export type LocationGenerics = MakeGenerics<{
  LoaderData: {
    account: AccountEntity;
    accounts: AccountEntity[];
    transactions: Transaction[];
    user: UserEntity;
  };
}>;

export const location = new ReactLocation<LocationGenerics>();

export const routes: Route<LocationGenerics>[] = [
  { path: '/sign-in', element: <SignInForm /> },
  { path: '/sign-up', element: <SignUpForm /> },
  {
    loader: async () => ({
      user: await getUserData()
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
        children: [
          {
            path: '/',
            element: <AccountsPage />,
            loader: async () => ({
              accounts: queryClient.getQueryData('accounts') ??
              await queryClient.fetchQuery('accounts', fetchAccounts)
            })
          },
          {
            path: ':accountId',
            element: <AccountContainer />,
            loader: async ({ params: { accountId } }, { parentMatch }) => ({
              account: await parentMatch?.loaderPromise?.then(({ accounts }) =>
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
