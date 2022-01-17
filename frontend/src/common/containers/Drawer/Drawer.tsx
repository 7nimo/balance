import NavButton from 'common/components/navigation/NavButton/NavButton';
import SvgBtc from 'common/components/icons/Btc';
import SvgBank from 'common/components/icons/Bank';
import SvgCalendar from 'common/components/icons/Calendar';
import SvgPieChart from 'common/components/icons/PieChart';
import SvgSettings from 'common/components/icons/Settings';
import SvgCoin from 'common/components/icons/Coin';
import { queryClient } from 'lib/react-query';
import { Account, Accounts } from '@types';
import { useEffect, useState } from 'react';
import s from './Drawer.module.scss';
import Logo from '../../components/Logo/Logo';

function Drawer(): React.ReactElement {
  const data = queryClient.getQueryData<Accounts>('accounts');
  const [accounts, setAccounts] = useState<Account[] | []>();

  const renderAccounts = accounts?.map((account) => {
    return (
      <NavButton
        key={account.id}
        link={`account/${account.id}`}
        label={account.name}
        icon={<SvgCoin />}
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
          <NavButton link="dashboard" label="Assets" icon={<SvgPieChart />} />
        </li>
        <ul className={s.listItem}>
          <NavButton link="account" label="Accounts" icon={<SvgBank />} />
          {renderAccounts}
        </ul>
        <li className={s.listItem}>
          <NavButton link="crypto" label="Crypto" icon={<SvgBtc />} />
        </li>
        <li className={s.listItem}>
          <NavButton link="calendar" label="Calendar" icon={<SvgCalendar />} />
        </li>
        <li className={s.listItem}>
          <NavButton link="settings" label="Settings" icon={<SvgSettings />} />
        </li>
      </ul>
    </nav>
  );
}

export default Drawer;
