import SvgCash from 'common/components/icons/Cash';
import s from './AccountHeader.module.scss';

type Props = {
  title: string;
};

function AccountHeader({ title }: Props): React.ReactElement {
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
}

export default AccountHeader;
