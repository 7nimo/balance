import { NavLink } from 'react-router-dom';
// import cx from 'classnames';
import s from './NavButton.module.scss';

interface NavButtonProps {
  link: string;
  label: string;
  icon: JSX.Element;
  collapsible?: boolean;
}

function NavButton({ link, label, icon, collapsible }: NavButtonProps): JSX.Element {
  return (
    <div className={s.drawerItem}>
      {/* <NavLink to={`/${link}`} className={cx(s.focusableLink)}> */}
      <NavLink
        to={`/${link}`}
        end
        className={s.focusableLink}
        // className={(isActive) => `${s.focusableLink}${!isActive ? '' : s.active}`}
      >
        <div className={s.iconWrapper}>{icon}</div>
        <span className={s.navTitle}>{label}</span>
        {collapsible ? '' : ''}
      </NavLink>
    </div>
  );
}

NavButton.defaultProps = {
  collapsible: false,
};

export default NavButton;
