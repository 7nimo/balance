/* eslint-disable prefer-const */
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import { useAuth } from 'lib/auth';
import Dashboard from 'pages/Dashboard/Dashboard';
// import Home from 'pages/Home/Home';
import Account from 'pages/Account/Account';
import Crypto from 'pages/Crypto/Crypto';
import Calendar from 'pages/Calendar/Calendar';
import { Settings } from 'pages/Settings/Settings';
import SignInPage from 'pages/SignInPage/SignInPage';
import { Layout } from 'components/Layout/Layout';

const routes = (isLoggedIn: boolean): RouteObject[] => [
  {
    path: '/',
    element: isLoggedIn ? <Layout /> : <Navigate to="/sign-in" />,
    children: [
      { path: '/', element: <Navigate to="/dashboard" /> },
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/account', element: <Account /> },
      { path: '/crypto', element: <Crypto /> },
      { path: '/calendar', element: <Calendar /> },
      { path: '/settings', element: <Settings /> },
    ],
  },
  { path: '/sign-in', element: <SignInPage /> },
];

export default function App(): JSX.Element {
  const { user } = useAuth();

  const routing = useRoutes(routes(!!user));

  return <>{routing}</>;
}
