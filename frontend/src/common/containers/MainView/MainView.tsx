import AppBar from 'common/containers/AppBar/AppBar';
import Drawer from 'common/containers/Drawer/Drawer';
import { Outlet } from 'react-location';
import { ReactLocationDevtools } from 'react-location-devtools';
import s from './MainView.module.scss';

function MainView(): React.ReactElement {
  return (
    <div className={s.main}>
      <Drawer />
      <AppBar />
      <main className={s.container}>
        <div className={s.content}>
          <Outlet />
          <ReactLocationDevtools initialIsOpen={false} />
        </div>
      </main>
    </div>
  );
}

export default MainView;
