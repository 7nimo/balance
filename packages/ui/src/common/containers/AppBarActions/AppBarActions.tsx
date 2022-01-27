import { useToggle } from 'hooks/useToggle';
import React, { ReactNode } from 'react';
import { IconButton } from 'src/common/components/IconButton/IconButton';
import { DarkMode, LightMode } from 'src/common/components/icons';
import { UserAsDevil } from 'src/common/components/icons/user';

import s from './AppBarActions.module.scss';

type Props = {
  children?: ReactNode;
};

function AppBarActions ({ children }: Props): React.ReactElement<Props> {
  const [isDarkTheme, toggleTheme] = useToggle(false);

  const handleThemeToggle = (): void => {
    document.getElementById('root')!.classList.toggle('dark-theme');
    toggleTheme();
  };

  // todo: dropdown menu [settings/logout]
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const handleDropdown = (): void => {};

  return (
    <div className={s.actionsContainer}>
      <div className={s.themeToggler}>
        <IconButton
          icon={isDarkTheme ? <LightMode /> : <DarkMode />}
          onClick={handleThemeToggle}
        />
      </div>
      {children}
      <div className={s.profileDropdown}>
        <IconButton
          icon={<UserAsDevil />}
          onClick={handleDropdown}
        />
      </div>
    </div>
  );
}

export default AppBarActions;
