import { THEME, Theme } from '@types';
import { storage } from 'core/utils/storage';
import { useEffect, useState } from 'react';

export const useTheme = (): {
  theme: Theme;
  themeLoaded: boolean;
  setMode: (mode: Theme) => void;
} => {
  const [theme, setTheme] = useState<Theme>('light');
  const [themeLoaded, setThemeLoaded] = useState(false);

  const setMode = (mode: Theme): void => {
    storage.setTheme(mode);
    setTheme(mode);
  };

  useEffect(() => {
    const localTheme = storage.getTheme();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    localTheme !== null && THEME.indexOf(localTheme as any) !== -1
      ? setTheme(localTheme as Theme)
      : setTheme('light');
    setThemeLoaded(true);
  }, []);

  return { setMode, theme, themeLoaded };
};
