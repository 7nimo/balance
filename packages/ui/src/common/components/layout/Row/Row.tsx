import cx from 'classnames';
import React from 'react';

import s from './Row.module.scss';

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

function Row ({ children, className, style }: Props): React.ReactElement {
  return (
    <div
      className={cx(s.Row, className)}
      style={style}
    >
      {children}
    </div>
  );
}

export default Row;
