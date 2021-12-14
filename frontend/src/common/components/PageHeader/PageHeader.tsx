import { FC } from 'react';
import SvgCash from '../icons/Cash';
import s from './PageHeader.module.scss';

type Props = {
  title: string;
};

export const PageHeader: FC<Props> = ({ title }) => {
  return (
    <div className={s.container}>
      <div className={s.header}>
        <SvgCash />
        <h1>{title}</h1>
        <h1 className={s.lighter}>GBP</h1>
      </div>
      <div className={s.buttonsRow}>
        <button type="button" className={s.btn}>
          Overview
        </button>
        <button type="button" className={s.btn}>
          Settings
        </button>
      </div>
    </div>
  );
};
