import SignInPage from 'pages/SignInPage/SignInPage';
import App from 'App';
import { useAuth } from '../../lib/auth';

function AppContainer(): JSX.Element {
  const { user } = useAuth();
  return <>{user ? <App /> : <SignInPage />}</>;
}

export default AppContainer;
