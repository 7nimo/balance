import AppBar from 'common/containers/AppBar/AppBar';
import Drawer from 'common/containers/NavigationDrawer/NavigationDrawer';
import { Outlet } from 'react-location';
import s from './MainViewContainer.module.scss';

function MainViewContainer(): React.ReactElement {
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

export default MainViewContainer;
