import { useAuth } from './lib/auth';
import { SignInForm } from './forms/SignInForm/SignInForm';
import MainLayout from './components/Layout/MainLayout/MainLayout';
import s from './App.module.scss';

function App(): JSX.Element {
  const { user } = useAuth();
  return (
    <>
      {user ? (
        <MainLayout />
      ) : (
        <div className={s.mainBackground}>
          <div className={s.fullscreenLayout}>
            <SignInForm />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
