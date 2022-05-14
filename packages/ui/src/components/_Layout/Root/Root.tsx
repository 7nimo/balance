import { RelativeElements } from 'components/RelativeElements/RelativeElements';
import Notification from 'components/status/Notification';
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
        <Notification />
        <RelativeElements />
        <div className={s.content}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Root;
