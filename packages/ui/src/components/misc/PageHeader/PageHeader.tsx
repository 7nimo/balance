import React from 'react';

import s from './PageHeader.module.scss';

type Props = {
  title: string;
  icon: React.ReactElement;
};

function PageHeader ({ icon, title }: Props): React.ReactElement {
  return (
    <div className={s.container}>
      <div className={s.header}>
        {icon}
        <h1>{title}</h1>
      </div>
    </div>
  );
}

export default PageHeader;
