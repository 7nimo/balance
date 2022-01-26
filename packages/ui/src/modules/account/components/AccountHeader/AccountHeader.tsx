import { Currency } from '@types';
import SvgCash from 'common/components/icons/Cash';
import { Link } from 'react-location';
import s from './AccountHeader.module.scss';

type Props = {
  title?: string;
  currency?: Currency;
};

function AccountHeader({ title, currency }: Props): React.ReactElement {
  return (
    <div className={s.container}>
      <div className={s.header}>
        <SvgCash />
        <h1>{title}</h1>
        <h1 className={s.lighter}>{currency?.code as string}</h1>
      </div>
      <div className={s.btnGroup}>
        <Link to="./" className={s.btn}>
          Overview
        </Link>
        <Link to="./settings" className={s.btn}>
          Settings
        </Link>
      </div>
    </div>
  );
}

export default AccountHeader;
