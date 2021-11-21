import { AppBar } from 'common/containers/AppBar/AppBar';
import { NavigationDrawer } from 'common/containers/NavigationDrawer/NavigationDrawer';
import { Outlet } from 'react-router-dom';
import { FC, useEffect, useState } from 'react';
import { Account } from '@types';
import { useQuery } from 'react-query';
import { fetchAccounts } from 'api/account';
import s from './MainViewContainer.module.scss';

export const MainViewContainer: FC = () => {
  const { data } = useQuery('accounts', fetchAccounts);
  const [accounts, setAccounts] = useState<Account[] | []>([]);

  useEffect(() => {
    if (data) {
      setAccounts(data.accounts);
    }
  }, [data]);

  return (
    <div className={s.main}>
      <NavigationDrawer accounts={accounts} />
      <AppBar />
      <main className={s.container}>
        <div className={s.content}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};
