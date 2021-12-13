import SvgBank from 'common/components/icons/Bank';
import SvgCalendar from 'common/components/icons/Calendar';
import SvgPieChart from 'common/components/icons/PieChart';
import SvgSettings from 'common/components/icons/Settings';
import { NavButton } from 'common/components/NavButton/NavButton';
import { NavButtonExpandable } from 'common/components/NavButtonExpandable/NavButtonExpandable';
import { FC, ReactElement } from 'react';
import SvgBtc from 'common/components/icons/Btc';
import SvgCash from 'common/components/icons/Cash';
import { Account } from '@types';
import Logo from '../../components/Logo/Logo';
import s from './NavigationDrawer.module.scss';

type Props = {
  accounts: Account[] | [];
};

export const NavigationDrawer: FC<Props> = ({ accounts }) => {
  const renderAccounts = (): ReactElement | ReactElement[] | null => {
    return accounts.length
      ? accounts.map((account) => (
          <div className={s.listItem} key={account.id}>
            <NavButton link={`account/${account.id}`} label={account.name} icon={<SvgCash />} />
          </div>
        ))
      : null;
  };

  return (
    <nav className={s.sidebar}>
      <Logo />

      <ul className={s.list}>
        <li className={s.listItem}>
          <NavButton link="dashboard" label="Assets" icon={<SvgPieChart />} />
        </li>
        <li className={s.listItem}>
          <NavButtonExpandable label="Bank Accounts" icon={<SvgBank />}>
            {renderAccounts()}
          </NavButtonExpandable>
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
