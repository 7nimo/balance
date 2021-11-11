import { NavLink } from 'react-router-dom';
import Logo from '../../Logo/Logo';
// import cx from 'classnames';
import s from './NavBar.module.scss';

export default function NavBar(): JSX.Element {
  return (
    <nav className={s.sidebar}>
      <Logo />
      <NavLink to="/dashboard">Assets</NavLink>
    </nav>
  );
}
