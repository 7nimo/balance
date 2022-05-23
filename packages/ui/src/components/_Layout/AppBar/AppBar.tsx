import React from 'react';
import { useMatches } from 'react-location';

import Actions from './Actions/Actions';
import s from './AppBar.module.scss';

function AppBar (): React.ReactElement {
  const matches = useMatches();

  return (
    <header className={s.appBar}>
      <section className={s.section}>
        <h1 className={s.h1}>{matches[matches.length - 1]?.pathname}</h1>
      </section>
      <section className={s.section}>
        <Actions />
      </section>
    </header>
  );
}

export default AppBar;
