export default class Day {
  public index: number;

  public name: string;

  public static readonly MONDAY = new Day(0, 'Понедельник');

  public static readonly TUESDAY = new Day(1, 'Вторник');

  public static readonly WEDNESDAY = new Day(2, 'Среда');

  public static readonly THURSDAY = new Day(3, 'Четверг');

  public static readonly FRIDAY = new Day(4, 'Пятница');

  public static readonly SATURDAY = new Day(5, 'Суббота');

  public static readonly SUNDAY = new Day(6, 'Воскресенье');

  public static readonly allAvailableDays = new Array<Day>(
    this.MONDAY,
    this.TUESDAY,
    this.WEDNESDAY,
    this.THURSDAY,
    this.FRIDAY,
    this.SATURDAY,
    this.SUNDAY,
  );

  private constructor(index: number, name: string) {
    this.index = index;
    this.name = name;
  }
}
