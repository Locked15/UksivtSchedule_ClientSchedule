import ColorsTheme from '@/models/themes/ColorsTheme';

export default class ApplicationThemes {
  static azureColorTheme = new ColorsTheme(0, 'Azure', '☀️ Светлая ☀️', false, '#FF0000', '#FFFFFF', '#0000', '#FFFFFF', '#F9F9F9', '#E62117', '#CBCBCB');

  static darkColorTheme = new ColorsTheme(1, 'Gray', '🌑 Тёмная 🌑', true, '#ff0000', '#ffff00', '#ffffff', '#000000', '#171717', '#E62117', '#282828');

  static colorThemes = [this.azureColorTheme, this.darkColorTheme];

  static getDefaultTheme() : ApplicationThemes {
    return this.azureColorTheme;
  }
}
