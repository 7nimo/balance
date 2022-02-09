/* eslint-disable sort-keys */
import Nope from '@components/Nope';
import { fetchAccounts } from '@core/api/account';
import { fetchTransactionsByAccountId } from '@core/api/transaction';
import { queryClient } from '@core/lib/react-query';
import React from 'react';
import { MakeGenerics, Navigate, ReactLocation, Route } from 'react-location';

import MainView from './common/containers/MainView/MainView';
import AccountContainer from './modules/account/containers/AccountContainer/AccountContainer';
import AccountSettings from './modules/account/containers/AccountSettings/AccountSettings';
import NewAccount from './modules/account/containers/NewAccount/NewAccount';
import AccountsPage from './pages/AccountsPage/AccountsPage';
import CalendarPage from './pages/CalendarPage/CalendarPage';
import CryptoPage from './pages/CryptoPage/CryptoPage';
import Dashboard from './pages/Dashboard/Dashboard';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import SignInPage from './pages/SignInPage/SignInPage';

type LocationGenerics = MakeGenerics<{
  Params: { accountId: string };
}>;

export const location = new ReactLocation<LocationGenerics>();

export const routes: Route<LocationGenerics>[] = [
  { path: '/', element: <Navigate to='./dashboard' /> },
  { path: 'sign-in', element: <SignInPage /> },
  {
    element: <MainView />,
    children: [
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
            loader: () =>
              queryClient.getQueryData('accounts') ??
              queryClient.fetchQuery('accounts', () => fetchAccounts())
          },
          {
            path: '/new',
            element: <NewAccount />
          },
          {
            path: ':accountId/settings',
            element: <AccountSettings />
          },
          {
            path: ':accountId',
            element: <AccountContainer />,
            loader: ({ params: { accountId } }) =>
              queryClient.getQueryData(['transactions', accountId]) ??
              queryClient.fetchQuery(['transactions', accountId], () =>
                fetchTransactionsByAccountId(accountId)
              )
            // todo: error element
            // element: <AccountOverview />
          }
        ]
      },
      { path: 'crypto', element: <CryptoPage /> },
      { path: 'calendar', element: <CalendarPage /> },
      { path: 'settings', element: <SettingsPage /> },
      {
        path: '*',
        element: <Nope />
      }
    ]
  }
];
