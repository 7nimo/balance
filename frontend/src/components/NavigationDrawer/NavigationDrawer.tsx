import SvgBank from 'components/icons/Bank';
import SvgBitcoin from 'components/icons/Bitcoin';
import SvgCalendar from 'components/icons/Calendar';
import SvgPieChart from 'components/icons/PieChart';
import SvgSettings from 'components/icons/Settings';
import NavButton from 'components/NavButton/NavButton';
import LogoWrapper from '../Logo/Logo';
import s from './NavigationDrawer.module.scss';

export function NavigationDrawer(): JSX.Element {
  return (
    <nav className={s.sidebar}>
      <LogoWrapper />

      <ul className={s.list}>
        <li className={s.listItem}>
          <NavButton link="dashboard" label="Assets" icon={<SvgPieChart />} />
        </li>
        <li className={s.listItem}>
          <NavButton link="account" label="Bank Accounts" icon={<SvgBank />} />
        </li>
        <li className={s.listItem}>
          <NavButton link="crypto" label="Crypto" icon={<SvgBitcoin />} />
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
