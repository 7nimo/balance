import { useMatch } from 'react-location';
import { AppBarActions } from '../AppBarActions/AppBarActions';
import s from './AppBar.module.scss';

function AppBar(): React.ReactElement {
  const { params } = useMatch();

  return (
    <header className={s.appBar}>
      <section className={s.section}>
        {/* <nav>todo</nav> */}
        <h1 className={s.h1}>{params.id}</h1>
      </section>
      <section className={s.section}>
        <AppBarActions />
      </section>
    </header>
  );
}

export default AppBar;
