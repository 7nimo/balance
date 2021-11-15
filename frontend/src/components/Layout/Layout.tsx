import { NavigationDrawer } from 'components/NavigationDrawer/NavigationDrawer';
import { TopAppBar } from 'components/TopAppBar/TopAppBar';
import { Outlet } from 'react-router-dom';
import s from './Layout.module.scss';

export const Layout = (): JSX.Element => {
  return (
    <div className={s.main}>
      <NavigationDrawer />
      <TopAppBar />
      <div className={s.contentContainer}>
        <main className={s.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
