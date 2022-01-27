import { Currency } from '@types';
import React from 'react';
import { Link } from 'react-location';
import SvgCash from 'src/common/components/icons/Cash';

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
        <h1 className={s.lighter}>{currency?.code as string}</h1>
      </div>
      <div className={s.btnGroup}>
        <Link
          className={s.btn}
          to='./'
        >
          Overview
        </Link>
        <Link
          className={s.btn}
          to='./settings'
        >
          Settings
        </Link>
      </div>
    </div>
  );
}

export default AccountHeader;
