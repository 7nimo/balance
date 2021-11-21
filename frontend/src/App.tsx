import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Dashboard from 'pages/Dashboard/Dashboard';
import AccountPage from 'pages/AccountPage/AccountPage';
import CryptoPage from 'pages/CryptoPage/CryptoPage';
import CalendarPage from 'pages/CalendarPage/CalendarPage';
import { SettingsPage } from 'pages/SettingsPage/SettingsPage';
import SignInPage from 'pages/SignInPage/SignInPage';
import { MainViewContainer } from 'common/containers/MainViewContainer/MainViewContainer';
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
        <Route element={<MainViewContainer />}>
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
                <AccountPage />
              </RequireAuth>
            }
          />
          <Route
            path="/crypto"
            element={
              <RequireAuth>
                <CryptoPage />
              </RequireAuth>
            }
          />
          <Route
            path="/calendar"
            element={
              <RequireAuth>
                <CalendarPage />
              </RequireAuth>
            }
          />
          <Route
            path="/settings"
            element={
              <RequireAuth>
                <SettingsPage />
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
