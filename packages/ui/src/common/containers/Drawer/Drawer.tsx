import SvgBank from '@components/icons/Bank';
import SvgBtc from '@components/icons/Btc';
import SvgCalendar from '@components/icons/Calendar';
import SvgCoin from '@components/icons/Coin';
import SvgPieChart from '@components/icons/PieChart';
import SvgSettings from '@components/icons/Settings';
import NavButton from '@components/navigation/NavButton/NavButton';
import { queryClient } from '@core/lib/react-query';
import { Account, Accounts } from '@types';
import React, { useEffect, useState } from 'react';

import Logo from '../../components/Logo/Logo';
import s from './Drawer.module.scss';

function Drawer (): React.ReactElement {
  const data = queryClient.getQueryData<Accounts>('accounts');
  const [accounts, setAccounts] = useState<Account[] | []>();

  const renderAccounts = accounts?.map((account) => {
    return (
      <NavButton
        icon={<SvgCoin />}
        key={account.id}
        label={account.name}
        link={`account/${account.id}`}
        small
      />
    );
  });

  useEffect(() => {
    if (data?.accounts) {
      setAccounts(data.accounts);
    }
  }, [data]);

  console.log(accounts);

  return (
    <nav className={s.sidebar}>
      <Logo />

      <ul className={s.list}>
        <li className={s.listItem}>
          <NavButton
            icon={<SvgPieChart />}
            label='Assets'
            link='dashboard'
          />
        </li>
        <ul className={s.listItem}>
          <NavButton
            icon={<SvgBank />}
            label='Accounts'
            link='account'
          />
          {renderAccounts}
        </ul>
        <li className={s.listItem}>
          <NavButton
            icon={<SvgBtc />}
            label='Crypto'
            link='crypto'
          />
        </li>
        <li className={s.listItem}>
          <NavButton
            icon={<SvgCalendar />}
            label='Calendar'
            link='calendar'
          />
        </li>
        <li className={s.listItem}>
          <NavButton
            icon={<SvgSettings />}
            label='Settings'
            link='settings'
          />
        </li>
      </ul>
    </nav>
  );
}

export default Drawer;
