import React from 'react';
import './App.css';

import { useAuth } from './lib/auth';
import { UserInfo } from './components/UserInfo';
import { Login } from './components/Login';
import { Button } from './components/Button';

const App: React.FC = () => {
  const { user } = useAuth();
  return (
    <main>
      {user ? <UserInfo /> : <Login />}
      <div className="box">
        <Button />
      </div>
    </main>
  );
};

export default App;
