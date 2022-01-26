export const THEME = ['light-theme', 'dark-theme'] as const;
export type Theme = typeof THEME[number];
