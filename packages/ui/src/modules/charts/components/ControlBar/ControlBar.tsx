import { Period } from '@types';
import React from 'react';

import s from './ControlBar.module.scss';

type Props = {
  currencySymbol?: string;
  assetAmount: number;
};

function ControlBar ({ assetAmount, currencySymbol }: Props): React.ReactElement<Props> {
  // const mainCurrency = Math.floor(assetAmount);
  // const fractionalCurrency = assetAmount - mainCurrency;

  const [mainCurrency, fractionalCurrency] = assetAmount.toString().split('.');

  return (
    <div className={s.controlBar}>
      <div className={s.chartHeader}>
        <span>{currencySymbol}</span>
        <span>{mainCurrency}</span>
        <span>.{fractionalCurrency}</span>
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
