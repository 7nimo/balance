import { FC, ReactNode } from 'react';
import s from './ActionBar.module.scss';

type Props = {
  children?: ReactNode;
};

export const ActionBar: FC<Props> = ({ children }) => {
  return <section className={s.actionBar}>{children}</section>;
};
