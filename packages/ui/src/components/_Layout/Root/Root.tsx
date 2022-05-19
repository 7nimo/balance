import React from 'react';
import { Outlet, useMatch } from 'react-location';

import AppBar from '../AppBar/AppBar';
import Drawer from '../Drawer/Drawer';
import s from './Root.module.scss';

function Root (): React.ReactElement {
  const { data: { user } } = useMatch();

  return (
    <div className={s.main}>
      <Drawer />
      <AppBar />
      <main className={s.container}>
        <Outlet />
      </main>
    </div>
  );
}

export default Root;
