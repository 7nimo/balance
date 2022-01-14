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
import { fetchAccounts } from 'api/account';
import Nope from 'common/components/Nope';
import AccountSettings from 'modules/account/containers/AccountSettings/AccountSettings';
import NewAccount from 'modules/account/containers/NewAccount/NewAccount';

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
              queryClient.getQueryData('accounts') ??
              queryClient.fetchQuery('accounts', () => fetchAccounts()),
          },
          {
            path: '/new',
            element: <NewAccount />,
          },
          {
            path: ':accountId/settings',
            element: <AccountSettings />,
          },
          {
            path: ':accountId',
            element: <AccountContainer />,
            loader: ({ params: { accountId } }) =>
              queryClient.getQueryData(['transactions', accountId]) ??
              queryClient.fetchQuery(['transactions', accountId], () =>
                fetchTransactionsByAccountId(accountId)
              ),
            // todo: error element
            // element: <AccountOverview />
          },
        ],
      },
      { path: 'crypto', element: <CryptoPage /> },
      { path: 'calendar', element: <CalendarPage /> },
      { path: 'settings', element: <SettingsPage /> },
      {
        path: '*',
        element: <Nope />,
      },
    ],
  },
];
