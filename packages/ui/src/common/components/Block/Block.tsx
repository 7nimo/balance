import Card from '@components/Card/Card';
import React from 'react';

import s from './Block.module.scss';

type Props = {
  title?: string;
  children: React.ReactNode;
}

function Block ({ children,
  title,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...restProps }: Props & Record<string, any>): React.ReactElement {
  return (
    <div className={s.container}>
      <Card {...restProps}>
        {title ? <h3 className={s.title}>{title}</h3> : null}
        {children}
      </Card>
    </div>
  );
}

export default Block;
