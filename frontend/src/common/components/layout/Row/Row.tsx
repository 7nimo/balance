import { ReactNode } from 'react';
import s from './Row.module.scss';

interface RowProps {
  children: ReactNode;
}

export const Row: React.FC<RowProps> = ({ children }) => {
  return <div className={s.Row}>{children}</div>;
};
