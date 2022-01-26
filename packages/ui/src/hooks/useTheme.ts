import { THEME, Theme } from '@types';
import { useEffect, useState } from 'react';
import { storage } from 'utils/storage';

export const useTheme = (): {
  theme: Theme;
  themeLoaded: boolean;
  setMode: (mode: Theme) => void;
} => {
  const [theme, setTheme] = useState<Theme>('light-theme');
  const [themeLoaded, setThemeLoaded] = useState(false);

  const setMode = (mode: Theme): void => {
    storage.setTheme(mode);
    setTheme(mode);
  };

  useEffect(() => {
    const localTheme = storage.getTheme();
    localTheme !== null && THEME.indexOf(localTheme as any) !== -1
      ? setTheme(localTheme as Theme)
      : setTheme('light-theme');
    setThemeLoaded(true);
  }, []);

  return { theme, themeLoaded, setMode };
};
