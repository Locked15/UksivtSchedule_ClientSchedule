export default class ColorsTheme {
  /**
   * Unique identifier for the theme color.
   * May be used in the future.
   */
  id: number;

  name: string;

  title: string;

  primaryColor: string;

  secondaryColor: string;

  accentColor: string;

  backgroundColor: string;

  surfaceColor: string;

  errorColor: string;

  grayColor: string;

  constructor(
    id: number,
    name: string,
    title: string,
    primaryColor: string,
    secondaryColor: string,
    accentColor: string,
    backgroundColor: string,
    surfaceColor: string,
    errorColor: string,
    grayColor: string,
  ) {
    this.id = id;

    this.name = name;
    this.title = title;

    this.primaryColor = primaryColor;
    this.secondaryColor = secondaryColor;
    this.accentColor = accentColor;
    this.backgroundColor = backgroundColor;
    this.surfaceColor = surfaceColor;
    this.errorColor = errorColor;
    this.grayColor = grayColor;
  }
}
