import ColorsTheme from '@/models/common/themes/ColorsTheme';

import { CURRENT_THEME_KEY } from '../keys';

export function getCurrentColorThemeViaStorage(): ColorsTheme | null {
  const localStorageValue = localStorage.getItem(CURRENT_THEME_KEY);
  if (localStorageValue !== null) {
    return JSON.parse(localStorageValue);
  }
  return null;
}

export function getDarkStateOfCurrentThemeViaStorage(): boolean {
  const localStorageValue = localStorage.getItem(CURRENT_THEME_KEY);
  if (localStorageValue !== null) {
    const theme: ColorsTheme = JSON.parse(localStorageValue);
    return theme.isDarkTheme;
  }
  return false;
}
