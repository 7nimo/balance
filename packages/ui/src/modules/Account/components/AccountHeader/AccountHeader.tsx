import { Currency } from '@types';
import SvgCash from 'components/icons/Cash';
import React from 'react';
import { Link } from 'react-location';

import s from './AccountHeader.module.scss';

type Props = {
  title?: string;
  currency?: Currency;
};

function AccountHeader ({ currency, title }: Props): React.ReactElement {
  return (
    <div className={s.container}>
      <div className={s.header}>
        <SvgCash />
        <h1>{title}</h1>
        <h1 className={s.lighter}>{currency?.code}</h1>
      </div>
      <div className={s.btnGroup}>
        <Link
          className={s.btn}
          getActiveProps={() => ({ className: `${s.active}` })}
          to='./'
        >
          Overview
        </Link>
        <Link
          className={s.btn}
          getActiveProps={() => ({ className: `${s.active}` })}
          to='./settings'
        >
          Settings
        </Link>
      </div>
    </div>
  );
}

export default AccountHeader;
