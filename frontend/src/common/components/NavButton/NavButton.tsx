/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, ReactElement } from 'react';
import { Link } from 'react-location';
import s from './NavButton.module.scss';

interface Props extends React.HTMLAttributes<HTMLElement> {
  link: string;
  label: string;
  icon: ReactElement;
}

export const NavButton: FC<Props> = ({ link, label, icon, style }) => {
  return (
    <div style={style} className={s.drawerItem}>
      <Link
        to={`/${link}`}
        className={s.focusableLink}
        activeOptions={{ exact: true }}
        getActiveProps={() => ({ className: 'active' })}
      >
        <div className={s.iconWrapper}>{icon}</div>
        <span className={s.label}>{label}</span>
      </Link>
    </div>
  );
};
