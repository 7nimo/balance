import { useAuth } from '../lib/auth';

export function UserInfo(): JSX.Element {
  const { user, logout } = useAuth();
  return (
    <div>
      <div style={{ width: '100%', height: '300px' }}>Welcome {JSON.stringify(user)}</div>
      <button type="button" onClick={() => logout()}>
        Log Out
      </button>
    </div>
  );
}
