import { Outlet } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import s from './MainLayout.module.scss';

export default function MainLayout(): JSX.Element {
  return (
    <div className={s.flex}>
      <NavBar />
      <div className={s.desktop}>
        <main className={s.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
