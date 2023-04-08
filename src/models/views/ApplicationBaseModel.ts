import ColorsTheme from '@/models/themes/ColorsTheme';

export default class ApplicationBaseModel {
  public currentTheme: ColorsTheme;

  public themes: ColorsTheme[];

  constructor(currentTheme: ColorsTheme, themes: ColorsTheme[]) {
    this.currentTheme = currentTheme;
    this.themes = themes;
  }
}
