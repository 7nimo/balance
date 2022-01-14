import { NavButton } from 'common/components/NavButton/NavButton';
import SvgBtc from 'common/components/icons/Btc';
import SvgBank from 'common/components/icons/Bank';
import SvgCalendar from 'common/components/icons/Calendar';
import SvgPieChart from 'common/components/icons/PieChart';
import SvgSettings from 'common/components/icons/Settings';
import s from './Drawer.module.scss';
import Logo from '../../components/Logo/Logo';

function Drawer(): React.ReactElement {
  // const renderAccounts = accounts?.map((account) => {
  //   return (
  //     <div className={s.listItem} key={account.id}>
  //       <NavButton link={`account/${account.id}`} label={account.name} icon={<SvgCash />} />
  //     </div>
  //   );
  // });

  return (
    <nav className={s.sidebar}>
      <Logo />

      <ul className={s.list}>
        <li className={s.listItem}>
          <NavButton link="dashboard" label="Assets" icon={<SvgPieChart />} />
        </li>
        <li className={s.listItem}>
          <NavButton link="account" label="Bank Account" icon={<SvgBank />} />
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
}

export default Drawer;
