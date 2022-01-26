import { Period } from '@types';
import { FC } from 'react';
import s from './HorizontalAxis.module.scss';

type Props = {
  period: Period;
};

export const HorizontalAxis: FC<Props> = ({ period }) => {
  return (
    <div className={s.axisWrapper}>
      <span>{period}</span>
      <span>yyy</span>
      <span>aaa</span>
      <span>ooo</span>
    </div>
  );
};
