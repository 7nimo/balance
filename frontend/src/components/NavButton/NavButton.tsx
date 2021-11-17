import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import s from './NavButton.module.scss';

interface Props extends React.HTMLAttributes<HTMLElement> {
  link: string;
  label: string;
  icon: JSX.Element;
  // style?: CSSProperties;
}

export const NavButton: FC<Props> = ({ link, label, icon, style }) => {
  return (
    <div style={style} className={s.drawerItem}>
      <NavLink to={`/${link}`} end className={s.focusableLink}>
        <div className={s.iconWrapper}>{icon}</div>
        <span className={s.label}>{label}</span>
      </NavLink>
    </div>
  );
};
