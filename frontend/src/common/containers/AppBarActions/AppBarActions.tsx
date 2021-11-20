import { IconButton } from 'common/components/IconButton/IconButton';
import { DarkMode, LightMode } from 'common/components/icons';
import { UserAsDevil } from 'common/components/icons/user';
import { useToggle } from 'hooks/useToggle';
import { FC, ReactNode } from 'react';
import s from './AppBarActions.module.scss';

type Props = {
  children?: ReactNode;
};

export const AppBarActions: FC<Props> = () => {
  const [isDarkTheme, toggleTheme] = useToggle(false);

  const handleThemeToggle = (): void => {
    document.getElementById('root')!.classList.toggle('dark-theme');
    toggleTheme();
  };

  const handleDropdown = (): void => {};

  return (
    <div className={s.actionsContainer}>
      <div className={s.themeToggler}>
        <IconButton icon={isDarkTheme ? <LightMode /> : <DarkMode />} onClick={handleThemeToggle} />
      </div>
      <div className={s.profileDropdown}>
        <IconButton icon={<UserAsDevil />} onClick={handleDropdown} />
      </div>
    </div>
  );
};
