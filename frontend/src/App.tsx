import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Dashboard from 'pages/Dashboard/Dashboard';
import Account from 'pages/Account/Account';
import Crypto from 'pages/Crypto/Crypto';
import Calendar from 'pages/Calendar/Calendar';
import { Settings } from 'pages/Settings/Settings';
import SignInPage from 'pages/SignInPage/SignInPage';
import { Layout } from 'components/Layout/Layout';
import { FC } from 'react';
import { AuthProvider, useAuth } from 'lib/auth';
// import { queryClient } from 'lib/react-query';

export const RequireAuth: FC<{ children: JSX.Element }> = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user) {
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }

  return children;
};

export const App: FC = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Navigate to="/dashboard" />
              </RequireAuth>
            }
          />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/account/:id"
            element={
              <RequireAuth>
                <Account />
              </RequireAuth>
            }
          />
          <Route
            path="/crypto"
            element={
              <RequireAuth>
                <Crypto />
              </RequireAuth>
            }
          />
          <Route
            path="/calendar"
            element={
              <RequireAuth>
                <Calendar />
              </RequireAuth>
            }
          />
          <Route
            path="/settings"
            element={
              <RequireAuth>
                <Settings />
              </RequireAuth>
            }
          />
        </Route>
        <Route path="/sign-in" element={<SignInPage />} />
      </Routes>
    </AuthProvider>
  );

  // const routes = (isLoggedIn: boolean): RouteObject[] => [
  //   {
  //     path: '/',
  //     element: isLoggedIn ? <Layout /> : <Navigate to="/sign-in" />,
  //     children: [
  //       { path: '/', element: <Navigate to="dashboard" /> },
  //       { path: '/dashboard', element: <Dashboard /> },
  //       { path: '/account/:id', element: <Account /> },
  //       { path: '/crypto', element: <Crypto /> },
  //       { path: '/calendar', element: <Calendar /> },
  //       { path: '/settings', element: <Settings /> },
  //     ],
  //   },
  //   { path: '/sign-in', element: <SignInPage /> },
  // ];

  // const routing = useRoutes(routes(!!user));

  // return <>{routing}</>;
};
