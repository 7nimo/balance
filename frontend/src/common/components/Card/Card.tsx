// import cx from 'classnames';
import { FC } from 'react';
import s from './Card.module.scss';

interface Props extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const Card: FC<Props> = ({ style, children }) => {
  return (
    <div style={style} className={s.card}>
      {children}
    </div>
  );
};
