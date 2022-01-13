import { useMatches } from 'react-location';
import { AppBarActions } from '../AppBarActions/AppBarActions';
import s from './AppBar.module.scss';

function AppBar(): React.ReactElement {
  const matches = useMatches();

  return (
    <header className={s.appBar}>
      <section className={s.section}>
        <h1 className={s.h1}>{matches.at(-1)?.pathname}</h1>
      </section>
      <section className={s.section}>
        <AppBarActions />
      </section>
    </header>
  );
}

export default AppBar;
