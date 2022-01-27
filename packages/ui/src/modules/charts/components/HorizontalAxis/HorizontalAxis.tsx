import { Period } from '@types';
import React from 'react';

import s from './HorizontalAxis.module.scss';

type Props = {
  period: Period;
};

function HorizontalAxis ({ period }: Props): React.ReactElement<Props> {
  return (
    <div className={s.axisWrapper}>
      <span>{period}</span>
      <span>yyy</span>
      <span>aaa</span>
      <span>ooo</span>
    </div>
  );
}

export default HorizontalAxis;
