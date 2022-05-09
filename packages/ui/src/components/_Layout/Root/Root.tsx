import React from 'react';
import { Outlet, useMatch } from 'react-location';
import { ReactLocationDevtools } from 'react-location-devtools';

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
        <div className={s.content}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Root;
