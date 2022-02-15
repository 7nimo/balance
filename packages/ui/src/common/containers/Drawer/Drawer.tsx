import { Account, Accounts } from '@types';
import SvgBank from 'common/components/icons/Bank';
import SvgBtc from 'common/components/icons/Btc';
import SvgCalendar from 'common/components/icons/Calendar';
import SvgCoin from 'common/components/icons/Coin';
import SvgPieChart from 'common/components/icons/PieChart';
import SvgSettings from 'common/components/icons/Settings';
import NavButton from 'common/components/navigation/NavButton/NavButton';
import { queryClient } from 'lib/react-query';
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
