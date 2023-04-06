import ColorsTheme from '@/models/themes/ColorsTheme';

export default class ApplicationThemes {
  static azureColorTheme = new ColorsTheme(0, 'Azure', '☀️ Светлая ☀️', '#FF0000', '#FFFFFF', '#0000', '#FFFFFF', '#F9F9F9', '#E62117', '#abb8c3');

  static darkColorTheme = new ColorsTheme(1, 'Gray', '🌑 Тёмная 🌑', '#ff0000', '#ffff00', '#ffffff', '#000000', '#171717', '#E62117', '#abb8c3');

  static colorThemes = [this.azureColorTheme, this.darkColorTheme];

  static getDefaultTheme() : ApplicationThemes {
    return this.azureColorTheme;
  }
}
