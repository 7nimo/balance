import { Period } from '@types';
import React from 'react';

import s from './ControlBar.module.scss';

type Props = {
  currencySymbol?: string;
  balance: number;
};

function ControlBar ({ balance, currencySymbol }: Props): React.ReactElement<Props> {
  const [mainCurrency, fractionalCurrency] = balance.toString().split('.');

  return (
    <div className={s.controlBar}>
      <div className={s.chartHeader}>
        <span>{currencySymbol}</span>
        <span>{mainCurrency}</span>
        <span>.{fractionalCurrency ?? '00'}</span>
      </div>
      <div className={s.periodSelector}>
        <button type='button'>{Period.week}</button>
        <button type='button'>{Period.month}</button>
        <button type='button'>{Period.year}</button>
        <button type='button'>{Period.all}</button>
      </div>
    </div>
  );
}

export default ControlBar;
