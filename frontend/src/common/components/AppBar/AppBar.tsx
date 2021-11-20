import { useLocation } from 'react-router-dom';
import { AppBarActions } from './AppBarActions/AppBarActions';
import s from './AppBar.module.scss';

export const AppBar = (): JSX.Element => {
  const location = useLocation();

  return (
    <header className={s.topAppBar}>
      <section className={s.section}>
        {/* <nav>todo</nav> */}
        <h1 className={s.h1}>{location.pathname}</h1>
      </section>
      <section className={s.section}>
        <AppBarActions />
      </section>
    </header>
  );
};
