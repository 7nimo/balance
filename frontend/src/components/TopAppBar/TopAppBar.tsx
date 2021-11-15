import { useLocation } from 'react-router-dom';
import s from './TopAppBar.module.scss';

export const TopAppBar = (): JSX.Element => {
  const location = useLocation();

  return (
    <header className={s.topAppBar}>
      <section className={s.section}>
        {/* <nav>todo</nav> */}
        <h1 className={s.h1}>{location.pathname}</h1>
      </section>
      <section className={s.section}>actions</section>
    </header>
  );
};
