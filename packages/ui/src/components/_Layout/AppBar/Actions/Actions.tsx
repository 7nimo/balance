import { IconButton } from 'components/buttons/IconButton/IconButton';
import { UserAsDevil } from 'components/icons/user';
import { ThemeToggler } from 'components/misc/ThemeToggle';
import React, { ReactNode } from 'react';

import s from './Actions.module.scss';

type Props = {
  children?: ReactNode;
};

function Actions ({ children }: Props): React.ReactElement<Props> {
  return (
    <div className={s.actionsContainer}>
      <div className={s.themeToggler}>
        <ThemeToggler />
      </div>
      {children}
      <div className={s.profileDropdown}>
        <IconButton
          icon={<UserAsDevil />}
          // onClick={handleDropdown}
        />
      </div>
    </div>
  );
}

export default Actions;
