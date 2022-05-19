import NavButton from 'components/buttons/navigation/NavButton/NavButton';
import SvgBank from 'components/icons/Bank';
import SvgBtc from 'components/icons/Btc';
import SvgCalendar from 'components/icons/Calendar';
import SvgPieChart from 'components/icons/PieChart';
import SvgSettings from 'components/icons/Settings';
import Logo from 'components/misc/Logo/Logo';
import React from 'react';

import s from './Drawer.module.scss';

function Drawer (): React.ReactElement {
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
        <li className={s.listItem}>
          <NavButton
            icon={<SvgBank />}
            label='Accounts'
            link='account'
          />
        </li>
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
