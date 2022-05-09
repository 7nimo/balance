/* eslint-disable sort-keys */
import { IconButton } from 'components/buttons/IconButton/IconButton';
import { UserAsDevil } from 'components/icons/user';
import { ThemeToggler } from 'components/misc/ThemeToggle';
import { signOut } from 'core/api/auth';
import React, { ReactNode } from 'react';
import { useNavigate } from 'react-location';

import s from './Actions.module.scss';

type Props = {
  children?: ReactNode;
};

function Actions ({ children }: Props): React.ReactElement<Props> {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut()
      .then((r) => {
        console.info('user logged out');
        navigate({ to: '/', replace: true });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className={s.actionsContainer}>
      <div className={s.themeToggler}>
        <ThemeToggler />
      </div>
      {children}
      <div className={s.profileDropdown}>
        <IconButton
          icon={<UserAsDevil />}
          onClick={handleLogout}
        />
      </div>
    </div>
  );
}

export default Actions;
