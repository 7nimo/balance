import { fetchTransactionsByAccountId } from 'api/transaction';
import { queryClient } from 'lib/react-query';
import AccountsPage from 'pages/AccountsPage/AccountsPage';
import CalendarPage from 'pages/CalendarPage/CalendarPage';
import CryptoPage from 'pages/CryptoPage/CryptoPage';
import Dashboard from 'pages/Dashboard/Dashboard';
import SettingsPage from 'pages/SettingsPage/SettingsPage';
import SignInPage from 'pages/SignInPage/SignInPage';
import MainViewContainer from 'common/containers/MainViewContainer/MainViewContainer';
import { MakeGenerics, ReactLocation, Route } from 'react-location';
import AccountContainer from 'modules/account/containers/AccountContainer/AccountContainer';

type LocationGenerics = MakeGenerics<{
  Params: { accountId: string };
}>;

export const location = new ReactLocation<LocationGenerics>();

export const routes: Route<LocationGenerics>[] = [
  { path: 'sign-in', element: <SignInPage /> },
  {
    element: <MainViewContainer />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'account',
        children: [
          {
            path: '/',
            element: <AccountsPage />,
            loader: () =>
              queryClient.getQueryData('accounts') ?? queryClient.fetchQuery('accounts'),
          },
          {
            path: ':accountId',
            element: <AccountContainer />,
            loader: ({ params: { accountId } }) =>
              queryClient.getQueryData(['transactions', accountId]) ??
              queryClient.fetchQuery(['transactions', accountId], () =>
                fetchTransactionsByAccountId(accountId)
              ),
            // element: <AccountOverview />
          },
          {
            path: ':id/settings',
            // element: <AccountSettings />
          },
        ],
      },
      { path: 'crypto', element: <CryptoPage /> },
      { path: 'calendar', element: <CalendarPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
];
