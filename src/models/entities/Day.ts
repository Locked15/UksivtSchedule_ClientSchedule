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

  public static readonly ALL_AVAILABLE_DAYS = new Array<Day>(
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

  public static getDayFromIndex(index: number) : Day {
    switch (index) {
      case 0:
        return this.MONDAY;
      case 1:
        return this.TUESDAY;
      case 2:
        return this.WEDNESDAY;
      case 3:
        return this.THURSDAY;
      case 4:
        return this.FRIDAY;
      case 5:
        return this.SATURDAY;

      default:
        return this.SUNDAY;
    }
  }
}
