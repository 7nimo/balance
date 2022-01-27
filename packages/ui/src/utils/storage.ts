import { Theme } from '@types';

export const storage = {
  getTheme: () => window.localStorage.getItem('theme'),
  setTheme: (theme: Theme) => window.localStorage.setItem('theme', theme)
};
