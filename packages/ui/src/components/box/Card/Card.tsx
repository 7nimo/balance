// import cx from 'classnames';
import cx from 'classnames';
import React from 'react';

import s from './Card.module.scss';

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

function Card ({ children, className, style }: Props): React.ReactElement {
  return (
    <div
      className={cx(s.card, className)}
      style={style}
    >
      {children}
    </div>
  );
}

export default Card;
