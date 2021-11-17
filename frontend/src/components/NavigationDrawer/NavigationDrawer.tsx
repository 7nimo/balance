import { fetchAccounts } from 'api/account';
import SvgBank from 'components/icons/Bank';
import SvgCalendar from 'components/icons/Calendar';
import SvgPieChart from 'components/icons/PieChart';
import SvgSettings from 'components/icons/Settings';
import { NavButton } from 'components/NavButton/NavButton';
// import { queryClient } from 'lib/react-query';
import { NavButtonExpandable } from 'components/NavButtonExpandable/NavButtonExpandable';
import { FC, useEffect, useState } from 'react';
import { Account } from '@types';
import SvgBtc from 'components/icons/Btc';
import { useQuery } from 'react-query';
import LogoWrapper from '../Logo/Logo';
import s from './NavigationDrawer.module.scss';

export const NavigationDrawer: FC = () => {
  // const { loading, data, error } = useQuery('accounts', fetchAccounts);
  const { data } = useQuery('accounts', fetchAccounts);
  const [accounts, setAccounts] = useState<Account[] | []>([]);

  useEffect(() => {
    if (data) {
      setAccounts(data.accounts);
    }
  }, [data]);

  return (
    <nav className={s.sidebar}>
      <LogoWrapper />

      <ul className={s.list}>
        <li className={s.listItem}>
          <NavButton link="dashboard" label="Assets" icon={<SvgPieChart />} />
        </li>
        <li className={s.listItem}>
          <NavButtonExpandable
            link="account"
            label="Bank Accounts"
            icon={<SvgBank />}
            data={accounts}
          />
        </li>
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
};
